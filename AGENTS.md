## Status

Round 2, Groups A–D, is complete. Round 3 is in progress: Group A (directional sprite facing) is complete; biome transitions/world edges, art direction, sanity, and crafting remain. The game stays self-contained in `www/index.html`; the Android build setup is unchanged.

Group A fixes player orientation by keeping the sprite upright, selecting front/back/side cardinal facing, and mirroring left; animals also use cardinal facing rather than movement-angle rotation. The player has distinct front/back details and animals use discrete cardinal poses.

Validation passed: inline JavaScript syntax check, `git diff --check`, the orientation VM smoke test, and the Round 2 A–D smoke tests. No physical-device testing has been performed.
