## Status

Feedback round 2 is in progress. Group A (procedural character animation) is complete: `www/index.html` now draws idle breathing, directional walk/run cycles, a grounded shadow, running dust/leaf puffs, and contextual gathering/swing animations.

Validation passed: inline JavaScript syntax check, `git diff --check`, and a temporary VM smoke test covering movement states, facing, running puffs, and the gathering animation. Groups B–D remain pending. Keep the game self-contained in `www/index.html`; do not change the Android build setup.
