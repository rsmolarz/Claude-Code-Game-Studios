// PROTOTYPE - NOT FOR PRODUCTION
// Question: Does a 3D walkable world feel better on a phone than the 2D grid?
// Date: 2026-11-14
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html). Change these between round 1 and round 2.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)

  // ---- Walking ----
  walkSpeed:   { value: 4.2,  min: 1,   max: 10,  step: 0.1 },  // blocks per second at full stick
  playerSize:  { value: 1.5,  min: 0.6, max: 3,   step: 0.1 },  // the skin sprite's height, in blocks
  bobHeight:   { value: 0.14, min: 0,   max: 0.5, step: 0.01 }, // how high the skin hops per step, blocks
  bobRate:     { value: 9,    min: 2,   max: 20,  step: 0.5 },  // hops per second at full speed (radians/s / 2)

  // ---- Camera: behind and slightly above ----
  camDistance: { value: 6.5,  min: 3,   max: 14,  step: 0.1 },  // blocks behind the player
  camHeight:   { value: 3.6,  min: 1,   max: 10,  step: 0.1 },  // blocks above the player's feet
  camFov:      { value: 60,   min: 40,  max: 90,  step: 1 },    // degrees, vertical
  camFollow:   { value: 6,    min: 1,   max: 20,  step: 0.5 },  // how fast the camera catches up (1/s)
  camAutoTurn: { value: 1.6,  min: 0,   max: 6,   step: 0.1 },  // how fast the camera swings behind a walking player (1/s); 0 = never
  camDragTurn: { value: 0.008, min: 0.002, max: 0.03, step: 0.001 }, // radians per pixel dragged on the right side
  camKeyTurn:  { value: 2.2,  min: 0.5, max: 5,   step: 0.1 },  // radians per second for Q / E (laptop testing only)

  // ---- Phone joystick ----
  stickRadius: { value: 60,   min: 30,  max: 120, step: 5 },    // CSS pixels from the centre to full speed
  stickDead:   { value: 0.12, min: 0,   max: 0.5, step: 0.01 }, // fraction of the radius that does nothing

  // ---- Tall grass: the rustle ----
  rustleRate:  { value: 0.34, min: 0,   max: 1,   step: 0.01 }, // chance per block walked in tall grass (the 2D build's Grasslands rate)
  rustleTime:  { value: 0.45, min: 0.1, max: 2,   step: 0.05 }, // seconds the grass shakes before the Octomon pops up
  appearDist:  { value: 2.6,  min: 1.5, max: 6,   step: 0.1 },  // blocks in front of the player where it appears
  appearSideAngle: { value: 0.4, min: 0, max: 1, step: 0.05 }, // radians the camera sits off to one side as it appears, so the player never hides it
  creatureSize:{ value: 1.7,  min: 0.6, max: 4,   step: 0.1 },  // the Octomon sprite's height, in blocks
  breathRate:  { value: 2.6,  min: 0.5, max: 8,   step: 0.1 },  // breaths per second, radians/s / 2 (the 2D bob is 2.4 s)

  // ---- Screen ----
  maxPixelRatio: { value: 2,  min: 1,   max: 3,   step: 0.5 },  // caps the phone's pixel density for speed
};
