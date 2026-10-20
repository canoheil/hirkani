# Round 4A research notes

Notes prepared before the Round 4A implementation on 2026-10-20. These are design and fact-checking references, not source code or assets to copy.

## World simulation and AI

- **Red Blob Games, Mapgen4** — [repository and project notes](https://github.com/redblobgames/mapgen4). Its README describes a fast procedural wilderness generator that prioritizes readable, attractive terrain over strict physical realism. Useful direction for Hirkani's map overlays: keep terrain/biome information as map data, then render discovered cells, waterways, and markers as separate, inexpensive layers. No Mapgen4 implementation code is being reused.
- **Craig Reynolds, “Steering Behaviors for Autonomous Characters” (GDC 1999)** — [paper](https://www.red3d.com/cwr/papers/1999/gdc99steer.html); the [JavaScript example repository](https://github.com/edwerner/JS-Steering-Behaviors) links the paper and demonstrates the concepts. The seek/flee/wander and group separation/cohesion ideas suit bounded pursuit, spacing, and flank movement; Hirkani will use original, lightweight game logic rather than copy the example.
- **Bob Nystrom, Game Programming Patterns, “State”** — [chapter source](https://github.com/munificent/game-programming-patterns/blob/master/book/state.markdown). It explains finite state machines as a fixed set of exclusive states with explicit event-driven transitions. This supports giving species distinct schedules and transitions instead of expanding one shared predator branch.

## Hyrcanian fauna and scope

- **UNESCO World Heritage Centre, Hyrcanian Forests** — [site overview](https://whc.unesco.org/en/list/1584/). Regional habitat context; the game remains a stylized composite forest, not a location-accurate ecological model.
- **IUCN Red List and species summaries** — [Persian leopard](https://www.iucnredlist.org/search?query=Panthera%20pardus), [gray wolf](https://www.iucnredlist.org/search?query=Canis%20lupus), [brown bear](https://www.iucnredlist.org/search?query=Ursus%20arctos), [wild boar](https://www.iucnredlist.org/search?query=Sus%20scrofa), [golden jackal](https://www.iucnredlist.org/search?query=Canis%20aureus), and [roe deer](https://www.iucnredlist.org/search?query=Capreolus%20capreolus). These are entry points for taxonomy, range, and conservation context, not precise behavior schedules for the game.
- **Wikipedia natural-history summaries** — [leopard](https://en.wikipedia.org/wiki/Leopard), [gray wolf](https://en.wikipedia.org/wiki/Gray_wolf), [brown bear](https://en.wikipedia.org/wiki/Brown_bear), [wild boar](https://en.wikipedia.org/wiki/Wild_boar), [golden jackal](https://en.wikipedia.org/wiki/Golden_jackal), [roe deer](https://en.wikipedia.org/wiki/Roe_deer), and [rabbit](https://en.wikipedia.org/wiki/Rabbit). Used only as broad cross-checks for familiar behavior (solitary ambush, pack movement, omnivory/foraging, flight response, and scavenging); species-specific numerical ranges, schedules, and AI are gameplay abstractions, not claims about individual animals or every Hyrcanian population.

## Implementation guardrails

- Prioritize the requested species behaviors, but express them as data-driven traits and explicit state transitions; keep player stamina relevant to pursuit and escape outcomes.
- Make raids legible through accumulated scent/noise/fire signals and advance warning, not a hidden random attack roll. Keep map discovery and player markers separate from immutable generated terrain and persist only player exploration/marker state.
- All movement, groups, cues, and map features are original implementations. No art, text, or code is copied from the references.

# Round 4B research notes

Notes prepared before the Round 4B gameplay implementation on 2026-10-20. References inform usability, native-species context, and performance techniques only; the character rig, trees, rocks, icons, and interface artwork will be original.

## Mobile touch, HUD hierarchy, and feedback

- **Apple Human Interface Guidelines, Buttons** — [official guidance](https://developer.apple.com/design/human-interface-guidelines/buttons). Buttons need a hit region of at least 44×44 pt, should have a visible press state and enough separation, and should communicate their purpose; Apple advises limiting prominent actions to one or two per view. This informs large, clearly labeled touch controls and one contextual primary action.
- **Apple Human Interface Guidelines, Accessibility** — [official guidance](https://developer.apple.com/design/human-interface-guidelines/accessibility). Apple gives iOS/iPadOS a 44×44 pt default control size, recommends spacing and contrast, and advises using more than color alone to communicate meaning.
- **Apple Human Interface Guidelines, Playing Haptics** — [official guidance](https://developer.apple.com/design/human-interface-guidelines/playing-haptics). Haptics should reinforce the same visual/audio event, be causal and consistent, short for discrete events, and optional; avoid gratuitous vibration.
- **Material Design 3, Designing: Structure** — [target-size and hierarchy guidance](https://m3.material.io/foundations/designing/structure). Material recommends 48×48 dp touch targets (the visible icon may be smaller), at least 8 dp between neighboring targets, and clear hierarchy using multiple visual/text cues.
- **Epic Games, Designing for Mobile in Fortnite** — [mobile design guide](https://dev.epicgames.com/documentation/fortnite/designing-for-mobile-in-fortnite?lang=en-US). Its mobile HUD guidance calls for essential, context-adaptive controls, one primary action at a time, no more than 5–6 active controls, primary actions in bottom thumb zones, and collapsible map/timer information. For input, it recommends dynamic joysticks that appear where the thumb lands and fewer simultaneous touch actions; it also emphasizes strong silhouettes and legible, high-contrast screens. Hirkani will adapt these principles to its survival loop rather than reproduce Fortnite's layouts or assets.
- **Quan Li et al., “Understanding Players’ Interaction Patterns with Mobile Game App UI via Visualizations,” Chinese CHI 2021** — [paper and DOI](https://doi.org/10.1145/3490355.3490357), [arXiv copy](https://arxiv.org/abs/2110.08753). The study examines real multi-touch/joystick-and-button game interactions and argues for inspecting interaction patterns when refining a game UI. This supports testing both thumb zones, joystick dead-zone/response, and contextual-action hit areas rather than assuming desktop-style input.

## Hyrcanian flora and original silhouettes

- **Forest, Rangeland and Watershed Management Organization of Iran, Forest page** — [Hyrcanian forest overview](https://frw.ir/en/page/2206/forest). The page identifies more than 80 native woody species and lists regional trees including Persian ironwood (*Parrotia persica*), European hornbeam (*Carpinus betulus*), Oriental beech (*Fagus orientalis*), oak species (*Quercus* spp.), Hyrcanian boxwood (*Buxus hyrcana*), and Caucasian alder (*Alnus subcordata*). This supports the requested species palette, not a claim that every species co-occurs at one site.
- **Encyclopaedia Iranica, “Forests and Forestry i. In Persia”** — [article](https://www.iranicaonline.org/articles/forests-and-forestry-i/). It describes Hyrcanian forest structure as multi-storied, with dense understory and varied species, and distinguishes lowland, humid montane, and upper forest belts. This informs layered canopy depth and broadleaf variation.
- **Cambridge University Botanic Garden, Persian Ironwood** — [plant profile](https://www.botanic.cam.ac.uk/the-garden/gardens-plantings/trees/persian-ironwood/). The profile describes a flattened, spreading canopy with serpentine branches that self-graft, as well as copper/gold/red autumn leaves. These are cues for a distinctly irregular, fused-branch silhouette, not copied imagery.
- The remaining requested species will be rendered as simplified, original, species-distinguishable silhouettes, not botanical illustrations. The sources establish regional context; no third-party photographs, illustrations, sprites, or tree meshes will be reused.

## Typeface, haptics availability, and Canvas performance

- **Vazirmatn project** — [official repository](https://github.com/rastikerdar/vazirmatn) and its [OFL license](https://github.com/rastikerdar/vazirmatn/blob/master/OFL.txt). The project identifies Vazirmatn as a Persian/Arabic font under the SIL Open Font License 1.1. If bundled for the interface, retain the license notice and use an appropriately subsetted webfont; the typeface license does not apply to Hirkani's original artwork.
- **MDN, Vibration API** — [API overview](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) and [`navigator.vibrate()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate). Browser/device support is limited; unsupported devices do nothing. Haptics must therefore be optional, best-effort, brief, and never the only feedback channel.
- **MDN, Optimizing Canvas** — [Canvas performance guidance](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas). Recommends caching repeated/static work offscreen, batching drawing calls, avoiding unnecessary state changes and blur, and using `requestAnimationFrame()`. These guide a lightweight procedural-art pass; the requested 60 fps remains a target to measure, not a guarantee without physical-device profiling.

## Implementation guardrails

- Keep art and interface assets original; reuse only the properly licensed font file and its required notice.
- Preserve four-direction character facing, use a small rig/state-driven animation layer, and avoid per-frame expensive blur or unbounded offscreen work.
- Keep important controls within thumb reach with generous targets, visible feedback, and a usable non-haptic fallback. Test adaptive layouts and low-end canvas performance where practical.
