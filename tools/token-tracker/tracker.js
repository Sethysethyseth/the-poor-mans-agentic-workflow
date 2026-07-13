#!/usr/bin/env node
/*
 * tracker.js - the poor man's Claude token tracker / window anchor calculator.
 *
 * Single file, zero dependencies, Node 18+. Reads the Claude Code transcript
 * files that already exist on your disk (~/.claude/projects/** /*.jsonl) and
 * reconstructs your 5-hour usage windows from them. Nothing leaves your
 * machine; no API key is used or needed.
 *
 * Subcommands:
 *   scan            rebuild data/ledger.json from transcripts, print summary
 *   report          full human-readable report (windows, 7-day, calibration)
 *   anchors         print the anchor-ping plan computed from config.json
 *   last-activity   window-state probe used by anchor-ping.ps1 as its guard
 *   statusline      one-line summary for a Claude Code custom statusline
 *
 * Flags: --json (machine output, where supported), --recent (last-activity:
 * only scan files modified in the last 48h - fast path for the ping guard).
 *
 * HONESTY NOTE (do not delete): Anthropic does not publish token budgets,
 * and limits are dynamic. Every "weighted unit" and every percentage this
 * tool prints is an UNOFFICIAL LOCAL ESTIMATE, calibrated only by lockouts
 * you actually hit. Treat them as pacing hints, never as facts.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const HERE = __dirname;
const DATA_DIR = path.join(HERE, "data");
const LEDGER_PATH = path.join(DATA_DIR, "ledger.json");
const ANCHOR_LOG = path.join(HERE, "logs", "anchor-log.jsonl");
const WINDOW_MS = 5 * 60 * 60 * 1000;

/* ---------------------------------------------------------------- config */

const DEFAULT_CONFIG = {
  // Extra transcript directories to scan; ~/.claude/projects is always scanned.
  transcripts: [],
  // Work blocks per weekday. start/end are "HH:MM" local, 24h. end past
  // midnight is written as e.g. "01:00" (smaller than start = next day).
  // "break" is where you'd LIKE the window reset to land (dinner, gym).
  schedule: { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
  // The autonomous anchor ping: cheapest model, near-empty prompt.
  anchor: { prompt: ".", model: "haiku" },
  // Unofficial burn-weighting. Rough relative-cost ratios so different token
  // classes and models can share one pacing scalar ("weighted units", wu).
  tokenWeights: { input: 1, output: 5, cacheRead: 0.1, cacheWrite: 1.25 },
  modelWeights: { fable: 5, opus: 5, sonnet: 1, haiku: 0.27, default: 1 },
};

function loadConfig() {
  for (const name of ["config.json", "config.example.json"]) {
    const p = path.join(HERE, name);
    if (fs.existsSync(p)) {
      const user = JSON.parse(fs.readFileSync(p, "utf8"));
      return {
        ...DEFAULT_CONFIG,
        ...user,
        anchor: { ...DEFAULT_CONFIG.anchor, ...(user.anchor || {}) },
        tokenWeights: { ...DEFAULT_CONFIG.tokenWeights, ...(user.tokenWeights || {}) },
        modelWeights: { ...DEFAULT_CONFIG.modelWeights, ...(user.modelWeights || {}) },
        _configFile: name,
      };
    }
  }
  return { ...DEFAULT_CONFIG, _configFile: "(none - defaults)" };
}

/* ------------------------------------------------------- transcript scan */

function findTranscriptFiles(config, mtimeAfterMs) {
  const roots = [path.join(os.homedir(), ".claude", "projects"), ...config.transcripts];
  const files = [];
  const walk = (dir) => {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".jsonl")) {
        if (mtimeAfterMs) {
          try { if (fs.statSync(p).mtimeMs < mtimeAfterMs) continue; } catch { continue; }
        }
        files.push(p);
      }
    }
  };
  for (const r of roots) walk(r);
  return files;
}

