# Game Brief: OCTOMON

## In your words

Asher (8) is the designer. His dad types. In their words, across the design sessions:

- "he like Minecraft, Pokémon"
- "We want include a new type of creature for the game."
- "He wants to be able to name characters that are playing like members of the family."
- "He wants them to have the catching feature."
- "Oraborus balls there how we catch our creatures." — later drawn and relabelled by Asher as **"the Octeo ball"**: a circle with sun, sea and sand inside it.
- "The creatures are called octomon."
- "There are going to be four regions and the characters are going to have skins."
- "If evolves if you have to catch octomon it has a 50/50 chance of dropping a sandstone."
- "can we make the game much more realistic?" → his own drawings instead of emoji, things that move and animate, and **a 3D world you walk around in**.

Asher's creatures, from his drawn cards, in his words:

| Name | His card says | Special move |
|---|---|---|
| **St. Pirate** | type: fighting and water · rare 5/10 | Hook Whirl — catches a thrown ball on his hook and throws it back |
| **Mr. Crab Pants** | type: beach and builder · rare 10/10 · "special evolution" | Sand Wall |
| **Tacoman** | rarity 10/10 · 2 biomes | Taco Rain |
| **Mr. Flyer** | rarity **12/10** · biome: "unknown biome" | bomb attack |
| **Mech** | biome: ~~Minecraft~~ **"Blocky"** (his own correction) · rarity 10/10 | Mech Blast |
| **Rage Monster** (first "John Sena") | "last, rarest, in forest biome" | wrestling moves |

Three slots are still unfilled — the roster is eight.

**Pitch:** Catch Asher's own hand-drawn Octomon across four regions by throwing Octeo balls, and hunt down the Rage Monster in the forest.

**Genre:** creature-catching adventure

**Controls:** walk the world with WASD / arrow keys and on-screen buttons; on-screen buttons for Weaken, Throw and Run in an encounter. *(Phone must work — the designer plays on a phone.)*

**Question:** does a 3D world make it feel more real to an 8-year-old than the animated 2D one already does? *(That is the actual open question — the 2D build is finished, animated and playable. 3D is the bet, not the assumption.)*

**Hooks:**
- Every Octomon has a different way of ruining your throw — a hook that catches the ball, a wall that blocks it, a heal, a bomb that destroys your balls, a blast that ends the encounter, random wrestling moves. No two are solved the same way.
- The sprites are the designer's actual marker drawings, photographed and cut out in-game.

**Intent:** soft failure — you lose balls and money, never a run *(you said)*

## Look and references
- Look: blocky, bright and hand-made. Flat saturated regions — forest green, beach sand, deep water, brick — with the creatures as the designer's own photographed drawings standing in the world, not models. Signature detail: the Octeo ball is a little beach scene (sun, sea, sand) sealed inside a ring.
- References: Minecraft (the blocky world and the building), Pokémon (the catching loop and the log). Both named by the designer.
- View: **3D** · Camera: third-person, behind and slightly above, walkable.

## First minute
You type your family's names, pick a skin, and land at the crossroads with 10 Octeo balls. Walking into tall grass rustles it and a wild Octomon appears — it bobs and breathes. You hit Weaken, it flinches red and a damage number floats up. You throw: the ball arcs through the air, lands, and wobbles three times. It bursts and the Octomon breaks free. That wobble is the hook paying off.

## Challenge
Trouble arrives on the first 10/10 creature, usually within a few minutes. Mr. Crab Pants puts up a Sand Wall before you can throw and rebuilds it once. Mr. Flyer destroys two of your balls outright. Mech ends the encounter and knocks you back to the crossroads. A loss costs balls and the money a catch would have paid. Later, Rage Monster appears in the forest only once the other seven are caught, and takes random wrestling moves at you every turn.

## Core loop
- Walk a region → something rustles → an Octomon appears
- Weaken it, work around its special move, throw an Octeo ball
- Catch it: it joins the Octo Log, pays out, and 50/50 drops a Sandstone
- Spend the money at the shop on balls, Sandstone, or the $25.60 Hypercar → reach the harder regions faster

## Goal & fail state
- Fill all eight slots in the Octo Log to become Octo Champion. Runs don't end — you lose balls and money, and a rare Octomon can escape, but you keep going.

## Features
- [x] Four regions — Deep Forest, Grasslands, Beach, Blocky Lands *(names provisional — Asher has not named them yet)*
- [x] Octeo ball throw with the three-wobble catch
- [x] Six of Asher's Octomon with their own special moves
- [x] Family characters with perks and skins
- [x] Sandstone drops and Mr. Crab Pants' evolution at 8
- [x] Shop, money, and the $25.60 Hypercar fast travel
- [x] Art Studio — photograph a drawing, white is cut out, it becomes the sprite
- [ ] 3D walkable world replacing the tile grid
- [ ] The last three Octomon

## Your systems
- catching · in the slice
- four regions · in the slice
- skins · in the slice
- evolution via Sandstone · in the slice
- shop and money · in the slice
- creature battles (send out your own Octomon to fight) · later
- building, Minecraft-style · later

## Keep
- the three-wobble ball throw *(he said he likes it)*
- Hook Whirl *(you said: "Asher likes that")*
- the Hypercar at exactly $25.60 — his number, not a rounded one
- "Blocky", not "Minecraft" — his own correction on the Mech card

## Avoid
- emoji as final creature art — placeholders only, replaced by his drawings
- anything that needs a keyboard to play; he plays on a phone
- a half-finished 3D build replacing a working 2D one

## Out of scope
- multiplayer over a network (two players take turns on one device instead)
- no accounts, no server — progress saves in the browser
- no sounds for now *(he did not pick sound when asked)*
- trading between players

## Build order
1. 3D walkable world: one region first, third-person camera, phone controls. Prove it feels better than the 2D grid before converting the other three.
2. Port the encounter screen onto it unchanged — the catching loop is finished and liked; don't rebuild it.
3. The other three regions.
4. Asher's last three Octomon.

---
**Kill condition:** if the 3D world still reads worse on a phone than the 2D build after two rounds, stop and keep the 2D game.

**Who it's for / what they feel:** an 8-year-old who wants to see his own drawings alive in a world he can walk around, and his family playing it with him.

**Games you love / don't:** Love Minecraft (blocky world, building, the Blocky biome came straight from it); love Pokémon (the catching loop, the log, rarity).

<!-- Names ending in "-mon", "Mr. Crab Pants" and the original "John Sena" borrow from real things. Fine for a family game; rename before any public release. -->
