# VERIFY-REPORT — standing re-verify sweep

**Date checked:** 2026-07-18  
**Web access:** available (search + live page fetches).  
**Scope:** report only; no repo files edited; no git operations.

## Summary

| Item | Verdict | Severity |
| --- | --- | --- |
| 1. Cursor pricing + trial | CHANGED | BLOCKER |
| 2. Trial/Pro CLI + Auto tier | STILL-UNVERIFIABLE (trial) / CONFIRMED (Pro Auto pool) | EDIT-NEEDED |
| 3. Cursor CLI install + hang bug | CONFIRMED | OK |
| 4. Claude plan prices + usage language | CONFIRMED | OK |
| 5. Claude Code install + claude.ai/code | CONFIRMED | OK |
| 6. ChatGPT/Codex plans + install + models | CONFIRMED | OK |
| 7. Live promos / hard-coding | CHANGED | EDIT-NEEDED |

---

## 1. Cursor pricing + plans (cursor.com/pricing)

**What the repo claims**

- Executor Pro seat ≈ **$20/mo** (README / economics Level 3 stack).
- Level 2 = planner + **Cursor free Pro trial** at **~$20 + $0**.
- Trial terms hedged as community-reported / unstable: length reports conflict (**14d / 7d / removed**); pricing page does not state them; clock start (signup vs first use) unverified (`trial-playbook.md`, README Level 2 catch).

**What I found**

- **Pro price:** **$20/mo** still listed on the official pricing page (Individual / Pro). Higher individual tiers: Pro+ $60, Ultra $200. Free **Hobby** plan: no card, limited Agent + Tab.
- **Free Pro trial:** Official pricing page does **not** advertise a Pro trial. Cursor staff **Colin** (2026-01-14) stated the **7-day Pro trial was removed**. On 2026-07-03, Cursor staff **deanrie** corrected earlier forum advice and confirmed: *“The 7-day Pro trial has been officially removed… removed system-wide.”* Support bot “Sam” same week: no 2-week or other paid-plan trial; free path is Hobby only.
- **Clock start:** moot for Pro trial if unavailable; never stated on pricing page.
- Community/third-party pages still sometimes claim a 7-day trial — **outdated** relative to staff + checkout behavior reported July 2026.

**Source URLs**

- https://cursor.com/pricing
- https://cursor.com/help/account-and-billing/pricing
- https://forum.cursor.com/t/was-the-7-day-free-trial-removed/148780
- https://forum.cursor.com/t/demo-trial-version/162713 (staff correction 2026-07-03)

**Date checked:** 2026-07-18  
**Verdict:** **CHANGED**

**Suggested text fix**

- Keep Pro **$20/mo** as confirmed.
- Replace Level 2’s default “free Pro trial / ~$20 + $0” framing with something like: *“As of 2026-07-18, Cursor staff confirm the Pro trial is removed system-wide; the free path is Hobby (limited Agent/Auto). Level 2 as a $0 Pro-capacity month is not currently available — either measure against limited Hobby (not a full executor seat) or skip to a paid Pro month (Level 3) for the two-seat contrast. Re-check cursor.com/pricing before launch.”*
- Update `trial-playbook.md` hedge from “may be removed” to **“officially removed (staff-confirmed 2026-07-03); playbook is historical shape only until a trial returns.”**

---

## 2. Cursor trial/Pro → headless CLI + cheap/Auto tier (Level 4 gate)

**What the repo claims**

- Level 4 uses executor **headless CLI**; **cheap/auto** tier is the free backbone included on the paid plan at no extra cost (`autonomous.md`, economics).
- Whether a **TRIAL** account includes headless CLI / cheap-tier access is **unverified as of 2026-07-16** — autonomous documented for full paid stack only (`trial-playbook.md`, `autonomous.md`).

**What I found**

- **Pro / paid:** Official docs describe two pools — **API** (Pro includes **$20** API usage) and **First-party models** (includes **Auto**, Composer 2.5, Grok 4.5) with “generous included usage.” Auto has fixed token rates but sits in the first-party pool — consistent with the repo’s “cheap/auto backbone” idea for paid Pro.
- **CLI:** Official install/headless docs at cursor.com; binary is `agent` (`agent -p` / print mode). Third-party guides say CLI needs an active Cursor subscription; Hobby vs Pro CLI entitlement is **not** crisply stated on the install page itself.
- **Trial CLI / Auto:** Pro trial appears **gone** (item 1), so trial CLI access stays **unverifiable / moot**. Repo’s “don’t plan Level 4 on a trial” disclosure remains correct.

**Source URLs**