// Scan transcripts -> { events, lockouts }. Events are assistant API calls
// (the only entries that consume budget - local commands and meta lines
// never hit the API, so they never open a window).
async function scanTranscripts(config, { recentOnly = false } = {}) {
  const cutoff = recentOnly ? Date.now() - 48 * 3600 * 1000 : 0;
  const files = findTranscriptFiles(config, cutoff);
  const seen = new Set();
  const events = [];
  const lockouts = [];

  for (const file of files) {
    const projectDir = path.basename(path.dirname(file));
    const rl = readline.createInterface({
      input: fs.createReadStream(file, "utf8"),
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      if (!line.includes('"assistant"')) continue; // cheap pre-filter
      let entry;
      try { entry = JSON.parse(line); } catch { continue; }
      if (entry.type !== "assistant" || !entry.message || !entry.timestamp) continue;

      const msg = entry.message;
      const t = Date.parse(entry.timestamp);
      if (Number.isNaN(t)) continue;

      // Synthetic entries are client-side placeholders (errors, lockouts) -
      // they consumed nothing, but a "limit reached" one is a calibration gift.
      if (msg.model === "<synthetic>" || entry.isApiErrorMessage) {
        const text = JSON.stringify(msg.content || "");
        if (/limit reached|usage limit|out of usage/i.test(text)) {
          lockouts.push({ t, text: text.slice(0, 200) });
        }
        continue;
      }
      if (!msg.usage) continue;

      const key = (msg.id || entry.uuid || "") + ":" + (entry.requestId || "");
      if (seen.has(key)) continue; // same API response echoed across files
      seen.add(key);

      const u = msg.usage;
      events.push({
        t,
        model: msg.model || "unknown",
        in: u.input_tokens || 0,
        out: u.output_tokens || 0,
        cr: u.cache_read_input_tokens || 0,
        cw: u.cache_creation_input_tokens || 0,
        projectDir,
      });
    }
  }
  events.sort((a, b) => a.t - b.t);
  lockouts.sort((a, b) => a.t - b.t);
  return { events, lockouts, filesScanned: files.length };
}

/* ------------------------------------------------- window reconstruction */

function modelWeight(config, model) {
  const m = model.toLowerCase();
  for (const [name, w] of Object.entries(config.modelWeights)) {
    if (name !== "default" && m.includes(name)) return w;
  }
  return config.modelWeights.default;
}

function weightedUnits(config, e) {
  const w = config.tokenWeights;
  return modelWeight(config, e.model) *
    (e.in * w.input + e.out * w.output + e.cr * w.cacheRead + e.cw * w.cacheWrite);
}

// A window opens at the first budget-consuming request after the previous
// window expired, and lasts exactly 5 hours. That is the whole model.
function buildWindows(config, events, lockouts) {
  const windows = [];
  let cur = null;
  const li = lockouts.slice(); // consumed as we pass their timestamps

  const attachLockouts = (uptoT) => {
    while (li.length && li[0].t <= uptoT) {
      const lk = li.shift();
      if (cur && lk.t < cur.start + WINDOW_MS && lk.t >= cur.start) {
        cur.lockouts.push({ t: lk.t, wuAtLockout: Math.round(cur.wu) });
      }
    }
  };

  for (const e of events) {
    if (!cur || e.t >= cur.start + WINDOW_MS) {
      attachLockouts(e.t);
      cur = {
        start: e.t, requests: 0, wu: 0,
        tokens: { in: 0, out: 0, cr: 0, cw: 0 },
        models: {}, overheadWu: 0, lockouts: [],
      };
      windows.push(cur);
    }
    attachLockouts(e.t);
    cur.requests++;
    cur.tokens.in += e.in; cur.tokens.out += e.out;
    cur.tokens.cr += e.cr; cur.tokens.cw += e.cw;
    const wu = weightedUnits(config, e);
    cur.wu += wu;
    cur.models[e.model] = (cur.models[e.model] || 0) + wu;
    // Anchor pings fired from this tool's directory count as self-overhead.
    if (/token-tracker/i.test(e.projectDir)) cur.overheadWu += wu;
  }
  attachLockouts(Infinity);
  for (const w of windows) {
    w.end = w.start + WINDOW_MS;
    w.wu = Math.round(w.wu);
    w.overheadWu = Math.round(w.overheadWu);
    for (const m of Object.keys(w.models)) w.models[m] = Math.round(w.models[m]);
  }
  return windows;
}

function calibration(windows) {
  const samples = windows.flatMap((w) => w.lockouts.map((l) => l.wuAtLockout));
  if (!samples.length) return { samples: [], estimate: null };
  const s = samples.slice().sort((a, b) => a - b);
  return { samples, estimate: s[Math.floor(s.length / 2)] };
}

async function buildLedger(config, opts) {
  const { events, lockouts, filesScanned } = await scanTranscripts(config, opts);
  const windows = buildWindows(config, events, lockouts);
  return {
    generatedAt: new Date().toISOString(),
    filesScanned,
    eventCount: events.length,
    windows,
    calibration: calibration(windows),
  };
}

function saveLedger(ledger) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 1));
}

/* ------------------------------------------------------------ anchor math
 * A block longer than 5h needs two windows. The reset R must satisfy:
 *   R >= block_end - 5h   (second window must reach the end of the block)
 *   R <= block_start + 5h (first window must reach back to block start)
 * Within [Rmin, Rmax] we place R at your preferred break, else the block
 * midpoint. The anchor ping fires at R - 5h to open window 1 early.
 */

const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function toMin(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}
function fromMin(min) {
  const m = ((min % 1440) + 1440) % 1440;
  return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
}

