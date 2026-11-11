#!/bin/bash
# Puts Node.js (the newest 24.x, long-term support) in ~/HomeSchool-node, from nodejs.org, checked against its published checksum.
# Kept apart from Homebrew, so updating other programs never changes the server's Node. No password needed.
set -euo pipefail
ARCH="$(uname -m)"; [ "$ARCH" = x86_64 ] && ARCH=x64
BASE="https://nodejs.org/dist/latest-v24.x"; TMP="$(mktemp -d)"
FILE="$(curl -fsSL "$BASE/SHASUMS256.txt" | awk -v a="darwin-$ARCH.tar.gz" '$2 ~ a"$" {print $2}')"
curl -fsSL "$BASE/$FILE" -o "$TMP/$FILE"
curl -fsSL "$BASE/SHASUMS256.txt" | grep " $FILE\$" | (cd "$TMP" && shasum -a 256 -c -)
rm -rf "$HOME/HomeSchool-node" && mkdir -p "$HOME/HomeSchool-node"
tar -xzf "$TMP/$FILE" -C "$HOME/HomeSchool-node" --strip-components 1
rm -rf "$TMP"
echo "Node $("$HOME/HomeSchool-node/bin/node" -v) is in ~/HomeSchool-node"
