import pw from '/opt/npm-tools/node_modules/playwright/index.js';
const { chromium, devices } = pw;
const B = 'http://localhost:8765/index.html';
const b = await chromium.launch();
const fails = [];
const ok = (c, m) => { console.log((c?'  ok  ':'  FAIL'), m); if (!c) fails.push(m); };

async function page(name, q) {
  const ctx = await b.newContext({ ...devices[name], deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  p.on('pageerror', e => fails.push('PAGEERROR ' + e.message));
  p.on('console', m => { if (m.type()==='error') fails.push('CONSOLE ' + m.text()); });
  await p.goto(B + q);
  await p.waitForTimeout(2200);
  return p;
}

// --- the line-up: every model, St. Pirate and Swoopy included
console.log('\nmodels');
let p = await page('iPad (gen 7) landscape', '?scene=figures&seed=1');
await p.screenshot({ path: 'c-lineup.png' });
await p.close();

// --- play: the bag, the shop, the strip, a throw
console.log('\nplay');
p = await page('iPad (gen 7) landscape', '?scene=play&fresh=1&seed=1');
let w = await p.evaluate(() => window.__wallet());
ok(w.balls === 10 && w.bag.octeo === 10, 'starts with 10 Octeo balls, nothing else: ' + JSON.stringify(w.bag));
ok(w.pick === 'octeo', 'and throws the Octeo ball by default');

// buy one of each at the shop
await p.evaluate(() => { window.__give(600, 0); });
// DOOR is in world coords; warp takes tiles, so convert back
const d = await p.evaluate(() => { const o = window.__door(); const N = 36; return { tx: o.x + N/2 - 0.5, tz: o.z + N/2 - 0.5 }; });
await p.evaluate(({tx,tz}) => window.game.warp(tx, tz), d);
await p.evaluate(() => window.game.step(240, false));
let shopOpen = await p.evaluate(() => !document.getElementById('shopScreen').classList.contains('hide'));
ok(shopOpen, 'the shop opens at the door');
if (shopOpen) {
  const names = await p.$$eval('#shelves .shelf .txt b', e => e.map(n => n.textContent));
  ok(names.length === 6, 'six things for sale: ' + names.join(' / '));
  ok(names.includes('Great Octoball') && names.includes('Ultra Octoball') && names.includes('Super Duper Octoball'),
     "Asher's three new balls are on the shelf");
  await p.screenshot({ path: 'c-shop.png' });
  // buy the Great one (row 2)
  const before = await p.evaluate(() => window.__wallet());
  await p.$$eval('#shelves .shelf button', bs => bs[1].click());
  const after = await p.evaluate(() => window.__wallet());
  ok(after.bag.great === 1, 'buying the Great Octoball puts one in the bag');
  ok(Math.abs((before.coins - after.coins) - 20) < 0.001, 'and costs 20: ' + (before.coins - after.coins).toFixed(2));
  // the Super Duper at 500
  await p.$$eval('#shelves .shelf button', bs => bs[3].click());
  const sup = await p.evaluate(() => window.__wallet());
  ok(sup.bag.super === 1, 'the Super Duper costs 500 and is affordable at 600');
  await p.evaluate(() => window.game.press('Escape'));
}

// a fight: the strip, the odds, and the Super Duper always catching
await p.evaluate(() => { document.getElementById('shopScreen').classList.add('hide'); });
await p.evaluate(() => window.game.warp(8, 24));   // away from the shop door, or it reopens
await p.evaluate(() => window.game.spawn('grasslet'));
await p.evaluate(() => window.game.meet());
await p.waitForTimeout(300);
let f = await p.evaluate(() => window.game.fight);
ok(f.open, 'an encounter opens');
const chips = await p.$$eval('#ballStrip .chip', e => e.length);
ok(chips === 3, 'the picker shows a chip per kind you carry: ' + chips);
const oddsOcteo = await p.$eval('#fOdds', e => e.textContent);
await p.evaluate(() => window.__pick('great'));
const oddsGreat = await p.$eval('#fOdds', e => e.textContent);
const pct = t => parseInt(String(t).replace(/\D/g, ''), 10);
ok(pct(oddsGreat) > pct(oddsOcteo), 'the Great ball shows better odds: ' + oddsOcteo + ' -> ' + oddsGreat);
const label = await p.$eval('#bBall', e => e.textContent);
ok(label === 'Throw Great Octoball', 'the button names the ball you picked: ' + label);
await p.screenshot({ path: 'c-fight.png' });

// the Super Duper catches it every single time, as Asher asked
await p.evaluate(() => window.__pick('super'));
await p.evaluate(() => window.game.throwBall());
await p.waitForTimeout(3200);
const caught = await p.evaluate(() => window.game.caught);
ok(caught.includes('grasslet'), 'the Super Duper Octoball catches it');
const bagAfter = await p.evaluate(() => window.__wallet());
ok(bagAfter.bag.super === 0, 'and is used up');
ok(bagAfter.pick !== 'super', 'the picker moves off a kind you have run out of: ' + bagAfter.pick);
await p.close();

// --- the Super Duper really does catch every time, even the Rage Monster, on any seed
console.log('\nthe Super Duper, 12 tries on the rarest one');
let every = true;
for (let seed = 1; seed <= 12; seed++) {
  const q = await page('iPad (gen 7) landscape', '?scene=play&fresh=1&seed=' + seed);
  await q.evaluate(() => { window.__catchAll(); window.__balls({ octeo: 0, great: 0, ultra: 0, super: 1 }); });
  await q.evaluate(() => window.game.spawn('rage'));
  await q.evaluate(() => window.game.meet());
  await q.waitForTimeout(250);
  await q.evaluate(() => window.game.throwBall());
  await q.waitForTimeout(3200);
  const got = await q.evaluate(() => window.game.caught.includes('rage'));
  if (!got) every = false;
  await q.close();
}
ok(every, 'caught the Rage Monster on all 12 seeds');

// --- Asher's types and the Octomon index
console.log('\ntypes and the index');
p = await page('iPad (gen 7) landscape', '?scene=play&fresh=1&seed=2');
const types = await p.evaluate(() => ({
  all: window.game.types.all,
  each: Object.fromEntries(window.game.types.each.map(d => [d.id, d.line])),
}));
ok(types.all.length === 12, 'twelve types, Taco and Rage Power included: ' + types.all.join(','));
ok(types.all.includes('taco') && types.all.includes('rage'), "Tacoman's own type and Rage Power exist");
const want = { grasslet:'Grass + Bug', pirate:'Fighting + Water', taco:'Taco + Rock',
  crab:'Rock + Fighting', mech:'Mech + Fighting', flyer:'Flying + Water',
  rage:'EVERY TYPE', swoopy:'Type not decided yet', ragejr:'EVERY TYPE but Rage Power' };
for (const [id, line] of Object.entries(want))
  ok(types.each[id] === line, id + ' is ' + line + (types.each[id] === line ? '' : ' — got ' + types.each[id]));
await p.click('#logBtn');
await p.waitForTimeout(300);
const cards = await p.$$eval('#cards .card .n', e => e.map(n => n.textContent));
ok(cards.length === 8, 'the index lists all eight: ' + cards.length);
ok(cards.includes('Mr. Crab Pants'), 'and names the ones you have NOT caught, so you know what to find');
const typeChips = await p.$$eval('#cards .card:nth-child(5) .ty', e => e.map(n => n.textContent.trim()));
ok(typeChips.length === 2, 'an uncaught one still shows its types: ' + typeChips.join(' / '));
const soon = await p.$$eval('#soon .card .n', e => e.map(n => n.textContent));
ok(soon.length === 1 && soon[0].includes('Rage Monster Jr'), 'Junior is listed as designed but not in yet');
ok(await p.evaluate(() => document.getElementById('logBtn').classList.contains('hide')),
   'the log badge gets out of the way while the index is open');
await p.close();

// --- GOTCHA! and its sound
console.log('\nthe Gotcha');
p = await page('iPad (gen 7) landscape', '?scene=play&fresh=1&seed=5');
await p.evaluate(() => { window.__notes = [];
  const AC = window.AudioContext; window.AudioContext = class extends AC {
    createOscillator(){ const o = super.createOscillator(); const f = o.frequency.setValueAtTime.bind(o.frequency);
      o.frequency.setValueAtTime = (v,t) => { window.__notes.push(Math.round(v)); return f(v,t); }; return o; } };
  // hold the splash open: a screenshot of this page can take longer than its two seconds
  const e = document.getElementById('gotcha');
  new MutationObserver(() => { if (e.classList.contains('hide')) e.classList.remove('hide'); })
    .observe(e, { attributes:true, attributeFilter:['class'] });
});
await p.evaluate(() => { window.__balls({ octeo:0, great:0, ultra:0, super:3 }); });
await p.evaluate(() => window.game.warp(8, 24));
await p.evaluate(() => window.game.spawn('grasslet'));
await p.evaluate(() => window.game.meet());
await p.waitForTimeout(300);
p.evaluate(() => window.game.throwBall()).catch(() => {});   // fire and forget: the page may close first
let up = false;
for (let i = 0; i < 60 && !up; i++) { await p.waitForTimeout(100);
  up = await p.evaluate(() => !document.getElementById('gotcha').classList.contains('hide')); }
ok(up, 'catching one puts GOTCHA! on the screen');
const shot = await p.evaluate(() => { const w = getComputedStyle(document.querySelector('#gotcha .word'));
  return { op: w.opacity, who: document.getElementById('gotchaWho').textContent }; });
ok(shot.op === '1', 'and it is actually visible, not waiting on an animation: opacity ' + shot.op);
ok(shot.who === 'You caught Grasslet!', 'it names what you caught: ' + shot.who);
const notes = await p.evaluate(() => window.__notes);
ok(notes.join(',').includes('523,659,784,1047'), 'the catch fanfare plays: ' + notes.join(','));
await p.close();

// --- an old save with a plain number for balls still loads
console.log('\nold saves');
p = await page('iPhone 13', '?scene=title&fresh=1&seed=1');
await p.evaluate(() => {
  localStorage.setItem('octomon-3d-save-v1', JSON.stringify({ v:3, current:0, players:[
    { name:'ASHER', skin:'🧒', caught:['grasslet'], levels:{grasslet:1}, missed:[], coins:7, sand:2, car:false, evolved:false, balls:6 }]}));
});
await p.goto(B + '?scene=play&seed=1');
await p.waitForTimeout(2200);
w = await p.evaluate(() => window.__wallet());
ok(w.bag.octeo === 6 && w.balls === 6, 'a save from before the new balls becomes 6 Octeo balls: ' + JSON.stringify(w.bag));
await p.screenshot({ path: 'c-phone.png' });
await p.close();

await b.close();
console.log(fails.length ? '\n' + fails.length + ' FAILED:\n' + fails.join('\n') : '\nall checks passed');
