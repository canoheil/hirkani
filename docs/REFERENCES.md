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
