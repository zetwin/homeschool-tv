#!/bin/bash
# Takes the newest checked version (the main branch) from GitHub. Run on the server Mac; also runs every night at 04:00.
# The family data in data/ is never touched. The server restarts only when its own code changed.
set -euo pipefail
cd "$(dirname "$0")/../.."
LABEL="${HS_LABEL:-tv.homeschool}"
before="$(git rev-parse HEAD)"
git fetch -q origin main
git reset -q --hard origin/main
after="$(git rev-parse HEAD)"
if [ "$before" = "$after" ]; then echo "$(date '+%F %T') Already up to date: $(git log -1 --format='%h %s')"; exit 0; fi
echo "$(date '+%F %T') Updated to: $(git log -1 --format='%h %s')"
if ! git diff --quiet "$before" "$after" -- tools/serve.mjs tools/host/; then
  launchctl kickstart -k "gui/$(id -u)/$LABEL.server" && echo "Server restarted, because its code changed."
fi
