## Status

Round 2, Groups A–D, is complete. Round 3 is in progress: Groups A–D are complete (cardinal sprite facing; blended biomes/world edges; hand-drawn art/lighting; sanity). The categorized crafting menu remains. The game stays self-contained in `www/index.html`; the Android build setup is unchanged.

Group A keeps the player upright, selects front/back/side cardinal facing, and mirrors left; animals use discrete cardinal facing rather than movement-angle rotation. Group B adds multi-octave warped biome fields with smooth ground-color and vegetation/resource blending, continuous ground decals, a dense forest/cliff perimeter, safe movement bounds, and world clipping/culling. Group C adds inked cutout outlines, gentle tree/bush sway, soft shadows, strict Y-sorted props, a darker night palette with radial fire/torch lighting, and moving morning fog. Group D adds a persistent sanity stat with night/predator drain, bunker/fire recovery, a HUD meter, low-sanity screen distortion, and separate harmless shadow hallucinations.

Validation passed: inline JavaScript syntax check, `git diff --check`, VM smoke tests for orientation, biome continuity/bounds, art/night/morning rendering, sanity behavior and HUD, plus Round 2 A–D behavior. No physical-device testing has been performed.
