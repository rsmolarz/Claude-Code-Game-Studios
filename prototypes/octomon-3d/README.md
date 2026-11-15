<!-- PROTOTYPE - NOT FOR PRODUCTION -->
# OCTOMON 3D — walkable-world spike

**Status:** step 1 concluded: round 1 passed, 3D stays. Step 2 (the encounter screen, ported) built (2026-11-14)

## The question

Build order step 1 of `design/game-brief.md`: **does a 3D walkable world feel better on a
phone than the 2D grid does?**

**Kill condition (from the brief):** if the 3D world still feels worse on a phone than the 2D
build after two rounds, stop and keep the 2D game (`prototypes/octomon/`, which this spike
never touches).

## What is in it (and only this)

1. One region: **the Grasslands with the crossroads**. Block ground, a dirt crossroads, block
   trees as the boundary, tall-grass patches, and the shop as a block building you can see but
   not enter.
2. Third-person camera behind and slightly above the player, which follows smoothly. The player
   is the chosen skin (the 2D build's ten emoji skins), shown as a flat cut-out that hops as it walks.
3. Phone controls: a joystick appears under the **left thumb**, and dragging with the
   **right thumb** turns the camera. Laptop testing only: WASD / arrows walk, Q / E turn,
   Space taps.
4. Walking through tall grass shakes it. Each block walked in tall grass has the 2D build's
   Grasslands chance (34%) to rustle hard, and a **Grasslet** (the only creature in the spike)
   pops up in front of you, bobbing and breathing.
5. **Step 2:** tapping it opens the 2D build's encounter screen, ported, not rebuilt: Weaken
   (red flinch, floating damage number), Throw Octeo ball (the arc and the three wobbles), Run,
   the HP bar and the catch odds, with the 2D rules and numbers for Grasslet. You start with 10
   balls (counter top left); a reload refills them. After a catch, a run or an escape the
   Grasslet leaves the grass and you walk on.
6. All tuning is in `config.js`: walk speed, camera, joystick, rustle rate, and the encounter's
   numbers (balls, Grasslet's HP and catch chance, Weaken hits, escape turns), each noted with
   its 2D value.

Out of scope, on purpose: money, shop, Sandstone, perks and family names, Octo Log, Hypercar,
the other three regions, every Octomon except Grasslet (the brief and the 2D build hold the
roster, for reference only), sound, Asher's drawings (the creatures and skins are emoji placeholders,
as in the 2D build).

## How to run it

three.js is loaded as a module, so the page must be **served over http**, not
double-clicked from disk.

- **On this PC:** serve this folder with any static server, then open `http://localhost:<port>/`.
  This machine has no Node.js or Python, so one option is a PowerShell `HttpListener`.
  Another is installing Node.js and running `npx serve`.
- **On the phone:** the folder needs to be reachable from the phone. Either serve it on
  the PC's local network address with the phone on the same Wi-Fi, or put the folder on any
  static host (a hidden itch.io page works: `.claude/docs/share-link.md`).

Play it **next to the 2D build on the same phone**. That comparison is the whole test.

## What to watch for (round 1)

- Does Asher walk around because he wants to, or only to find grass?
- Does he find the left-thumb joystick without being told? Does he ever use the right-thumb turn?
- When the grass rustles and something pops up, is that a bigger moment than in 2D?
- Does he ask for the 2D one back?
- Anything janky on the phone: frame rate, the camera getting stuck behind trees, the thumb areas.

## Findings

- Round 1 (Asher, on the phone): the 3D world was played and liked. The request that came out
  of it was catching: he wants to catch Octomon in the 3D world.
- Round 2: not needed; round 1 settled it.
- Verdict: **3D stays.** We are not going back to the 2D grid. On to Build order step 2: the
  encounter screen, ported from the 2D build (built; item 5 above).
