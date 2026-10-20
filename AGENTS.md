## Status

Feedback round 2 is in progress. Groups A–C are complete in `www/index.html`: procedural character animation; territory-based predator AI and ambient wildlife; and a stamina HUD, hold-to-sprint control, exhaustion/breathing, and inventory-weight movement penalties.

Validation passed: inline JavaScript syntax check, `git diff --check`, and temporary VM smoke tests for animation, predator behaviors/counterplay/hunting, stamina drain and recovery, forced walking, touch sprint, and heavy-load slowdown. Group D (larger biome/chunk world and compass) remains pending. Keep the game self-contained in `www/index.html`; do not change the Android build setup.
