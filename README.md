# هیرکانی (Hirkani)

A mobile-first, procedural 2D survival game set in the Hyrcanian forests of northern Iran. The game is a single self-contained HTML file (`www/index.html`): Canvas rendering, vanilla JavaScript, generated shapes, and synthesized Web Audio; it has no runtime assets, network requests, or build step.

## Play

Open `www/index.html` in a modern browser, or serve the repository root with any static web server. On a phone, rotate to landscape. Use the left virtual joystick to move, the gold action button to gather or interact, and the food button to eat. At night, survive the animal raid in the bunker; underground, tap a tile to select it, dig outward, place rooms, upgrade them, and repair damage.

Progress is autosaved to local storage. The first 60 seconds include a skippable tutorial. The underground grid supports expandable, upgradeable rooms and 12 data-defined bunker archetypes, from a wooden hut and ancient-root home to an infirmary and low-detection hideout.

## Android debug APK

The project uses Capacitor 6 with `webDir: "www"`. The GitHub Actions workflow installs Node 20, Java 17, and the Android SDK, generates the native Android wrapper, applies landscape/immersive-fullscreen settings, runs `assembleDebug`, and uploads `app-debug.apk` as the `hirkani-debug-apk` artifact.

To generate/build locally:

```sh
npm ci
npx cap add android
node scripts/configure-android.cjs
npx cap sync android
cd android && ./gradlew assembleDebug
```

The generated `android/` directory and dependencies are intentionally ignored; the workflow recreates them from the tracked Capacitor configuration.
