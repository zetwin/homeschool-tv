#!/bin/bash
# Turns this Mac into the family's Home School server. Run it on the server Mac, inside the project folder.
# Safe to run again: it only rewrites its own three background jobs. Usage: tools/host/setup.sh
#  - tv.homeschool.server  keeps Home School running on port 8080, starts at login, restarts if it stops,
#                          and keeps the Mac awake while it's on the charger
#  - tv.homeschool.backup  copies the family data every night at 03:00 (tools/host/backup.sh)
#  - tv.homeschool.update  takes the newest checked version from GitHub every night at 04:00 (tools/host/update.sh)
# Test runs can change HS_PORT and HS_LABEL so they don't touch the real service.
set -euo pipefail
cd "$(dirname "$0")/../.."
APP="$PWD"; PORT="${HS_PORT:-8080}"; LABEL="${HS_LABEL:-tv.homeschool}"
NODE="$HOME/HomeSchool-node/bin/node"; [ -x "$NODE" ] || NODE="$(command -v node || true)"
[ -n "$NODE" ] && [ "$("$NODE" -p 'process.versions.node.split(".")[0]')" -ge 22 ] || { echo "Node 22 or newer is missing. Run tools/host/install-node.sh first."; exit 1; }
AGENTS="$HOME/Library/LaunchAgents"; LOGS="$HOME/Library/Logs/HomeSchool"; mkdir -p "$AGENTS" "$LOGS" "$APP/data"
chmod +x tools/host/*.sh

job() { # name, program arguments as <string> lines, extra keys
  cat > "$AGENTS/$LABEL.$1.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>$LABEL.$1</string>
  <key>ProgramArguments</key><array>$2</array>
  <key>WorkingDirectory</key><string>$APP</string>
  <key>EnvironmentVariables</key><dict>
    <key>HS_DATA</key><string>$APP/data/family.json</string>
    <key>HS_PORT</key><string>$PORT</string>
    <key>HS_LABEL</key><string>$LABEL</string>
    <key>PATH</key><string>$(dirname "$NODE"):/usr/bin:/bin:/usr/sbin:/sbin</string>
  </dict>
  <key>StandardOutPath</key><string>$LOGS/$1.log</string>
  <key>StandardErrorPath</key><string>$LOGS/$1.log</string>
  $3
</dict></plist>
PLIST
  plutil -lint -s "$AGENTS/$LABEL.$1.plist"
  launchctl bootout "gui/$(id -u)/$LABEL.$1" 2>/dev/null || true
  launchctl bootstrap "gui/$(id -u)" "$AGENTS/$LABEL.$1.plist"
}
# caffeinate -s keeps the Mac from sleeping while it is on the charger and the server runs.
job server "<string>/usr/bin/caffeinate</string><string>-is</string><string>$NODE</string><string>tools/serve.mjs</string><string>--lan</string><string>$PORT</string>" \
  "<key>RunAtLoad</key><true/><key>KeepAlive</key><true/><key>ThrottleInterval</key><integer>10</integer>"
job backup "<string>/bin/bash</string><string>tools/host/backup.sh</string>" \
  "<key>StartCalendarInterval</key><dict><key>Hour</key><integer>3</integer><key>Minute</key><integer>0</integer></dict>"
job update "<string>/bin/bash</string><string>tools/host/update.sh</string>" \
  "<key>StartCalendarInterval</key><dict><key>Hour</key><integer>4</integer><key>Minute</key><integer>0</integer></dict>"

for i in 1 2 3 4 5 6 7 8 9 10; do curl -fs -o /dev/null "http://localhost:$PORT/" && break; sleep 1; done
if curl -fs -o /dev/null "http://localhost:$PORT/"; then
  echo "Home School is running: http://$(scutil --get LocalHostName).local:$PORT and http://$(ipconfig getifaddr en0 || ipconfig getifaddr en1):$PORT"
else echo "Home School didn't start. See $LOGS/server.log"; exit 1; fi
