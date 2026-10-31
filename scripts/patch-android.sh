#!/usr/bin/env bash
# Apply committed release resources to the generated Capacitor Android project.
set -euo pipefail
cd "$(dirname "$0")/.."
res=android/app/src/main/res
[[ -f android/app/build.gradle && -d "$res" ]] || { echo 'Generate Android first: npx cap add android' >&2; exit 1; }
node scripts/configure-android.cjs
# Remove all Capacitor-branded vectors and density/orientation splash alternatives.
rm -f "$res/drawable/splash.png"
rm -f "$res/drawable-v24/ic_launcher_foreground.xml" "$res/drawable/ic_launcher_background.xml" "$res/values/ic_launcher_background.xml"
rm -f "$res"/drawable-land-*/splash.png "$res"/drawable-port-*/splash.png
cp -R android-res/. "$res/"
node <<'NODE'
const fs = require('node:fs');
const gradle = 'android/app/build.gradle';
let text = fs.readFileSync(gradle, 'utf8');
if (!/versionCode\s+\d+/.test(text) || !/versionName\s+["'][^"']+["']/.test(text)) throw new Error('Unexpected Android version template');
text = text.replace(/versionCode\s+\d+/, 'versionCode 1').replace(/versionName\s+["'][^"']+["']/, 'versionName "1.0.0"');
fs.writeFileSync(gradle, text);
const strings = 'android/app/src/main/res/values/strings.xml';
text = fs.readFileSync(strings, 'utf8');
for (const key of ['app_name', 'title_activity_main']) {
  const re = new RegExp(`(<string name="${key}">)[^<]*(</string>)`);
  if (!re.test(text)) throw new Error(`Missing ${key}`);
  text = text.replace(re, '$1Hirkani$2');
}
fs.writeFileSync(strings, text);
NODE
echo 'Applied Hirkani Android branding and version 1.0.0 (1).'