function planAnchors(config) {
  const plan = [];
  for (const day of DAYS) {
    const blocks = config.schedule[day] || [];
    for (const b of blocks) {
      const start = toMin(b.start);
      let end = toMin(b.end === "24:00" ? "23:59" : b.end);
      if (end <= start) end += 1440; // crosses midnight
      const len = end - start;

      if (len <= 300) {
        plan.push({ day, block: `${b.start}-${b.end}`, anchor: null,
          reason: "block fits in one 5h window; your first real prompt opens it" });
        continue;
      }
      const rMin = end - 300;
      const rMax = start + 300;
      let pref = b.break != null ? toMin(b.break) : Math.round((start + end) / 2);
      if (b.break != null && pref < start) pref += 1440;
      const reset = Math.min(Math.max(pref, rMin), rMax);
      let anchorMin = reset - 300;
      let anchorDay = day;
      if (anchorMin < 0) {
        anchorMin += 1440;
        anchorDay = DAYS[(DAYS.indexOf(day) + 6) % 7];
      }
      const entry = {
        day: anchorDay, blockDay: day, block: `${b.start}-${b.end}`,
        anchor: fromMin(anchorMin), reset: fromMin(reset),
        reason: `window 1 opens ${fromMin(anchorMin)}, resets ${fromMin(reset)}; window 2 covers through ${fromMin(end)}`,
      };
      if (len > 600) {
        entry.warning = `block is ${(len / 60).toFixed(1)}h; two windows only cover the last 10h - the first ${((len - 600) / 60).toFixed(1)}h ride on window 1's tail. Split the block in config if that matters.`;
        entry.anchor = fromMin(end - 600 < 0 ? end - 600 + 1440 : end - 600);
        entry.reset = fromMin(end - 300);
        entry.reason = `window 1 opens ${entry.anchor}, resets ${entry.reset}; window 2 covers through ${fromMin(end)}`;
      }
      plan.push(entry);
    }
    if (!blocks.length) plan.push({ day, block: null, anchor: null, reason: "no work blocks configured" });
  }
  return plan;
}

/* ------------------------------------------------------------- reporting */

function fmtNum(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
  return String(Math.round(n));
}
function fmtTime(ms) {
  return new Date(ms).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}
