#!/usr/bin/env bash
# Watch origin for new commits on the current branch and fast-forward pull.
# Run this in a second terminal alongside `npm run dev` — Turbopack will
# auto-reload when pulled files change, so the browser refreshes itself.
#
# Usage:
#   npm run sync                  # watches the current branch, 5s interval
#   bash scripts/sync.sh main 10  # custom branch + interval (seconds)

set -u

BRANCH="${1:-$(git rev-parse --abbrev-ref HEAD)}"
INTERVAL="${2:-5}"

printf "→ syncing %s every %ss from origin (Ctrl-C to stop)\n" "$BRANCH" "$INTERVAL"

while true; do
  if git fetch origin "$BRANCH" --quiet 2>/dev/null; then
    LOCAL=$(git rev-parse HEAD 2>/dev/null || echo "")
    REMOTE=$(git rev-parse "origin/$BRANCH" 2>/dev/null || echo "")
    if [ -n "$LOCAL" ] && [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
      SHORT=$(git rev-parse --short "$REMOTE")
      printf "◎ new commit %s on %s — pulling\n" "$SHORT" "$BRANCH"
      if git pull origin "$BRANCH" --ff-only --quiet; then
        printf "✓ up to date — Next will hot-reload\n"
      else
        printf "✗ pull failed (local changes or non-ff). Resolve, then re-run.\n"
      fi
    fi
  fi
  sleep "$INTERVAL"
done
