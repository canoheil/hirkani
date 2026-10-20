const fs = require('node:fs');
const path = require('node:path');

const androidRoot = path.resolve(__dirname, '..', 'android');
const manifestPath = path.join(androidRoot, 'app', 'src', 'main', 'AndroidManifest.xml');
if (!fs.existsSync(manifestPath)) {
  throw new Error('Android project not found. Run `npx cap add android` first.');
}

let manifest = fs.readFileSync(manifestPath, 'utf8');
const activityPattern = /<activity\b(?=[^>]*android:name=["'][^"']*MainActivity["'])[^>]*>/s;
const match = manifest.match(activityPattern);
if (!match) throw new Error('Could not find the Capacitor MainActivity in AndroidManifest.xml.');
let activityTag = match[0];
if (/android:screenOrientation=/.test(activityTag)) {
  activityTag = activityTag.replace(/android:screenOrientation="[^"]*"/, 'android:screenOrientation="landscape"');
} else {
  activityTag = activityTag.replace('<activity', '<activity android:screenOrientation="landscape"');
}
manifest = manifest.replace(activityPattern, activityTag);
fs.writeFileSync(manifestPath, manifest);

function findMainActivity(dir) {
  if (!fs.existsSync(dir)) return null;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findMainActivity(fullPath);
      if (found) return found;
    } else if (/^MainActivity\.(java|kt)$/.test(entry.name)) return fullPath;
  }
  return null;
}

const activityPath = findMainActivity(path.join(androidRoot, 'app', 'src', 'main', 'java'));
if (!activityPath) throw new Error('Could not find MainActivity.java/kt for fullscreen configuration.');
let source = fs.readFileSync(activityPath, 'utf8');
if (activityPath.endsWith('.java')) {
  if (!source.includes('SYSTEM_UI_FLAG_IMMERSIVE_STICKY')) {
    const classPattern = /(public\s+class\s+MainActivity\s+extends\s+BridgeActivity\s*\{)/;
    if (!classPattern.test(source)) throw new Error('Unexpected Capacitor MainActivity.java template.');
    source = source.replace(classPattern, `$1
  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) hideSystemBars();
  }

  private void hideSystemBars() {
    getWindow().getDecorView().setSystemUiVisibility(
      android.view.View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        | android.view.View.SYSTEM_UI_FLAG_FULLSCREEN
        | android.view.View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        | android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        | android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        | android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE
    );
  }
`);
  }
} else if (!source.includes('IMMERSIVE_STICKY')) {
  const classPattern = /(class\s+MainActivity\s*:\s*BridgeActivity\s*\{)/;
  if (!classPattern.test(source)) throw new Error('Unexpected Capacitor MainActivity.kt template.');
  source = source.replace(classPattern, `$1
  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)
    if (hasFocus) window.decorView.systemUiVisibility = (
      android.view.View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        or android.view.View.SYSTEM_UI_FLAG_FULLSCREEN
        or android.view.View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        or android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        or android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        or android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE
    )
  }
`);
}
fs.writeFileSync(activityPath, source);
console.log('Configured landscape orientation and immersive fullscreen.');