- https://cursor.com/docs/models-and-pricing
- https://cursor.com/docs/cli/installation
- https://cursor.com/docs/cli/headless
- https://cursor.com/help/account-and-billing/pricing

**Date checked:** 2026-07-18  
**Verdict:** **STILL-UNVERIFIABLE** (trial CLI) / **CONFIRMED** (Pro has Auto + first-party pool + documented headless CLI)

**Suggested text fix**

- Keep trial-CLI unverified disclosure; add that **Pro trial itself is removed**, so Level 4 remains **paid Pro+ only**.
- Optionally tighten Auto wording to official terms: *“Auto / first-party pool (generous included usage on Pro); named frontier models draw the API dollar pool (~$20 on Pro).”*

---

## 3. Cursor CLI install one-liner + print/headless hang status

**What the repo claims**

- Level 4 installs the executor CLI (no hardcoded one-liner in the pages reviewed; setup says install CLI + log in).
- Print/headless modes have publicly reported hang bugs; ritual uses hard timeout / background / kill-retry (`autonomous.md`).

**What I found**

- **Official install (current):**
  - macOS / Linux / WSL: `curl https://cursor.com/install -fsS | bash`
  - Windows PowerShell: `irm 'https://cursor.com/install?win32=true' | iex`
  - Verify: `agent --version`
- **Hang status:** Forum reports of `cursor-agent` / `agent --print` not exiting after completion (e.g. Jan 2026); staff recommended `timeout` wrappers. A related `create-chat` hang was later described as addressed in a CLI update; **print-mode hang class is not clearly declared fully fixed**. Timeout discipline remains the safe practice.

**Source URLs**

- https://cursor.com/docs/cli/installation
- https://cursor.com/docs/cli/headless
- https://forum.cursor.com/t/cursor-agent-print-doesnt-exit-after-completing/150296
- https://forum.cursor.com/t/cursor-agent-create-chat-hangs-indefinitely-after-outputting-chat-id/153324

**Date checked:** 2026-07-18  
**Verdict:** **CONFIRMED**

**Suggested text fix**

- Optional: paste the official install one-liners into `docs/setup.md` Level 4 / dispatch ritual when documenting concrete Cursor commands.
- Keep hang + hard-timeout guidance; no change required for correctness.

---

## 4. Claude plan prices + official usage language

**What the repo claims**

- Pro **$20**; Max **5x $100**; Max **20x $200**.
- Anthropic publishes **multipliers**, not token quotas; 5-hour rolling windows + weekly caps; Max = 5× / 20× Pro per session.
- Community prompt-count anchors labeled estimates only; 5-hour limits permanently doubled 2026-05-06.

**What I found**

- Official plan chooser (updated May 19, 2026): Pro **$20/month** (or **$200/year**); Max 5x **$100**; Max 20x **$200** (monthly only for Max).
- Pricing / Max help: usage described as **5x or 20x more usage than Pro** per session; **no fixed message/token quota**; rolling **five-hour** window + **weekly** limits (all-models + Sonnet-only style weekly structure still described on Max page).
- Matches repo provenance rule (multipliers, not inventing official token quotas).

**Source URLs**

- https://claude.com/pricing
- https://support.claude.com/en/articles/11049762-choosing-a-claude-ai-plan
- https://support.claude.com/en/articles/11049741-what-is-the-max-plan

**Date checked:** 2026-07-18  
**Verdict:** **CONFIRMED**

**Suggested text fix:** none for prices/mechanics (see item 7 for the dated +50% promo sentence).

---

## 5. Claude Code install one-liners + claude.ai/code web

**What the repo claims**

