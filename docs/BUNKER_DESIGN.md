# Bunker Rework — Phase 0 Design

**Round 8 signature feature · Research-informed interaction plan**

## Experience promise and core loop

The bunker should feel like a small place the player inhabits, maintains, and defends—not a room-placement menu. Preserve the side-view cutaway and existing save data, but make movement, work, and danger happen in that view. The loop is:

1. **Day — explore and improve.** Gather supplies outside, excavate adjacent ground, uncover occasional finds, walk between rooms, and repair or upgrade useful stations. Each action has a visible cost and result.
2. **Dusk — read the trade-off.** A compact three-part readout shows **Detectability**, **Air**, and **Structure**, with short cause labels when a value changes. The player can choose whether to seal a vent, dim lights, store food, arm a trap, or reinforce an exposed section; no single configuration is best at everything.
3. **Night — hear, locate, respond.** A staged warning tells the player that something is approaching, then directional sound/marks identify the likely attack point. Species follow different target preferences and attack patterns. The player can reach a relevant station or make a defensive choice before the encounter resolves as held, breached, or retreated.
4. **Dawn — understand and recover.** A concise report names the attacker, its target, what the warning revealed, what the player's choices changed, and any damage or stolen supplies. The player repairs, reinforces, and prepares for a different threat profile next night.

## Systems and readable rules

### A walkable cutaway

Keep the existing four-row, side-on bunker grid. The joystick moves the character horizontally through excavated cells and vertically on visible ladder/stair connections; tapping a cell may select a work target, but does not replace movement or perform the work. Digging takes repeated pickaxe hits: soil type determines hit count, cracks show remaining work, and each hit produces dust/pebbles and a restrained impact cue. Surface soil, roots, clay, and rock get distinct procedural patterns and hardness. A low-probability hidden pocket can reward supplies or a discovery. Long unsupported cavities raise a slow dust warning; placing a visible wooden support prevents a later partial collapse and room damage. Warm lantern/torch pools, flicker, drifting dust, and occasional drips make the space legible and lived-in without obscuring the tiles.

### Rooms as stations; bunkers as identities

Every room definition in `ROOMS` supplies its station action, costs, effects, and upgrade behavior. The player walks to/near a station and presses the main action; a short progress animation confirms use. Kitchen cooks food (with a smell trade-off), workshop crafts defenses, bed restores or advances time at a risk, storage protects food while dampening scent, ventilation exchanges air while leaking scent/noise, and periscope scouts the surface. Additional bunker-specific stations use the same data-driven contract. Room tiers improve both function and visible detail.

Retain all 12 entries in the `BUNKERS` data array. Each entry supplies a visual palette and a clear advantage/weakness (for example, concealment versus poor air, or strong walls versus higher cost), plus small modifiers used by the same systems. Build cards state the trade-off before selection. Avoid one-off bunker branches: a new identity should be expressible in data.

### A fair raid and a useful morning

Raid profiles define species cue, preferred weak point, approach time, damage/loot behavior, and counter. A warning has at least two redundant channels—muffled sound plus a directional marker/track—so a muted device is still playable. During approach, the player can scout, arm a trap, close or open the vent, extinguish a light, bait a different target, or reinforce the entrance. The impact visibly marks the attacked surface, shakes the view briefly, and records its cause. Air and structure consequences remain actionable rather than being hidden random penalties. Threat progression broadens species and attack behaviors instead of simply adding more wolves.

The dawn report is generated from encounter events, not retrospective flavor text: it distinguishes prevented damage, breach, retreat, and losses, and points to the room/defense that mattered. Repair and reinforcement costs are explicit. Preserve the single top-center notification lane; keep the three-stat bunker HUD compact, and keep all persistent HUD panels clear of the joystick and action button.

## Research principles applied (not assets or code)

- [Don't Starve Together — Hound](https://dontstarve.wiki.gg/wiki/Hound/DST): repeated growls signal an approaching attack, and later pressure can leave less warning time. Apply this as an escalating, staged warning—not a surprise damage roll.
- [This War of Mine — Steam overview](https://store.steampowered.com/app/282070/This_War_of_Mine/) and [raids reference](https://this-war-of-mine.fandom.com/wiki/Raids): use the day/night split to make maintenance and defense preparation meaningful; let guards/physical defenses influence raid outcomes.
- [Frostpunk — Xbox Wire, radial-driven controls](https://news.xbox.com/en-us/2019/09/20/frostpunk-console-edition-radial-driven-design-of-gameplay-and-controls/): organize decisions around an essential survival readout, rather than expanding the always-visible HUD.
- [Fallout Shelter — incidents](https://www.ign.com/wikis/fallout-shelter/Incidents) and [Bethesda's overview](https://fallout.bethesda.net/article/2UMBACbtXz5OB97G16IcFC/which-fallout-is-right-for-you): make entry points and room incidents spatially identifiable, so a player can respond quickly.
- [Terraria — bases](https://terraria.wiki.gg/wiki/Guide:Bases) and [arenas](https://terraria.wiki.gg/wiki/Guide:Arena): connect room utility, access, terrain, and event-specific defense into one spatial plan.

## Delivery and acceptance

Implementation stays in `www/index.html`; build setup is unchanged. Deliver in Phases 1–5, with a separate commit and `AGENTS.md` Status update after each phase. After each phase, capture and inspect bunker-view screenshots at **1600×720** and **1280×600** for **idle, digging, night raid, and morning report**; correct readability/overlap issues before committing. `?raidtest=1` is the repeatable night-three prepared-bunker scenario. The 60 fps mid-range-phone target remains a goal, not a verified claim; profile on hardware before treating it as met.
