# anchor-ping.ps1 - fire one minimal Claude prompt to open a 5-hour usage
# window deliberately, so the reset lands where your schedule wants it.
# Schedule this at the times `node tracker.js anchors` prints (see README).
#
# Guard: asks tracker.js for the current window state first and SKIPS if a
# window is already open - a scheduled ping never spends anything unless it
# would actually move your reset time. Pass -Force to ping regardless.
#
# Every fire/skip/error is appended to logs/anchor-log.jsonl, which
# `node tracker.js report` shows the tail of.

param([switch]$Force)

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$logDir = Join-Path $here "logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$logPath = Join-Path $logDir "anchor-log.jsonl"

function Write-AnchorLog([string]$action, [string]$reason) {
    $entry = [ordered]@{
        t      = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz")
        action = $action
        reason = $reason
    } | ConvertTo-Json -Compress
    Add-Content -Path $logPath -Value $entry
}

# --- guard: is a window already open? (fast path: recent transcripts only)
$state = $null
try {
    $raw = node (Join-Path $here "tracker.js") last-activity --recent 2>$null
    $state = $raw | ConvertFrom-Json
} catch {
    # tracker unavailable or unparsable - proceed; worst case the ping is
    # redundant, which costs one near-empty haiku prompt.
}

if ($state -and $state.windowOpen -and -not $Force) {
    Write-AnchorLog "skip" ("window already open, resets " + $state.windowResetsISO)
    exit 0
}

# --- read the ping prompt/model from config.json (defaults if absent)
$prompt = "."
$model = "haiku"
$cfgPath = Join-Path $here "config.json"
if (Test-Path $cfgPath) {
    try {
        $cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
        if ($cfg.anchor -and $cfg.anchor.prompt) { $prompt = $cfg.anchor.prompt }
        if ($cfg.anchor -and $cfg.anchor.model)  { $model = $cfg.anchor.model }
    } catch {
        # bad config: fall back to defaults rather than not anchoring
    }
}

# --- fire the ping
try {
    $out = claude -p $prompt --model $model 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
        Write-AnchorLog "fired" ("model=" + $model)
    } else {
        $msg = $out.Trim()
        if ($msg.Length -gt 200) { $msg = $msg.Substring(0, 200) }
        Write-AnchorLog "error" ("exit " + $LASTEXITCODE + ": " + $msg)
        exit 1
    }
} catch {
    Write-AnchorLog "error" $_.Exception.Message
    exit 1
}