- macOS/Linux/WSL: `curl -fsSL https://claude.ai/install.sh | bash`
- Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
- Native installer, no Node required (as of July 2026).
- [claude.ai/code](https://claude.ai/code) = zero-install taste via GitHub; daily loop wants local.

**What I found**

- Official setup docs match both one-liners exactly; also document Windows CMD install. Native install recommended; auto-updates.
- Claude Code on the web still documented: connect GitHub, run in Anthropic-managed VM, review PR — zero local install. Aligns with README “zero-install taste.”

**Source URLs**

- https://code.claude.com/docs/en/setup
- https://code.claude.com/docs/en/web-quickstart
- https://support.claude.com/en/articles/12618689-claude-code-on-the-web

**Date checked:** 2026-07-18  
**Verdict:** **CONFIRMED**

**Suggested text fix:** none.

---

## 6. ChatGPT / Codex tiers, install, model selection

**What the repo claims**

- Codex included across ChatGPT plans; **Free includes some usage** (re-verify).
- Planner row: Plus ~**$20**; Pro **$100/5x** and **$200/20x** (as of 2026-07-16).
- Install:
  - macOS/Linux: `curl -fsSL https://chatgpt.com/codex/install.sh | sh`
  - Windows: `powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"`
- Model selection via tool model picker / `/model` (setup.md as of July 2026).

**What I found**

- OpenAI Help: **Codex included across plans, including Free and Go**; limits vary. chatgpt.com/pricing and Codex pricing pages list Free with **limited Codex access**; Plus **expanded Codex**; Pro **maximum Codex** with **5x or 20x** vs Plus.
- Dollar prices: Help Center still documents Plus at **$20/month**; Pro tiers **$100 (5x)** and **$200 (20x)** vs Plus (About ChatGPT Pro tiers). Fetched marketing pages often omit numeric glyphs in the HTML extract, but help-center figures match the repo.
- Install one-liners still match the official openai/codex README quickstart. Note: a July 2026 GitHub issue reports the **served** `chatgpt.com/codex/install.sh` may be **stale** vs repo `main` for some updates — document the official URL but expect possible install/update flakes; npm/Homebrew remain alternatives.
- Model selection: official Codex models docs — UI model/reasoning controls; CLI/config via `config.toml` `model = "..."` and CLI flags; recommended GPT-5.6 Sol/Terra/Luna family. `/model`-style switching remains the right Level-1 mental model (exact slash command may vary by client version).

**Source URLs**

- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- https://chatgpt.com/codex/pricing/
- https://openai.com/chatgpt/pricing/
- https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers
- https://github.com/openai/codex (install quickstart)
- https://developers.openai.com/codex/models
- https://github.com/openai/codex/issues/31766 (stale install.sh report)

**Date checked:** 2026-07-18  
**Verdict:** **CONFIRMED**

**Suggested text fix**

- Optional honesty footnote: *“If `chatgpt.com/codex/install.sh` fails, try npm (`npm i -g @openai/codex`) or Homebrew (`brew install --cask codex`) per OpenAI docs; a July 2026 report said the CDN script lagged `main`.”*
- Optional: mention ChatGPT **Go** as another low tier with Codex (repo Free/$0 door still valid).

---

## 7. Live Anthropic / Cursor promos (mention vs avoid hard-coding)

**What the repo claims**

- economics.md: +50% weekly-limit promo ran **2026-05-13 → 2026-07-13**, **expired** when written — hence no weekly numbers hard-coded.
- No other baked-in coupons found in the published plan table.

**What I found**

- Multiple independent reports (Help Net Security, BotBeat, workflowden, etc.): the Claude Code **+50% weekly limit** boost was **extended through 2026-07-19 11:59 PM PT** (from an original July 13 end). **Today is 2026-07-18**, so the promo is **still live for ~1 day**, then reverts. Repo’s “expired as of July 13” sentence is **outdated**.
- Repo correctly **does not** hard-code inflated weekly quotas — good; only the expiry date line is wrong.
- Cursor: no standing public discount code on pricing; Pro trial removed (item 1). Third-party notes student free-year closed to new signups ~2026-06-25 — do **not** hard-code as available.
- Cursor models page notes a **Claude Sonnet 5 launch promotion** on API rates through **2026-08-31** — relevant to executor burn rate, not something the repo currently hard-codes (fine to omit or mention as ephemeral).

**Source URLs**

- https://www.helpnetsecurity.com/2026/07/13/claude-code-weekly-limits-promotion-extended/
- https://botbeat.news/news/anthropic-extends-50-weekly-usage-limit-boost-for-claude-code-through-july-19-9067
- https://cursor.com/docs/models-and-pricing (Sonnet 5 launch promo note)
- Repo `docs/economics.md` (current claim text)

**Date checked:** 2026-07-18  
**Verdict:** **CHANGED**

**Suggested text fix**

- In `docs/economics.md`, replace the expired-July-13 clause with dated language such as: *“A +50% Claude Code weekly-limit promotion (from 2026-05-13) was extended through 2026-07-19 PT; do not hard-code weekly numbers — re-check `/usage` after that date. The May 6 permanent doubling of 5-hour limits is separate.”*
- After 2026-07-20, mark the weekly boost expired again without baking numbers.
- Continue **not** hard-coding Cursor student/referral deals.

---

## Cross-cutting note for the maintainer

The largest adopter-facing mismatch is **Level 2’s $0 Cursor Pro trial path**: hedging acknowledged removal as possible, but the ladder still sells **“~$20 + free Pro trial”** as the conversion rung. Staff confirmation in **July 2026** that the Pro trial is **gone system-wide** makes that rung’s cost claim a **BLOCKER** until rewritten.
