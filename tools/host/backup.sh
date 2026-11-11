#!/bin/bash
# Copies the family data to ~/HomeSchool-backups/<date>/ and keeps the last 30 days.
# Runs every night at 03:00 on the server Mac. The Mac that releases also pulls a copy (tools/release.mjs).
set -euo pipefail
cd "$(dirname "$0")/../.."
DEST="${HS_BACKUPS:-$HOME/HomeSchool-backups}/$(date +%F)"
mkdir -p "$DEST"
for f in data/family.json data/family-log.jsonl; do [ -f "$f" ] && cp -p "$f" "$DEST/"; done
find "$(dirname "$DEST")" -mindepth 1 -maxdepth 1 -type d -mtime +30 -exec rm -rf {} +
echo "$(date '+%F %T') Backed up to $DEST"
