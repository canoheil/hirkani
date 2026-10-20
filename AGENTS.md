## Status

Feedback round 2 is in progress. Groups A and B are complete in `www/index.html`: procedural player idle/walk/run and gather animations; sparse, territory-based wolves/leopards with alert–stalk–chase–attack–retreat AI; pack hunts, leopard ambushes, bites/bleeding/slowdown, off-screen delayed respawns, fire and snare counterplay, plus deer, rabbits, birds, and butterflies.

Validation passed: inline JavaScript syntax check, `git diff --check`, and temporary VM smoke tests for character animation, off-screen predator spawning, night pack alerts, leopard stalking, bite/bleeding damage, fire/snare retreats, and prey hunting. Groups C–D remain pending. Keep the game self-contained in `www/index.html`; do not change the Android build setup.