function fmtDay(ms) {
  return new Date(ms).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
function shortModel(m) {
  return m.replace(/^claude-/, "").replace(/-\d{8}$/, "");
}

function windowState(ledger, now = Date.now()) {
  const last = ledger.windows[ledger.windows.length - 1];
  if (!last) return { windowOpen: false };
  const open = now < last.end;
  return {
    windowOpen: open,
    windowOpenedISO: new Date(last.start).toISOString(),
    windowResetsISO: new Date(last.end).toISOString(),
    lastEventISO: ledger.generatedAt,
    wuThisWindow: last.wu,
    budgetEstimate: ledger.calibration.estimate,
  };
}

function report(config, ledger) {
  const now = Date.now();
  const L = [];
  L.push(`token-tracker report  (${new Date(now).toLocaleString("en-US")})`);
  L.push(`scanned ${ledger.filesScanned} transcript files, ${ledger.eventCount} API requests, ${ledger.windows.length} windows`);
  L.push("");

  const last = ledger.windows[ledger.windows.length - 1];
  const est = ledger.calibration.estimate;
  if (last && now < last.end) {
    const pct = est ? ` (~${Math.round((100 * last.wu) / est)}% of calibrated budget)` : "";
    L.push(`CURRENT WINDOW: opened ${fmtTime(last.start)}, resets ${fmtTime(last.end)}`);
    L.push(`  ${last.requests} requests, ${fmtNum(last.wu)} wu${pct}`);
    for (const [m, wu] of Object.entries(last.models))
      L.push(`    ${shortModel(m)}: ${fmtNum(wu)} wu`);
  } else {
    L.push(`CURRENT WINDOW: none open - your next prompt opens a fresh one`);
  }
  L.push("");

  const wk = ledger.windows.filter((w) => w.start > now - 7 * 24 * 3600 * 1000);
  const tot = { wu: 0, req: 0, overhead: 0, models: {} };
  for (const w of wk) {
    tot.wu += w.wu; tot.req += w.requests; tot.overhead += w.overheadWu;
    for (const [m, wu] of Object.entries(w.models)) tot.models[m] = (tot.models[m] || 0) + wu;
  }
  L.push(`LAST 7 DAYS: ${wk.length} windows, ${tot.req} requests, ${fmtNum(tot.wu)} wu`);
  for (const [m, wu] of Object.entries(tot.models).sort((a, b) => b[1] - a[1]))
    L.push(`  ${shortModel(m)}: ${fmtNum(wu)} wu (${Math.round((100 * wu) / tot.wu)}%)`);
  if (tot.overhead)
    L.push(`  self-overhead (anchor pings): ${fmtNum(tot.overhead)} wu (${((100 * tot.overhead) / tot.wu).toFixed(2)}%)`);
  L.push("");

  L.push(`RECENT WINDOWS:`);
  for (const w of ledger.windows.slice(-8)) {
    const lk = w.lockouts.length ? `  << LOCKOUT at ${fmtNum(w.lockouts[0].wuAtLockout)} wu` : "";
    L.push(`  ${fmtDay(w.start)} ${fmtTime(w.start)}-${fmtTime(w.end)}  ${fmtNum(w.wu)} wu, ${w.requests} req${lk}`);
  }
  L.push("");

  if (ledger.calibration.samples.length) {
    L.push(`CALIBRATION: ${ledger.calibration.samples.length} lockout(s) observed; est. window budget ~${fmtNum(est)} wu (median)`);
  } else {
    L.push(`CALIBRATION: no lockouts observed yet - percentages unavailable.`);
    L.push(`  (That may simply mean you never hit the 5h wall. If so, anchoring buys you nothing yet - nice problem.)`);
  }
  L.push("");

  if (fs.existsSync(ANCHOR_LOG)) {
    const lines = fs.readFileSync(ANCHOR_LOG, "utf8").trim().split("\n").slice(-7);
    L.push(`ANCHOR LOG (last ${lines.length}):`);
    for (const ln of lines) {
      try { const e = JSON.parse(ln); L.push(`  ${e.t}  ${e.action}${e.reason ? " (" + e.reason + ")" : ""}`); }
      catch { /* skip */ }
    }
  } else {
    L.push(`ANCHOR LOG: empty - no pings fired yet.`);
  }
  L.push("");
  L.push(`All wu figures are unofficial local estimates (see README). Config: ${config._configFile}`);
  return L.join("\n");
}

function statusline(config, ledger) {
  const now = Date.now();
  const st = windowState(ledger, now);
  const wk = ledger.windows.filter((w) => w.start > now - 7 * 24 * 3600 * 1000)
    .reduce((s, w) => s + w.wu, 0);
  if (!st.windowOpen) return `win: closed (next prompt opens) | 7d ${fmtNum(wk)} wu`;
  const pct = st.budgetEstimate ? ` ~${Math.round((100 * st.wuThisWindow) / st.budgetEstimate)}%` : "";
  return `win: resets ${fmtTime(Date.parse(st.windowResetsISO))} | ${fmtNum(st.wuThisWindow)} wu${pct} | 7d ${fmtNum(wk)} wu`;
}

/* ------------------------------------------------------------------ main */

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0] || "report";
  const json = args.includes("--json");
  const recent = args.includes("--recent");
  const config = loadConfig();

  if (cmd === "anchors") {
    const plan = planAnchors(config);
    if (json) { console.log(JSON.stringify(plan, null, 1)); return; }
    console.log("Anchor plan (from " + config._configFile + "):");
    for (const p of plan) {
      if (p.anchor) {
        console.log(`  ${p.day} ${p.anchor}  -> block ${p.blockDay} ${p.block}: ${p.reason}`);
        if (p.warning) console.log(`      WARNING: ${p.warning}`);
      } else {
        console.log(`  ${p.day}: no anchor - ${p.reason}`);
      }
    }
    return;
  }

  if (cmd === "last-activity") {
    const ledger = await buildLedger(config, { recentOnly: recent });
    console.log(JSON.stringify(windowState(ledger), null, json ? 1 : 0));
    return;
  }

  if (cmd === "statusline") {
    // Cheap path: reuse a ledger younger than 120s (statusline re-renders a lot).
    let ledger = null;
    try {
      if (Date.now() - fs.statSync(LEDGER_PATH).mtimeMs < 120 * 1000) {
        ledger = JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8"));
      }
    } catch { /* rebuild below */ }
    if (!ledger) { ledger = await buildLedger(config, { recentOnly: true }); saveLedger(ledger); }
    console.log(statusline(config, ledger));
    return;
  }

  if (cmd === "scan" || cmd === "report") {
    const ledger = await buildLedger(config, {});
    saveLedger(ledger);
    if (cmd === "scan") {
      console.log(`ledger written: ${LEDGER_PATH}`);
      console.log(`${ledger.filesScanned} files, ${ledger.eventCount} API requests, ${ledger.windows.length} windows, ${ledger.calibration.samples.length} lockouts`);
    } else {
      console.log(report(config, ledger));
    }
    return;
  }

  console.error(`unknown command: ${cmd}\nusage: node tracker.js [scan|report|anchors|last-activity|statusline] [--json] [--recent]`);
  process.exit(2);
}

main().catch((e) => { console.error(e.stack || String(e)); process.exit(1); });
