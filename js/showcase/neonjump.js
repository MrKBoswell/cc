/* ==================== NEON JUMP BY MR BOSWELL ==================== */

const NEON_POWERUPS = {
  star: {
    id: 'star',
    name: 'Super Star',
    short: 'STAR',
    cost: 1500,
    color: '#facc15',
    glow: 'rgba(250, 204, 21, 0.55)',
    desc: 'Invincible rainbow dash!'
  },
  mushroom: {
    id: 'mushroom',
    name: 'Turbo Mushroom',
    short: 'BOOST',
    cost: 1000,
    color: '#fb7185',
    glow: 'rgba(251, 113, 133, 0.55)',
    desc: 'Instant air-hop + speed surge with 2x score multiplier for 4 seconds.'
  },
  bubble: {
    id: 'bubble',
    name: 'Super Bubble',
    short: 'SHIELD',
    cost: 1200,
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.55)',
    desc: 'Absorbs one crash, blasts nearby hazards, and gives a safe bounce.'
  },
  feather: {
    id: 'feather',
    name: 'Cape Feather',
    short: 'GLIDE',
    cost: 1300,
    color: '#4ade80',
    glow: 'rgba(74, 222, 128, 0.55)',
    desc: 'Low-gravity float + unlimited double-jumps in mid-air for 5 seconds.'
  },
  magnet: {
    id: 'magnet',
    name: 'Coin Magnet',
    short: 'MAGNET',
    cost: 900,
    color: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.55)',
    desc: 'Pulls nearby score orbs and gold ? boxes straight into your cube for 6s.'
  },
  shell: {
    id: 'shell',
    name: 'Neon Shell',
    short: 'SHELL',
    cost: 1100,
    color: '#2dd4bf',
    glow: 'rgba(45, 212, 191, 0.55)',
    desc: 'Fires a bouncing neon shell ahead that shatters up to 3 spikes on the track.'
  }
};

const NEON_POWERUP_KEYS = ['star', 'mushroom', 'bubble', 'feather', 'magnet', 'shell'];

const NEON_SKINS = [
  { id: 'cyber', name: 'Cyber Cube', fill: '#22d3ee', stroke: '#ffffff', eye: '#090614' },
  { id: 'solar', name: 'Solar Flare', fill: '#facc15', stroke: '#fffbeb', eye: '#451a03' },
  { id: 'emerald', name: 'Matrix Byte', fill: '#4ade80', stroke: '#ecfdf5', eye: '#052e16' },
  { id: 'hyper', name: 'Hyper Pink', fill: '#f472b6', stroke: '#fdf2f8', eye: '#500724' }
];

const NEON_LEVELS = [
  {
    id: 1,
    name: '1. Neon Awakening',
    twist: 'Classic Dash — Learn jump timing, platforms & jump pads',
    theme: { bgTop: '#070514', bgBot: '#130b2e', grid: 'rgba(56, 189, 248, 0.14)', accent: '#22d3ee', hazard: '#f43f5e' },
    speed: 5.0,
    length: 3400,
    gravityDir: 1,
    shipMode: false,
    movingPlatforms: false,
    crumblingBlocks: false,
    speedZones: false,
    pulseBeat: false,
    darkFog: false,
    sawBlades: false
  },
  {
    id: 2,
    name: '2. Pad & Orb Skyway',
    twist: 'Jump Pads & Mid-Air Dash Orbs — Tap Jump on glowing rings!',
    theme: { bgTop: '#06131f', bgBot: '#0c273d', grid: 'rgba(45, 212, 191, 0.15)', accent: '#2dd4bf', hazard: '#fb7185' },
    speed: 5.3,
    length: 3800,
    gravityDir: 1,
    shipMode: false,
    movingPlatforms: false,
    crumblingBlocks: false,
    speedZones: false,
    pulseBeat: false,
    darkFog: false,
    sawBlades: false
  },
  {
    id: 3,
    name: '3. Gravity Flip Zone',
    twist: 'Gravity Portals — Flip upside-down onto the ceiling track!',
    theme: { bgTop: '#140724', bgBot: '#290d47', grid: 'rgba(192, 132, 252, 0.16)', accent: '#c084fc', hazard: '#f43f5e' },
    speed: 5.4,
    length: 4100,
    gravityDir: 1,
    hasGravityPortals: true,
    shipMode: false,
    movingPlatforms: false,
    crumblingBlocks: false,
    speedZones: false,
    pulseBeat: false,
    darkFog: false,
    sawBlades: false
  },
  {
    id: 4,
    name: '4. Rocket Ship Sector',
    twist: 'Ship Portal — Hold Jump to fly smoothly through laser gates!',
    theme: { bgTop: '#1a0a0d', bgBot: '#331118', grid: 'rgba(251, 146, 60, 0.15)', accent: '#fb923c', hazard: '#ef4444' },
    speed: 5.5,
    length: 4200,
    gravityDir: 1,
    shipMode: true,
    movingPlatforms: false,
    crumblingBlocks: false,
    speedZones: false,
    pulseBeat: false,
    darkFog: false,
    sawBlades: false
  },
  {
    id: 5,
    name: '5. Moving Elevators',
    twist: 'Hover Platforms — Time jumps onto rising & falling neon lifts!',
    theme: { bgTop: '#061a14', bgBot: '#0d3327', grid: 'rgba(74, 222, 128, 0.14)', accent: '#4ade80', hazard: '#f43f5e' },
    speed: 5.5,
    length: 4300,
    gravityDir: 1,
    shipMode: false,
    movingPlatforms: true,
    crumblingBlocks: false,
    speedZones: false,
    pulseBeat: false,
    darkFog: false,
    sawBlades: false
  },
  {
    id: 6,
    name: '6. Fragile Cyber-Ice',
    twist: 'Crumbling Blocks — Platforms shatter 0.4s after you touch them!',
    theme: { bgTop: '#071926', bgBot: '#0f324a', grid: 'rgba(125, 211, 252, 0.18)', accent: '#7dd3fc', hazard: '#fb7185' },
    speed: 5.7,
    length: 4400,
    gravityDir: 1,
    shipMode: false,
    movingPlatforms: false,
    crumblingBlocks: true,
    speedZones: false,
    pulseBeat: false,
    darkFog: false,
    sawBlades: false
  },
  {
    id: 7,
    name: '7. Hyperdrive Warp',
    twist: 'Speed Portals — Switch between Slow-Mo precision & 1.45x Turbo!',
    theme: { bgTop: '#1c1104', bgBot: '#382208', grid: 'rgba(250, 204, 21, 0.16)', accent: '#facc15', hazard: '#ef4444' },
    speed: 5.8,
    length: 4700,
    gravityDir: 1,
    shipMode: false,
    movingPlatforms: false,
    crumblingBlocks: false,
    speedZones: true,
    pulseBeat: false,
    darkFog: false,
    sawBlades: false
  },
  {
    id: 8,
    name: '8. Sawblade Factory',
    twist: 'Spinning Laser Saws — Jump over & duck under rotating buzzsaws!',
    theme: { bgTop: '#190714', bgBot: '#330e29', grid: 'rgba(244, 114, 182, 0.16)', accent: '#f472b6', hazard: '#ff2e63' },
    speed: 6.0,
    length: 4800,
    gravityDir: 1,
    shipMode: false,
    movingPlatforms: true,
    crumblingBlocks: false,
    speedZones: false,
    pulseBeat: false,
    darkFog: false,
    sawBlades: true
  },
  {
    id: 9,
    name: '9. Midnight Spotlight',
    twist: 'Blackout Pulse — Neon sonar rings light up hazards ahead!',
    theme: { bgTop: '#04040a', bgBot: '#090917', grid: 'rgba(99, 102, 241, 0.12)', accent: '#818cf8', hazard: '#f43f5e' },
    speed: 6.1,
    length: 5000,
    gravityDir: 1,
    hasGravityPortals: true,
    shipMode: false,
    movingPlatforms: false,
    crumblingBlocks: false,
    speedZones: false,
    pulseBeat: true,
    darkFog: true,
    sawBlades: true
  },
  {
    id: 10,
    name: '10. Omega Geometry Core',
    twist: 'Final Gauntlet — Gravity flips, Ship flight, Saws & Turbo Portals!',
    theme: { bgTop: '#14051c', bgBot: '#2d0938', grid: 'rgba(232, 121, 249, 0.18)', accent: '#e879f9', hazard: '#ff1e56' },
    speed: 6.4,
    length: 5600,
    gravityDir: 1,
    hasGravityPortals: true,
    shipMode: true,
    movingPlatforms: true,
    crumblingBlocks: true,
    speedZones: true,
    pulseBeat: true,
    darkFog: false,
    sawBlades: true
  }
];

let neon = {
  initialized: false,
  screen: 'menu', // 'menu' | 'campaign_select' | 'shop' | 'settings' | 'playing' | 'paused' | 'level_clear' | 'game_over'
  mode: 'campaign', // 'campaign' | 'endless'
  levelIdx: 0,
  unlockedLevel: 1,
  bankedScore: 0,
  bestEndless: 0,
  runScore: 0,
  distance: 0,
  levelLength: 3400,
  attempts: 1,
  practiceMode: false,
  checkpoints: [],
  slots: [null, null], // [Q slot, E slot]
  shopLoadout: [null, null],
  settings: {
    sfx: true,
    particles: true,
    shake: true,
    autoRetry: false,
    skinIdx: 0
  },
  // Player physics
  player: {
    x: 110,
    y: 274,
    vy: 0,
    size: 28,
    rotation: 0,
    onGround: true,
    gravityDir: 1,
    vehicle: 'cube', // 'cube' | 'ship'
    trail: [],
    squashX: 1,
    squashY: 1,
    coyoteTimer: 0,
    jumpBuffer: 0,
    orbUsedThisPress: false
  },
  // Active power-up timers / states
  activeEffects: {
    star: 0,
    mushroom: 0,
    bubble: false,
    feather: 0,
    magnet: 0
  },
  shells: [],
  // World entities
  groundY: 304,
  ceilY: 44,
  baseSpeed: 5.0,
  speedMult: 1.0,
  obstacles: [],
  platforms: [],
  pads: [],
  orbs: [],
  portals: [],
  mysteryBoxes: [],
  coins: [],
  particles: [],
  floatingTexts: [],
  shakeTimer: 0,
  shakeMag: 0,
  beatPhase: 0,
  endlessNextX: 520,
  endlessTier: 1,
  uiHitboxes: [],
  audioCtx: null,
  jumpWasDown: false
};

/* ---------- Persistence Helpers ---------- */
function loadNeonSaveData() {
  const saved = store.get('neonjump_save_v2', null);
  if (saved) {
    neon.bankedScore = Math.max(0, Number(saved.bankedScore) || 0);
    neon.bestEndless = Math.max(0, Number(saved.bestEndless) || 0);
    neon.unlockedLevel = Math.max(1, Math.min(10, Number(saved.unlockedLevel) || 1));
    if (saved.settings) {
      neon.settings = Object.assign({}, neon.settings, saved.settings);
    }
  }
}

function saveNeonSaveData() {
  store.set('neonjump_save_v2', {
    bankedScore: neon.bankedScore,
    bestEndless: neon.bestEndless,
    unlockedLevel: neon.unlockedLevel,
    settings: neon.settings
  });
}

/* ---------- WebAudio Synth Sound Effects (Zero external files) ---------- */
function playNeonSfx(type) {
  if (!neon.settings.sfx) return;
  try {
    if (!neon.audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) neon.audioCtx = new AC();
    }
    const ctx = neon.audioCtx;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'jump') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.09);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'orb' || type === 'pad') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      osc.start(now); osc.stop(now + 0.13);
    } else if (type === 'pickup') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(780, now + 0.06);
      osc.frequency.setValueAtTime(1040, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'power') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.22);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.23);
      osc.start(now); osc.stop(now + 0.23);
    } else if (type === 'portal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.18);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
      osc.start(now); osc.stop(now + 0.19);
    } else if (type === 'crash') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.28);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'win') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554, now + 0.1);
      osc.frequency.setValueAtTime(659, now + 0.2);
      osc.frequency.setValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now); osc.stop(now + 0.45);
    } else if (type === 'coin') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1180, now + 0.05);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.start(now); osc.stop(now + 0.11);
    }
  } catch (e) { /* AudioContext blocked or unsupported */ }
}

/* ---------- Particles & Floating Text ---------- */
function spawnNeonParticles(x, y, color, count = 12, speed = 4) {
  if (!neon.settings.particles) return;
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = 0.8 + Math.random() * speed;
    neon.particles.push({
      x, y,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      size: 2.5 + Math.random() * 4,
      color,
      life: 22 + Math.floor(Math.random() * 18),
      maxLife: 40
    });
  }
}

function addFloatingText(x, y, text, color = '#facc15') {
  neon.floatingTexts.push({ x, y, text, color, life: 48 });
}

function triggerScreenShake(mag = 7, frames = 14) {
  if (!neon.settings.shake) return;
  neon.shakeMag = mag;
  neon.shakeTimer = frames;
}

/* ---------- Level Builder ---------- */
function seededRand(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildCampaignLevel(levelIdx) {
  const cfg = NEON_LEVELS[levelIdx] || NEON_LEVELS[0];
  const rand = seededRand((levelIdx + 1) * 9187);

  neon.obstacles = [];
  neon.platforms = [];
  neon.pads = [];
  neon.orbs = [];
  neon.portals = [];
  neon.mysteryBoxes = [];
  neon.coins = [];
  neon.levelLength = cfg.length;
  neon.baseSpeed = cfg.speed;

  const gY = neon.groundY;
  const cY = neon.ceilY;

  let x = 440;
  let step = 0;

  // Ship portal at start if Level 4, or midway in Level 10
  if (cfg.shipMode && levelIdx === 3) {
    neon.portals.push({ x: 340, y: cY + 20, w: 28, h: gY - cY - 40, kind: 'ship', used: false });
  }

  while (x < cfg.length - 360) {
    step++;
    const r = rand();

    // Place Mystery Box (?) every ~3 chunks
    if (step % 3 === 1) {
      const boxY = (cfg.shipMode && levelIdx === 3)
        ? 110 + Math.floor(rand() * 120)
        : gY - 78 - Math.floor(rand() * 44);
      neon.mysteryBoxes.push({
        x: x + 45,
        y: boxY,
        w: 26,
        h: 26,
        bobOffset: rand() * Math.PI * 2
      });
    }

    // Score coins
    for (let ci = 0; ci < 3; ci++) {
      neon.coins.push({
        x: x + 20 + ci * 28,
        y: gY - 34 - (ci === 1 ? 26 : 0),
        r: 7,
        collected: false
      });
    }

    // Level 4 pure Ship mode gates
    if (cfg.shipMode && levelIdx === 3) {
      const gapCenter = 125 + Math.floor(rand() * 110);
      const gapH = 104;
      neon.obstacles.push({ kind: 'block', x, y: cY, w: 34, h: Math.max(18, gapCenter - gapH / 2 - cY) });
      neon.obstacles.push({ kind: 'block', x, y: gapCenter + gapH / 2, w: 34, h: Math.max(18, gY - (gapCenter + gapH / 2)) });
      if (cfg.sawBlades || step % 2 === 0) {
        neon.obstacles.push({ kind: 'saw', x: x + 135, y: gapCenter + (rand() < 0.5 ? -36 : 36), r: 16, angle: 0 });
      }
      x += 270;
      continue;
    }

    // Gravity Flip Portals (Levels 3, 9, 10)
    if (cfg.hasGravityPortals && step % 5 === 0) {
      const toInvert = (step / 5) % 2 === 1;
      neon.portals.push({
        x,
        y: cY + 12,
        w: 28,
        h: gY - cY - 24,
        kind: toInvert ? 'grav_up' : 'grav_down',
        used: false
      });
      // Add ceiling spikes if inverted, floor spikes if normal
      if (toInvert) {
        neon.obstacles.push({ kind: 'spike_down', x: x + 150, y: cY, w: 26, h: 30 });
        neon.platforms.push({ x: x + 240, y: cY + 64, w: 96, h: 16, moveAmp: 0, baseY: cY + 64, phase: 0, crumble: false, crumbleTimer: -1, broken: false });
      }
      x += 340;
      continue;
    }

    // Speed Portals (Levels 7, 10)
    if (cfg.speedZones && step % 4 === 0) {
      const fast = (step / 4) % 2 === 1;
      neon.portals.push({
        x,
        y: gY - 88,
        w: 26,
        h: 88,
        kind: fast ? 'speed_fast' : 'speed_slow',
        used: false
      });
      x += 160;
    }

    // Mid-level Ship section in Level 10
    if (levelIdx === 9 && step === 7) {
      neon.portals.push({ x, y: cY + 16, w: 28, h: gY - cY - 32, kind: 'ship', used: false });
      x += 240;
      continue;
    }
    if (levelIdx === 9 && step === 12) {
      neon.portals.push({ x, y: cY + 16, w: 28, h: gY - cY - 32, kind: 'cube', used: false });
      x += 220;
      continue;
    }

    // Pattern selection
    if (r < 0.24) {
      // Single or Double Spike
      neon.obstacles.push({ kind: 'spike', x, y: gY - 30, w: 26, h: 30 });
      if (levelIdx >= 1 && rand() < 0.55) {
        neon.obstacles.push({ kind: 'spike', x: x + 26, y: gY - 30, w: 26, h: 30 });
      }
      x += 225;
    } else if (r < 0.48) {
      // Elevated Platform + Spike underneath
      const pw = 105;
      const py = gY - 56;
      neon.platforms.push({
        x, y: py, w: pw, h: 16,
        moveAmp: cfg.movingPlatforms ? 26 : 0,
        baseY: py,
        phase: rand() * Math.PI * 2,
        crumble: cfg.crumblingBlocks,
        crumbleTimer: -1,
        broken: false
      });
      neon.obstacles.push({ kind: 'spike', x: x + 38, y: gY - 28, w: 26, h: 28 });
      if (levelIdx >= 2) {
        neon.platforms.push({
          x: x + 145, y: gY - 102, w: 95, h: 16,
          moveAmp: cfg.movingPlatforms ? 22 : 0,
          baseY: gY - 102,
          phase: rand() * Math.PI * 2,
          crumble: cfg.crumblingBlocks,
          crumbleTimer: -1,
          broken: false
        });
        x += 310;
      } else {
        x += 220;
      }
    } else if (r < 0.70) {
      // Jump Pad or Dash Orb challenge
      if (rand() < 0.5) {
        neon.pads.push({ x, y: gY - 10, w: 30, h: 10, triggered: 0 });
        neon.obstacles.push({ kind: 'spike', x: x + 65, y: gY - 30, w: 26, h: 30 });
        neon.obstacles.push({ kind: 'spike', x: x + 91, y: gY - 30, w: 26, h: 30 });
        neon.platforms.push({
          x: x + 155, y: gY - 96, w: 110, h: 16,
          moveAmp: 0, baseY: gY - 96, phase: 0,
          crumble: cfg.crumblingBlocks, crumbleTimer: -1, broken: false
        });
        x += 315;
      } else {
        neon.obstacles.push({ kind: 'spike', x: x + 30, y: gY - 30, w: 26, h: 30 });
        neon.obstacles.push({ kind: 'spike', x: x + 56, y: gY - 30, w: 26, h: 30 });
        neon.orbs.push({ x: x + 56, y: gY - 86, r: 14, pulse: 0 });
        x += 250;
      }
    } else {
      // Sawblade or Block Staircase
      if (cfg.sawBlades) {
        const highSaw = rand() < 0.45;
        neon.obstacles.push({
          kind: 'saw',
          x: x + 20,
          y: highSaw ? gY - 64 : gY - 20,
          r: 19,
          angle: 0
        });
        x += 235;
      } else {
        neon.obstacles.push({ kind: 'block', x, y: gY - 34, w: 34, h: 34 });
        neon.obstacles.push({ kind: 'block', x: x + 88, y: gY - 68, w: 34, h: 68 });
        neon.obstacles.push({ kind: 'spike', x: x + 46, y: gY - 26, w: 26, h: 26 });
        x += 245;
      }
    }
  }
}

function spawnEndlessChunk() {
  const gY = neon.groundY;
  const x = neon.endlessNextX;
  const r = Math.random();
  neon.endlessTier = 1 + Math.floor(neon.distance / 1800);
  neon.baseSpeed = Math.min(7.6, 5.1 + neon.endlessTier * 0.25);

  // Spawn gold ? mystery box periodically
  if (Math.random() < 0.48) {
    neon.mysteryBoxes.push({
      x: x + 50,
      y: gY - 82 - Math.floor(Math.random() * 48),
      w: 26,
      h: 26,
      bobOffset: Math.random() * Math.PI * 2
    });
  }

  // Coins
  for (let i = 0; i < 2; i++) {
    neon.coins.push({ x: x + 24 + i * 30, y: gY - 36 - i * 18, r: 7, collected: false });
  }

  if (r < 0.3) {
    neon.obstacles.push({ kind: 'spike', x, y: gY - 30, w: 26, h: 30 });
    if (neon.endlessTier >= 2 && Math.random() < 0.6) {
      neon.obstacles.push({ kind: 'spike', x: x + 26, y: gY - 30, w: 26, h: 30 });
    }
    neon.endlessNextX += 225;
  } else if (r < 0.6) {
    neon.platforms.push({
      x, y: gY - 58, w: 105, h: 16,
      moveAmp: neon.endlessTier >= 3 ? 22 : 0,
      baseY: gY - 58,
      phase: Math.random() * 6,
      crumble: neon.endlessTier >= 4,
      crumbleTimer: -1,
      broken: false
    });
    neon.obstacles.push({ kind: 'spike', x: x + 40, y: gY - 28, w: 26, h: 28 });
    neon.endlessNextX += 245;
  } else if (r < 0.82) {
    neon.pads.push({ x, y: gY - 10, w: 30, h: 10, triggered: 0 });
    neon.obstacles.push({ kind: 'spike', x: x + 70, y: gY - 30, w: 26, h: 30 });
    neon.endlessNextX += 240;
  } else {
    neon.obstacles.push({ kind: 'saw', x: x + 20, y: gY - 20, r: 18, angle: 0 });
    neon.endlessNextX += 235;
  }
}

/* ---------- Game Lifecycle & Controls ---------- */
function initNeonJump() {
  loadNeonSaveData();
  neon.initialized = true;
  neon.screen = 'menu';
  neon.mode = 'campaign';
  neon.levelIdx = 0;
  neon.slots = [null, null];
  neon.shopLoadout = [null, null];
  resetNeonPlayerState();
  buildCampaignLevel(0);
}

function resetNeonPlayerState() {
  neon.player = {
    x: 110,
    y: neon.groundY - 28,
    vy: 0,
    size: 28,
    rotation: 0,
    onGround: true,
    gravityDir: 1,
    vehicle: 'cube',
    trail: [],
    squashX: 1,
    squashY: 1,
    coyoteTimer: 0,
    jumpBuffer: 0,
    orbUsedThisPress: false
  };
  neon.activeEffects = {
    star: 0,
    mushroom: 0,
    bubble: false,
    feather: 0,
    magnet: 0
  };
  neon.shells = [];
  neon.particles = [];
  neon.floatingTexts = [];
  neon.speedMult = 1.0;
  neon.distance = 0;
  neon.runScore = 0;
}

function startNeonRun(mode = neon.mode, levelIdx = neon.levelIdx) {
  neon.mode = mode;
  neon.levelIdx = Math.max(0, Math.min(NEON_LEVELS.length - 1, levelIdx));
  neon.attempts = 1;
  resetNeonPlayerState();

  // Apply pre-purchased Shop Loadout into Slot Q (index 0) and Slot E (index 1)
  neon.slots = [neon.shopLoadout[0] || null, neon.shopLoadout[1] || null];
  neon.shopLoadout = [null, null];

  if (mode === 'campaign') {
    buildCampaignLevel(neon.levelIdx);
  } else {
    neon.obstacles = [];
    neon.platforms = [];
    neon.pads = [];
    neon.orbs = [];
    neon.portals = [];
    neon.mysteryBoxes = [];
    neon.coins = [];
    neon.endlessNextX = 480;
    neon.endlessTier = 1;
    neon.baseSpeed = 5.1;
    for (let i = 0; i < 6; i++) spawnEndlessChunk();
  }

  neon.screen = 'playing';
  updateShowcaseUI();
}

function restartNeonRun() {
  if (neon.screen === 'menu' || neon.screen === 'campaign_select' || neon.screen === 'shop' || neon.screen === 'settings') {
    startNeonRun(neon.mode, neon.levelIdx);
    return;
  }
  neon.attempts += 1;
  const keptQ = neon.slots[0];
  const keptE = neon.slots[1];
  resetNeonPlayerState();
  neon.slots = [keptQ, keptE];

  if (neon.mode === 'campaign') {
    buildCampaignLevel(neon.levelIdx);
  } else {
    neon.obstacles = [];
    neon.platforms = [];
    neon.pads = [];
    neon.orbs = [];
    neon.portals = [];
    neon.mysteryBoxes = [];
    neon.coins = [];
    neon.endlessNextX = 480;
    neon.endlessTier = 1;
    neon.baseSpeed = 5.1;
    for (let i = 0; i < 6; i++) spawnEndlessChunk();
  }
  neon.screen = 'playing';
  updateShowcaseUI();
}

function openNeonMenu() {
  neon.screen = 'menu';
  updateShowcaseUI();
}

/* ---------- Inventory & Q / E Power-Ups ---------- */
function collectMysteryPowerup() {
  // Fill Q (slot 0) first if empty, otherwise fill E (slot 1) if empty
  let targetSlot = -1;
  if (neon.slots[0] === null) targetSlot = 0;
  else if (neon.slots[1] === null) targetSlot = 1;
  if (targetSlot === -1) return false;

  const chosenKey = NEON_POWERUP_KEYS[Math.floor(Math.random() * NEON_POWERUP_KEYS.length)];
  neon.slots[targetSlot] = chosenKey;
  const pInfo = NEON_POWERUPS[chosenKey];
  playNeonSfx('pickup');
  spawnNeonParticles(neon.player.x + 14, neon.player.y + 14, pInfo.color, 16, 4.5);
  addFloatingText(neon.player.x, neon.player.y - 12, `[${targetSlot === 0 ? 'Q' : 'E'}] ${pInfo.name}!`, pInfo.color);
  neon.runScore += 25;
  updateNeonCodeSnippet();
  return true;
}

function useNeonSlot(slotIndex) {
  if (neon.screen !== 'playing') return;
  const itemKey = neon.slots[slotIndex];
  if (!itemKey) return;

  neon.slots[slotIndex] = null;
  const p = neon.player;
  const pInfo = NEON_POWERUPS[itemKey];
  playNeonSfx('power');
  spawnNeonParticles(p.x + p.size / 2, p.y + p.size / 2, pInfo.color, 20, 5.2);
  addFloatingText(p.x, p.y - 16, `${pInfo.name.toUpperCase()}!`, pInfo.color);

  if (itemKey === 'star') {
    neon.activeEffects.star = 300; // 5 seconds at 60fps
  } else if (itemKey === 'mushroom') {
    neon.activeEffects.mushroom = 240; // 4 seconds
    p.vy = -10.5 * p.gravityDir;
    p.onGround = false;
  } else if (itemKey === 'bubble') {
    neon.activeEffects.bubble = true;
  } else if (itemKey === 'feather') {
    neon.activeEffects.feather = 300; // 5 seconds
    p.vy = -11.0 * p.gravityDir;
    p.onGround = false;
  } else if (itemKey === 'magnet') {
    neon.activeEffects.magnet = 360; // 6 seconds
  } else if (itemKey === 'shell') {
    neon.shells.push({
      x: p.x + p.size + 4,
      y: p.y + p.size - 16,
      vx: 11.5,
      hitsLeft: 3
    });
  }
  updateNeonCodeSnippet();
}

function handleNeonKeyDown(code) {
  if (code === 'KeyQ') {
    if (neon.screen === 'playing') useNeonSlot(0);
  } else if (code === 'KeyE') {
    if (neon.screen === 'playing') useNeonSlot(1);
  } else if (code === 'KeyR') {
    restartNeonRun();
  } else if (code === 'KeyP' || code === 'Escape') {
    if (neon.screen === 'playing') neon.screen = 'paused';
    else if (neon.screen === 'paused') neon.screen = 'playing';
  } else if (code === 'Enter') {
    if (neon.screen === 'menu') startNeonRun('campaign', neon.unlockedLevel - 1);
    else if (neon.screen === 'game_over') restartNeonRun();
    else if (neon.screen === 'level_clear') {
      if (neon.levelIdx < 9) startNeonRun('campaign', neon.levelIdx + 1);
      else neon.screen = 'menu';
    }
  } else if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW') {
    if (neon.screen === 'playing') {
      neon.player.jumpBuffer = 8;
    } else if (neon.screen === 'game_over') {
      restartNeonRun();
    }
  }
}

/* ---------- Canvas Click / Tap UI Router ---------- */
function bindNeonCanvasPointer(canvas) {
  if (!canvas || canvas.dataset.neonBound === '1') return;
  canvas.dataset.neonBound = '1';

  canvas.addEventListener('pointerdown', (e) => {
    if (activeView !== 'yourgames') return;
    const rect = canvas.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (canvas.width / rect.width);
    const py = (e.clientY - rect.top) * (canvas.height / rect.height);

    // Check interactive canvas buttons first
    for (let i = neon.uiHitboxes.length - 1; i >= 0; i--) {
      const hb = neon.uiHitboxes[i];
      if (px >= hb.x && px <= hb.x + hb.w && py >= hb.y && py <= hb.y + hb.h) {
        hb.onClick();
        return;
      }
    }

    // If playing, tapping canvas triggers jump!
    if (neon.screen === 'playing') {
      showcaseKeys['PointerJump'] = true;
      neon.player.jumpBuffer = 8;
    }
  });

  canvas.addEventListener('pointerup', () => {
    showcaseKeys['PointerJump'] = false;
  });
  canvas.addEventListener('pointercancel', () => {
    showcaseKeys['PointerJump'] = false;
  });
}

/* ---------- Physics & Gameplay Step ---------- */
function stepNeonGameplay() {
  const p = neon.player;
  const lvlCfg = NEON_LEVELS[neon.levelIdx] || NEON_LEVELS[0];

  // Decrement active effect timers
  if (neon.activeEffects.star > 0) neon.activeEffects.star--;
  if (neon.activeEffects.mushroom > 0) neon.activeEffects.mushroom--;
  if (neon.activeEffects.feather > 0) neon.activeEffects.feather--;
  if (neon.activeEffects.magnet > 0) neon.activeEffects.magnet--;
  if (neon.shakeTimer > 0) neon.shakeTimer--;
  neon.beatPhase += 0.08;

  // Recover squash/stretch smoothly
  p.squashX += (1 - p.squashX) * 0.22;
  p.squashY += (1 - p.squashY) * 0.22;

  // Speed calculation
  let speedFactor = neon.speedMult;
  if (neon.activeEffects.star > 0) speedFactor *= 1.32;
  if (neon.activeEffects.mushroom > 0) speedFactor *= 1.42;
  const scrollSpeed = neon.baseSpeed * speedFactor;

  neon.distance += scrollSpeed;
  const scoreMult = (neon.activeEffects.mushroom > 0 ? 2 : 1) * (neon.activeEffects.star > 0 ? 1.5 : 1);
  neon.runScore += (scrollSpeed * 0.065) * scoreMult;

  // Check Campaign Level Clear
  if (neon.mode === 'campaign' && neon.distance >= neon.levelLength) {
    const clearBonus = 150 + (neon.levelIdx + 1) * 35;
    const totalEarned = Math.floor(neon.runScore) + clearBonus;
    neon.bankedScore += totalEarned;
    if (neon.levelIdx + 1 >= neon.unlockedLevel && neon.unlockedLevel < 10) {
      neon.unlockedLevel = neon.levelIdx + 2;
    }
    saveNeonSaveData();
    playNeonSfx('win');
    spawnNeonParticles(p.x + 14, p.y + 14, '#facc15', 36, 6);
    neon.screen = 'level_clear';
    updateNeonCodeSnippet();
    return;
  }

  // Endless chunk spawning
  if (neon.mode === 'endless') {
    neon.endlessNextX -= scrollSpeed;
    while (neon.endlessNextX < 760) {
      spawnEndlessChunk();
    }
  }

  // Input state
  const jumpHeld = !!(showcaseKeys['Space'] || showcaseKeys['ArrowUp'] || showcaseKeys['KeyW'] || showcaseKeys['PointerJump']);
  const justPressed = jumpHeld && !neon.jumpWasDown;
  neon.jumpWasDown = jumpHeld;

  if (p.coyoteTimer > 0) p.coyoteTimer--;
  if (p.jumpBuffer > 0) p.jumpBuffer--;

  // Check Dash Orbs first when jump is freshly pressed
  if (justPressed) {
    for (const orb of neon.orbs) {
      const dist = Math.hypot((p.x + p.size / 2) - orb.x, (p.y + p.size / 2) - orb.y);
      if (dist < orb.r + 24) {
        p.vy = -12.6 * p.gravityDir;
        p.onGround = false;
        p.jumpBuffer = 0;
        orb.pulse = 16;
        p.squashX = 0.78;
        p.squashY = 1.28;
        playNeonSfx('orb');
        spawnNeonParticles(orb.x, orb.y, '#facc15', 14, 4);
        neon.runScore += 15;
        break;
      }
    }
  }

  // Vehicle movement: Ship vs Cube
  if (p.vehicle === 'ship') {
    const thrust = jumpHeld ? -0.58 * p.gravityDir : 0.44 * p.gravityDir;
    p.vy = Math.max(-7.5, Math.min(7.5, p.vy + thrust));
    p.y += p.vy;
    p.rotation = p.vy * 0.065;
    if (p.y + p.size >= neon.groundY) {
      p.y = neon.groundY - p.size;
      p.vy = 0;
    }
    if (p.y <= neon.ceilY) {
      p.y = neon.ceilY;
      p.vy = 0;
    }
  } else {
    // Cube Jump (supports Geometry Dash hold-to-bunny-hop + Cape Feather mid-air jumps!)
    const canGroundJump = p.onGround || p.coyoteTimer > 0;
    const canFeatherJump = neon.activeEffects.feather > 0 && justPressed;

    if ((jumpHeld && canGroundJump) || (p.jumpBuffer > 0 && canGroundJump) || canFeatherJump) {
      p.vy = -12.4 * p.gravityDir;
      p.onGround = false;
      p.coyoteTimer = 0;
      p.jumpBuffer = 0;
      p.squashX = 0.76;
      p.squashY = 1.28;
      playNeonSfx('jump');
      spawnNeonParticles(p.x + p.size / 2, p.gravityDir === 1 ? p.y + p.size : p.y, lvlCfg.theme.accent, 7, 2.6);
    }

    const grav = (neon.activeEffects.feather > 0 ? 0.44 : 0.68) * p.gravityDir;
    p.vy += grav;
    p.vy = Math.max(-16, Math.min(16, p.vy));
    p.y += p.vy;

    if (!p.onGround) {
      p.rotation += 0.14 * p.gravityDir;
    } else {
      // Snap cube angle cleanly to nearest 90 degrees
      const snap = Math.round(p.rotation / (Math.PI / 2)) * (Math.PI / 2);
      p.rotation += (snap - p.rotation) * 0.35;
    }
  }

  // Record neon motion trail
  p.trail.unshift({ x: p.x + p.size / 2, y: p.y + p.size / 2, rot: p.rotation });
  if (p.trail.length > 14) p.trail.pop();

  // Floor & Ceiling Landing
  const wasOnGround = p.onGround;
  p.onGround = false;

  if (p.gravityDir === 1) {
    if (p.y + p.size >= neon.groundY) {
      p.y = neon.groundY - p.size;
      if (!wasOnGround && p.vy > 3) { p.squashX = 1.26; p.squashY = 0.76; }
      p.vy = 0;
      p.onGround = true;
    }
    if (p.y < neon.ceilY) {
      p.y = neon.ceilY;
      if (p.vy < 0) p.vy = 0;
    }
  } else {
    if (p.y <= neon.ceilY) {
      p.y = neon.ceilY;
      if (!wasOnGround && p.vy < -3) { p.squashX = 1.26; p.squashY = 0.76; }
      p.vy = 0;
      p.onGround = true;
    }
    if (p.y + p.size > neon.groundY) {
      p.y = neon.groundY - p.size;
      if (p.vy > 0) p.vy = 0;
    }
  }

  // Update Platforms & check safe top/bottom landing
  for (let i = neon.platforms.length - 1; i >= 0; i--) {
    const pl = neon.platforms[i];
    pl.x -= scrollSpeed;
    if (pl.moveAmp > 0) {
      pl.phase += 0.045;
      pl.y = pl.baseY + Math.sin(pl.phase) * pl.moveAmp;
    }
    if (pl.crumble && pl.crumbleTimer > 0) {
      pl.crumbleTimer--;
      if (pl.crumbleTimer === 0) {
        pl.broken = true;
        spawnNeonParticles(pl.x + pl.w / 2, pl.y + 8, '#7dd3fc', 12, 3.5);
      }
    }

    if (!pl.broken) {
      const horiz = p.x + p.size - 4 > pl.x && p.x + 4 < pl.x + pl.w;
      if (horiz && p.gravityDir === 1 && p.vy >= 0 && p.y + p.size >= pl.y && p.y + p.size <= pl.y + 18) {
        p.y = pl.y - p.size;
        if (!wasOnGround && p.vy > 3) { p.squashX = 1.24; p.squashY = 0.78; }
        p.vy = 0;
        p.onGround = true;
        if (pl.crumble && pl.crumbleTimer < 0) pl.crumbleTimer = 24;
      } else if (horiz && p.gravityDir === -1 && p.vy <= 0 && p.y <= pl.y + pl.h && p.y >= pl.y - 6) {
        p.y = pl.y + pl.h;
        p.vy = 0;
        p.onGround = true;
        if (pl.crumble && pl.crumbleTimer < 0) pl.crumbleTimer = 24;
      }
    }

    if (pl.x + pl.w < -60) neon.platforms.splice(i, 1);
  }

  if (wasOnGround && !p.onGround) {
    p.coyoteTimer = 5;
  }

  // Jump Pads
  for (let i = neon.pads.length - 1; i >= 0; i--) {
    const pad = neon.pads[i];
    pad.x -= scrollSpeed;
    if (pad.triggered > 0) pad.triggered--;
    const hitPad = p.x + p.size > pad.x && p.x < pad.x + pad.w && p.y + p.size >= pad.y - 4 && p.y <= pad.y + pad.h;
    if (hitPad && pad.triggered === 0) {
      pad.triggered = 15;
      p.vy = -16.2 * p.gravityDir;
      p.onGround = false;
      p.squashX = 0.72;
      p.squashY = 1.32;
      playNeonSfx('pad');
      spawnNeonParticles(pad.x + 15, pad.y, '#facc15', 14, 4);
    }
    if (pad.x + pad.w < -40) neon.pads.splice(i, 1);
  }

  // Dash Orbs
  for (let i = neon.orbs.length - 1; i >= 0; i--) {
    const orb = neon.orbs[i];
    orb.x -= scrollSpeed;
    if (orb.pulse > 0) orb.pulse--;
    if (orb.x < -40) neon.orbs.splice(i, 1);
  }

  // Portals (Gravity, Ship, Cube, Speed)
  for (let i = neon.portals.length - 1; i >= 0; i--) {
    const pt = neon.portals[i];
    pt.x -= scrollSpeed;
    const hitPt = p.x + p.size > pt.x && p.x < pt.x + pt.w && p.y + p.size > pt.y && p.y < pt.y + pt.h;
    if (hitPt && !pt.used) {
      pt.used = true;
      playNeonSfx('portal');
      spawnNeonParticles(pt.x + 14, p.y + 14, '#c084fc', 18, 4.5);
      if (pt.kind === 'grav_up') {
        p.gravityDir = -1;
        p.onGround = false;
        addFloatingText(p.x, p.y, 'GRAVITY FLIP!', '#c084fc');
      } else if (pt.kind === 'grav_down') {
        p.gravityDir = 1;
        p.onGround = false;
        addFloatingText(p.x, p.y, 'NORMAL GRAVITY', '#38bdf8');
      } else if (pt.kind === 'ship') {
        p.vehicle = 'ship';
        p.gravityDir = 1;
        addFloatingText(p.x, p.y, 'SHIP MODE!', '#fb923c');
      } else if (pt.kind === 'cube') {
        p.vehicle = 'cube';
        addFloatingText(p.x, p.y, 'CUBE MODE!', '#22d3ee');
      } else if (pt.kind === 'speed_fast') {
        neon.speedMult = 1.38;
        addFloatingText(p.x, p.y, 'TURBO 1.4x!', '#facc15');
      } else if (pt.kind === 'speed_slow') {
        neon.speedMult = 0.88;
        addFloatingText(p.x, p.y, 'PRECISION PACE', '#4ade80');
      }
    }
    if (pt.x + pt.w < -50) neon.portals.splice(i, 1);
  }

  // Coins
  for (let i = neon.coins.length - 1; i >= 0; i--) {
    const c = neon.coins[i];
    c.x -= scrollSpeed;
    if (neon.activeEffects.magnet > 0) {
      const dx = (p.x + p.size / 2) - c.x;
      const dy = (p.y + p.size / 2) - c.y;
      const d = Math.hypot(dx, dy);
      if (d < 165 && d > 1) {
        c.x += (dx / d) * 6.5;
        c.y += (dy / d) * 6.5;
      }
    }
    if (!c.collected && Math.hypot((p.x + p.size / 2) - c.x, (p.y + p.size / 2) - c.y) < 22) {
      c.collected = true;
      neon.runScore += 10;
      playNeonSfx('coin');
      spawnNeonParticles(c.x, c.y, '#facc15', 8, 2.8);
    }
    if (c.collected || c.x < -30) neon.coins.splice(i, 1);
  }

  // Gold ? Mystery Boxes — ONLY picked up if inventory has < 2 items (Q or E empty)!
  const hasFreeSlot = (neon.slots[0] === null || neon.slots[1] === null);
  for (let i = neon.mysteryBoxes.length - 1; i >= 0; i--) {
    const box = neon.mysteryBoxes[i];
    box.x -= scrollSpeed;
    box.bobOffset += 0.08;

    // Magnet pulls mystery boxes ONLY if player has a free inventory slot
    if (hasFreeSlot && neon.activeEffects.magnet > 0) {
      const dx = (p.x + p.size / 2) - (box.x + box.w / 2);
      const dy = (p.y + p.size / 2) - (box.y + box.h / 2);
      const d = Math.hypot(dx, dy);
      if (d < 170 && d > 1) {
        box.x += (dx / d) * 5.5;
        box.y += (dy / d) * 5.5;
      }
    }

    if (hasFreeSlot) {
      const overlapsBox =
        p.x + p.size > box.x &&
        p.x < box.x + box.w &&
        p.y + p.size > box.y &&
        p.y < box.y + box.h;
      if (overlapsBox) {
        if (collectMysteryPowerup()) {
          neon.mysteryBoxes.splice(i, 1);
          continue;
        }
      }
    }
    // If both Q and E slots are full, do NOT collide and leave box untouched on the track!
    if (box.x + box.w < -40) neon.mysteryBoxes.splice(i, 1);
  }

  // Update Neon Shells (from Shell power-up)
  for (let si = neon.shells.length - 1; si >= 0; si--) {
    const sh = neon.shells[si];
    sh.x += sh.vx;
    for (let oi = neon.obstacles.length - 1; oi >= 0; oi--) {
      const ob = neon.obstacles[oi];
      const obW = ob.kind === 'saw' ? ob.r * 2 : ob.w;
      const obX = ob.kind === 'saw' ? ob.x - ob.r : ob.x;
      if (sh.x + 14 > obX && sh.x - 14 < obX + obW && ob.kind !== 'block') {
        spawnNeonParticles(obX + obW / 2, neon.groundY - 16, '#2dd4bf', 14, 4);
        neon.obstacles.splice(oi, 1);
        neon.runScore += 20;
        sh.hitsLeft--;
        if (sh.hitsLeft <= 0) break;
      }
    }
    if (sh.hitsLeft <= 0 || sh.x > 580) neon.shells.splice(si, 1);
  }

  // Obstacles & Fair Hitbox Collision
  for (let i = neon.obstacles.length - 1; i >= 0; i--) {
    const ob = neon.obstacles[i];
    ob.x -= scrollSpeed;
    if (ob.kind === 'saw') ob.angle += 0.16;

    // Forgiving inner player hitbox (Geometry Dash style)
    const px1 = p.x + 5;
    const py1 = p.y + 5;
    const px2 = p.x + p.size - 5;
    const py2 = p.y + p.size - 5;

    let hit = false;
    if (ob.kind === 'saw') {
      const dist = Math.hypot((p.x + p.size / 2) - ob.x, (p.y + p.size / 2) - ob.y);
      hit = dist < (ob.r + p.size * 0.36);
    } else if (ob.kind === 'block') {
      // Safe landing on top of solid blocks!
      const horiz = p.x + p.size - 4 > ob.x && p.x + 4 < ob.x + ob.w;
      if (horiz && p.gravityDir === 1 && p.vy >= 0 && p.y + p.size >= ob.y && p.y + p.size <= ob.y + 16) {
        p.y = ob.y - p.size;
        p.vy = 0;
        p.onGround = true;
      } else {
        hit = px2 > ob.x + 2 && px1 < ob.x + ob.w - 2 && py2 > ob.y + 4 && py1 < ob.y + ob.h - 2;
      }
    } else {
      // Spike / Ceiling Spike
      hit = px2 > ob.x + 5 && px1 < ob.x + ob.w - 5 && py2 > ob.y + 5 && py1 < ob.y + ob.h - 3;
    }

    if (hit) {
      if (neon.activeEffects.star > 0) {
        // Super Star smashes straight through!
        spawnNeonParticles(ob.x + 12, ob.y + 12, '#facc15', 16, 5);
        addFloatingText(ob.x, ob.y - 10, '+30 SMASH!', '#facc15');
        neon.runScore += 30;
        neon.obstacles.splice(i, 1);
        continue;
      } else if (neon.activeEffects.bubble) {
        // Bubble Shield absorbs crash!
        neon.activeEffects.bubble = false;
        p.vy = -10.5 * p.gravityDir;
        p.onGround = false;
        triggerScreenShake(6, 10);
        playNeonSfx('portal');
        spawnNeonParticles(p.x + 14, p.y + 14, '#38bdf8', 22, 5);
        addFloatingText(p.x, p.y - 14, 'SHIELD SAVED!', '#38bdf8');
        neon.obstacles.splice(i, 1);
        continue;
      } else {
        // Crash! Bank earned run score into localStorage
        const earned = Math.floor(neon.runScore);
        neon.bankedScore += earned;
        if (neon.mode === 'endless' && earned > neon.bestEndless) {
          neon.bestEndless = earned;
        }
        saveNeonSaveData();
        playNeonSfx('crash');
        triggerScreenShake(10, 18);
        spawnNeonParticles(p.x + 14, p.y + 14, lvlCfg.theme.hazard, 34, 6.5);
        updateNeonCodeSnippet();
        if (neon.settings.autoRetry) {
          restartNeonRun();
        } else {
          neon.screen = 'game_over';
        }
        return;
      }
    }

    const rightEdge = ob.kind === 'saw' ? ob.x + ob.r : ob.x + ob.w;
    if (rightEdge < -50) neon.obstacles.splice(i, 1);
  }
}

/* ---------- Rendering Helpers ---------- */
function drawCanvasButton(ctx, x, y, w, h, label, bg, fg, border, onClick, subLabel = '') {
  neon.uiHitboxes.push({ x, y, w, h, onClick });
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 8);
  ctx.fill();
  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  }
  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (subLabel) {
    ctx.font = 'bold 12px monospace';
    ctx.fillText(label, x + w / 2, y + h / 2 - 7);
    ctx.font = '10px monospace';
    ctx.fillStyle = '#000000';
    ctx.fillText(subLabel, x + w / 2, y + h / 2 + 8);
  } else {
    ctx.font = 'bold 12px monospace';
    ctx.fillText(label, x + w / 2, y + h / 2 + 1);
  }
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

function drawNeonBackground(ctx, lvlCfg) {
  const grad = ctx.createLinearGradient(0, 0, 0, 380);
  grad.addColorStop(0, lvlCfg.theme.bgTop);
  grad.addColorStop(1, lvlCfg.theme.bgBot);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 540, 380);

  // Parallax scrolling synth grid
  const scrollOff = (neon.distance * 0.35) % 45;
  ctx.strokeStyle = lvlCfg.theme.grid;
  ctx.lineWidth = 1;
  for (let gx = -scrollOff; gx <= 540; gx += 45) {
    ctx.beginPath(); ctx.moveTo(gx, neon.ceilY); ctx.lineTo(gx, neon.groundY); ctx.stroke();
  }
  for (let gy = neon.ceilY; gy <= neon.groundY; gy += 45) {
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(540, gy); ctx.stroke();
  }

  // Ceiling bar
  ctx.fillStyle = '#090714';
  ctx.fillRect(0, 0, 540, neon.ceilY);
  ctx.strokeStyle = lvlCfg.theme.accent;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, neon.ceilY); ctx.lineTo(540, neon.ceilY); ctx.stroke();

  // Floor deck
  ctx.fillStyle = '#090714';
  ctx.fillRect(0, neon.groundY, 540, 380 - neon.groundY);
  ctx.strokeStyle = neon.activeEffects.star > 0 ? '#facc15' : lvlCfg.theme.accent;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, neon.groundY); ctx.lineTo(540, neon.groundY); ctx.stroke();
}

function drawNeonInventoryHud(ctx) {
  // Top HUD bar (inside ceiling strip y=0..44)
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 12px monospace';
  ctx.fillText(`BANK: ${neon.bankedScore}`, 12, 17);
  ctx.fillStyle = '#22d3ee';
  ctx.fillText(`RUN: ${Math.floor(neon.runScore)}`, 12, 34);

  // Progress bar in Campaign or Tier in Endless
  if (neon.mode === 'campaign') {
    const pct = Math.max(0, Math.min(1, neon.distance / neon.levelLength));
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(128, 10, 140, 10);
    ctx.fillStyle = '#22d3ee';
    ctx.fillRect(128, 10, 140 * pct, 10);
    ctx.strokeStyle = '#475569';
    ctx.strokeRect(128, 10, 140, 10);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px monospace';
    ctx.fillText(`LVL ${neon.levelIdx + 1}/10 • ${Math.floor(pct * 100)}%`, 128, 34);
  } else {
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`ENDLESS • TIER ${neon.endlessTier}`, 128, 17);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText(`BEST: ${neon.bestEndless}`, 128, 34);
  }

  // Q & E Inventory Slots (Top Right)
  const slotLabels = ['[Q]', '[E]'];
  for (let i = 0; i < 2; i++) {
    const sx = 286 + i * 86;
    const sy = 6;
    const itemKey = neon.slots[i];
    const item = itemKey ? NEON_POWERUPS[itemKey] : null;
    ctx.fillStyle = item ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.6)';
    ctx.fillRect(sx, sy, 80, 32);
    ctx.strokeStyle = item ? item.color : '#475569';
    ctx.lineWidth = item ? 2 : 1.2;
    ctx.strokeRect(sx, sy, 80, 32);

    ctx.fillStyle = item ? item.color : '#64748b';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`${slotLabels[i]} ${item ? item.short : 'EMPTY'}`, sx + 6, sy + 20);
  }

  // Pause Button (top far right)
  drawCanvasButton(ctx, 464, 6, 66, 32, 'MENU', '#1e293b', '#f8fafc', '#475569', () => {
    neon.screen = 'paused';
  });
}

function drawNeonWorld(ctx, lvlCfg) {
  // Portals
  neon.portals.forEach(pt => {
    const pColor = pt.kind.includes('grav') ? '#c084fc' : (pt.kind === 'ship' ? '#fb923c' : '#facc15');
    ctx.strokeStyle = pColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(pt.x, pt.y, pt.w, pt.h);
    ctx.fillStyle = pColor + '28';
    ctx.fillRect(pt.x, pt.y, pt.w, pt.h);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    const tag = pt.kind === 'grav_up' ? 'FLIP' : pt.kind === 'grav_down' ? 'NORM' : pt.kind === 'ship' ? 'SHIP' : pt.kind === 'cube' ? 'CUBE' : pt.kind === 'speed_fast' ? 'FAST' : 'SLOW';
    ctx.fillText(tag, pt.x + 2, pt.y + pt.h / 2);
  });

  // Platforms
  neon.platforms.forEach(pl => {
    if (pl.broken) return;
    ctx.fillStyle = pl.crumble ? (pl.crumbleTimer > 0 ? '#f87171' : '#38bdf8') : '#1e293b';
    ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
    ctx.strokeStyle = pl.crumble ? '#bae6fd' : lvlCfg.theme.accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(pl.x, pl.y, pl.w, pl.h);
  });

  // Jump Pads
  neon.pads.forEach(pad => {
    ctx.fillStyle = pad.triggered > 0 ? '#ffffff' : '#facc15';
    ctx.fillRect(pad.x, pad.y, pad.w, pad.h);
  });

  // Dash Orbs
  neon.orbs.forEach(orb => {
    const extraR = orb.pulse > 0 ? 5 : 0;
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.r + extraR, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(250, 204, 21, 0.35)';
    ctx.fill();
  });

  // Score Coins
  neon.coins.forEach(c => {
    if (c.collected) return;
    ctx.fillStyle = '#fde047';
    ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Gold ? Mystery Boxes
  const invFull = (neon.slots[0] !== null && neon.slots[1] !== null);
  neon.mysteryBoxes.forEach(box => {
    const by = box.y + Math.sin(box.bobOffset) * 3;
    ctx.save();
    ctx.globalAlpha = invFull ? 0.52 : 1.0;
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(box.x, by, box.w, box.h);
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, by, box.w, box.h);
    ctx.fillStyle = '#090614';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('?', box.x + 8, by + 19);
    if (invFull) {
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('FULL', box.x + 3, by - 4);
    }
    ctx.restore();
  });

  // Obstacles (Spikes, Ceiling Spikes, Blocks, Spinning Saws)
  neon.obstacles.forEach(ob => {
    if (ob.kind === 'saw') {
      ctx.save();
      ctx.translate(ob.x, ob.y);
      ctx.rotate(ob.angle);
      ctx.fillStyle = lvlCfg.theme.hazard;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      const teeth = 8;
      ctx.beginPath();
      for (let t = 0; t < teeth * 2; t++) {
        const rad = t % 2 === 0 ? ob.r : ob.r * 0.62;
        const a = (t * Math.PI) / teeth;
        if (t === 0) ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
        else ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else if (ob.kind === 'block') {
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
      ctx.strokeStyle = lvlCfg.theme.accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(ob.x, ob.y, ob.w, ob.h);
    } else if (ob.kind === 'spike_down') {
      ctx.fillStyle = lvlCfg.theme.hazard;
      ctx.strokeStyle = '#fecdd3';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ob.x, ob.y);
      ctx.lineTo(ob.x + ob.w / 2, ob.y + ob.h);
      ctx.lineTo(ob.x + ob.w, ob.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = lvlCfg.theme.hazard;
      ctx.strokeStyle = '#fecdd3';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ob.x, ob.y + ob.h);
      ctx.lineTo(ob.x + ob.w / 2, ob.y);
      ctx.lineTo(ob.x + ob.w, ob.y + ob.h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  });

  // Active Neon Shells
  neon.shells.forEach(sh => {
    ctx.fillStyle = '#2dd4bf';
    ctx.beginPath(); ctx.arc(sh.x, sh.y, 10, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
  });

  // Player Trail
  const skin = NEON_SKINS[neon.settings.skinIdx] || NEON_SKINS[0];
  const starHue = (Date.now() * 0.4) % 360;
  neon.player.trail.forEach((tr, idx) => {
    const alpha = (1 - idx / neon.player.trail.length) * 0.35;
    ctx.fillStyle = neon.activeEffects.star > 0 ? `hsla(${(starHue + idx * 25) % 360}, 95%, 60%, ${alpha})` : skin.fill + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    const sz = neon.player.size * (1 - idx * 0.045);
    ctx.fillRect(tr.x - sz / 2, tr.y - sz / 2, sz, sz);
  });

  // Player Cube / Ship
  const p = neon.player;
  ctx.save();
  ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
  ctx.rotate(p.rotation);
  ctx.scale(p.squashX, p.squashY);

  const mainFill = neon.activeEffects.star > 0 ? `hsl(${starHue}, 95%, 60%)` : skin.fill;
  if (p.vehicle === 'ship') {
    ctx.fillStyle = mainFill;
    ctx.strokeStyle = skin.stroke;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-14, -10);
    ctx.lineTo(16, 0);
    ctx.lineTo(-14, 10);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillStyle = mainFill;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.strokeStyle = skin.stroke;
    ctx.lineWidth = 2;
    ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
    // Geometry Dash style visor eyes
    ctx.fillStyle = skin.eye;
    ctx.fillRect(-7, -6, 5, 5);
    ctx.fillRect(3, -6, 5, 5);
    ctx.fillRect(-6, 3, 13, 4);
  }
  ctx.restore();

  // Bubble Shield ring
  if (neon.activeEffects.bubble) {
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(p.x + p.size / 2, p.y + p.size / 2, p.size * 0.82, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Magnet aura ring
  if (neon.activeEffects.magnet > 0) {
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(p.x + p.size / 2, p.y + p.size / 2, p.size * 1.1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Level 9 Dark Spotlight Fog
  if (lvlCfg.darkFog && neon.screen === 'playing') {
    const fog = ctx.createRadialGradient(p.x + 65, p.y + 14, 55, p.x + 65, p.y + 14, 240);
    fog.addColorStop(0, 'rgba(4, 4, 10, 0)');
    fog.addColorStop(1, 'rgba(4, 4, 10, 0.88)');
    ctx.fillStyle = fog;
    ctx.fillRect(0, neon.ceilY, 540, neon.groundY - neon.ceilY);
  }

  // Particles
  for (let i = neon.particles.length - 1; i >= 0; i--) {
    const pt = neon.particles[i];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.life--;
    ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
    ctx.fillStyle = pt.color;
    ctx.fillRect(pt.x - pt.size / 2, pt.y - pt.size / 2, pt.size, pt.size);
    ctx.globalAlpha = 1;
    if (pt.life <= 0) neon.particles.splice(i, 1);
  }

  // Floating Texts
  for (let i = neon.floatingTexts.length - 1; i >= 0; i--) {
    const ft = neon.floatingTexts[i];
    ft.y -= 0.7;
    ft.life--;
    ctx.globalAlpha = Math.min(1, ft.life / 20);
    ctx.fillStyle = ft.color;
    ctx.font = 'bold 12px monospace';
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.globalAlpha = 1;
    if (ft.life <= 0) neon.floatingTexts.splice(i, 1);
  }

  // Bottom Status Strip (y=312..376)
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px monospace';
  if (neon.mode === 'campaign') {
    ctx.fillText(`${lvlCfg.name} — ${lvlCfg.twist}`, 12, 326);
  } else {
    ctx.fillText(`Endless Mode — Survive & bank score for the Power-Up Shop!`, 12, 326);
  }

  // Active timed powerup bars
  let barX = 12;
  const activeTimers = [
    { key: 'star', label: 'STAR', max: 300, color: '#facc15' },
    { key: 'mushroom', label: 'BOOST 2X', max: 240, color: '#fb7185' },
    { key: 'feather', label: 'GLIDE', max: 300, color: '#4ade80' },
    { key: 'magnet', label: 'MAGNET', max: 360, color: '#c084fc' }
  ];
  activeTimers.forEach(t => {
    const rem = neon.activeEffects[t.key];
    if (rem > 0) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(barX, 336, 118, 14);
      ctx.fillStyle = t.color;
      ctx.fillRect(barX, 336, 118 * (rem / t.max), 14);
      ctx.fillStyle = '#090614';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(t.label, barX + 6, 347);
      barX += 126;
    }
  });
}

/* ---------- Overlay Menus (Title, Campaign, Shop, Settings, Pause, End) ---------- */
function drawNeonOverlayMenus(ctx) {
  ctx.fillStyle = 'rgba(7, 5, 20, 0.84)';
  ctx.fillRect(0, 0, 540, 380);

  if (neon.screen === 'menu') {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 30px monospace';
    ctx.fillText('NEON JUMP', 270, 58);
    ctx.fillStyle = '#f472b6';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('GEOMETRY DASH CLONE BY MR BOSWELL', 270, 80);

    // Banked Score & Loadout Summary Pill
    ctx.fillStyle = '#140b26';
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(75, 96, 390, 36, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 13px monospace';
    const qLbl = neon.shopLoadout[0] ? NEON_POWERUPS[neon.shopLoadout[0]].short : 'Empty';
    const eLbl = neon.shopLoadout[1] ? NEON_POWERUPS[neon.shopLoadout[1]].short : 'Empty';
    ctx.fillText(`BANKED SCORE: ${neon.bankedScore}   |   [Q] ${qLbl}  [E] ${eLbl}`, 270, 118);
    ctx.textAlign = 'left';

    drawCanvasButton(ctx, 110, 148, 320, 44, 'CAMPAIGN (10 UNIQUE LEVELS)', '#22d3ee', '#071018', '#ffffff', () => {
      neon.screen = 'campaign_select';
    }, `Unlocked: Level ${neon.unlockedLevel} / 10`);

    drawCanvasButton(ctx, 110, 202, 320, 44, 'ENDLESS ARCADE RUN', '#a78bfa', '#071018', '#ffffff', () => {
      startNeonRun('endless', 0);
    }, `Best Endless Score: ${neon.bestEndless}`);

    drawCanvasButton(ctx, 110, 256, 154, 44, 'POWER-UP SHOP', '#facc15', '#071018', '#ffffff', () => {
      neon.screen = 'shop';
    }, 'Buy Q & E items');

    drawCanvasButton(ctx, 276, 256, 154, 44, 'SETTINGS & SKIN', '#6366ff', '#000000', '#38bdf8', () => {
      neon.screen = 'settings';
    }, NEON_SKINS[neon.settings.skinIdx].name);

    // ctx.textAlign = 'center';
    // ctx.fillStyle = '#94a3b8';
    // ctx.font = '11px monospace';
    // ctx.fillText('Collect gold ? boxes in-game to fill Slot Q first, then Slot E!', 270, 332);
    // ctx.textAlign = 'left';
  }

  else if (neon.screen === 'campaign_select') {
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('SELECT CAMPAIGN LEVEL (10 TWISTS)', 24, 34);

    drawCanvasButton(ctx, 434, 14, 86, 28, '← BACK', '#1e293b', '#f8fafc', '#475569', () => {
      neon.screen = 'menu';
    });

    for (let i = 0; i < 10; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const bx = 22 + col * 252;
      const by = 52 + row * 56;
      const lvl = NEON_LEVELS[i];
      const unlocked = (i + 1) <= neon.unlockedLevel;

      drawCanvasButton(
        ctx, bx, by, 242, 48,
        unlocked ? lvl.name : `🔒 ${lvl.name}`,
        unlocked ? '#161d27' : '#0f141c',
        unlocked ? lvl.theme.accent : '#64748b',
        unlocked ? lvl.theme.accent : '#334155',
        () => {
          if (unlocked) startNeonRun('campaign', i);
        },
        unlocked ? lvl.twist.slice(0, 34) + (lvl.twist.length > 34 ? '…' : '') : 'Complete previous level to unlock'
      );
    }

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px monospace';
    ctx.fillText('Tip: You can also unlock all levels in Settings if testing in class!', 24, 352);
  }

  else if (neon.screen === 'shop') {
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`POWER-UP SHOP  •  BANK: ${neon.bankedScore}`, 24, 34);

    drawCanvasButton(ctx, 434, 14, 86, 28, '← BACK', '#1e293b', '#f8fafc', '#475569', () => {
      neon.screen = 'menu';
    });

    const qItem = neon.shopLoadout[0] ? NEON_POWERUPS[neon.shopLoadout[0]].name : 'Empty';
    const eItem = neon.shopLoadout[1] ? NEON_POWERUPS[neon.shopLoadout[1]].name : 'Empty';
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px monospace';
    ctx.fillText(`Starting Loadout →  [Q] Slot 1: ${qItem}   |   [E] Slot 2: ${eItem}`, 24, 58);

    NEON_POWERUP_KEYS.forEach((key, idx) => {
      const item = NEON_POWERUPS[key];
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const bx = 22 + col * 252;
      const by = 72 + row * 80;
      const canBuy = neon.bankedScore >= item.cost && (neon.shopLoadout[0] === null || neon.shopLoadout[1] === null);

      drawCanvasButton(
        ctx, bx, by, 242, 70,
        `${item.name} — ${item.cost} PTS`,
        canBuy ? '#182232' : '#10151f',
        item.color,
        canBuy ? item.color : '#334155',
        () => {
          if (!canBuy) return;
          if (neon.shopLoadout[0] === null) neon.shopLoadout[0] = key;
          else if (neon.shopLoadout[1] === null) neon.shopLoadout[1] = key;
          else return;
          neon.bankedScore -= item.cost;
          saveNeonSaveData();
          playNeonSfx('pickup');
          updateNeonCodeSnippet();
        },
        item.desc.slice(0, 36) + '…'
      );
    });

    drawCanvasButton(ctx, 22, 322, 242, 38, 'REFUND LOADOUT', '#1e293b', '#f8fafc', '#475569', () => {
      for (let s = 0; s < 2; s++) {
        if (neon.shopLoadout[s]) {
          neon.bankedScore += NEON_POWERUPS[neon.shopLoadout[s]].cost;
          neon.shopLoadout[s] = null;
        }
      }
      saveNeonSaveData();
      updateNeonCodeSnippet();
    });

    drawCanvasButton(ctx, 274, 322, 242, 38, 'PLAY WITH LOADOUT →', '#22d3ee', '#071018', '#ffffff', () => {
      startNeonRun(neon.mode, neon.levelIdx);
    });
  }

  else if (neon.screen === 'settings') {
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('GAME SETTINGS & CUBE SKIN', 24, 34);

    drawCanvasButton(ctx, 434, 14, 86, 28, '← BACK', '#0059e7', '#f8fafc', '#8bbcff', () => {
      neon.screen = 'menu';
    });

    drawCanvasButton(ctx, 40, 64, 220, 44, `SOUND FX: ${neon.settings.sfx ? 'ON' : 'OFF'}`, '#161d27', neon.settings.sfx ? '#4ade80' : '#94a3b8', '#334155', () => {
      neon.settings.sfx = !neon.settings.sfx;
      saveNeonSaveData();
    });

    drawCanvasButton(ctx, 280, 64, 220, 44, `VFX PARTICLES: ${neon.settings.particles ? 'ON' : 'OFF'}`, '#161d27', neon.settings.particles ? '#4ade80' : '#94a3b8', '#334155', () => {
      neon.settings.particles = !neon.settings.particles;
      saveNeonSaveData();
    });

    drawCanvasButton(ctx, 40, 122, 220, 44, `SCREEN SHAKE: ${neon.settings.shake ? 'ON' : 'OFF'}`, '#161d27', neon.settings.shake ? '#4ade80' : '#94a3b8', '#334155', () => {
      neon.settings.shake = !neon.settings.shake;
      saveNeonSaveData();
    });

    drawCanvasButton(ctx, 280, 122, 220, 44, `AUTO-RETRY: ${neon.settings.autoRetry ? 'ON' : 'OFF'}`, '#161d27', neon.settings.autoRetry ? '#4ade80' : '#94a3b8', '#334155', () => {
      neon.settings.autoRetry = !neon.settings.autoRetry;
      saveNeonSaveData();
    });

    const curSkin = NEON_SKINS[neon.settings.skinIdx];
    drawCanvasButton(ctx, 40, 184, 460, 46, `CUBE SKIN: ${curSkin.name.toUpperCase()} (CLICK TO CYCLE)`, '#161d27', curSkin.fill, curSkin.fill, () => {
      neon.settings.skinIdx = (neon.settings.skinIdx + 1) % NEON_SKINS.length;
      saveNeonSaveData();
    });

    drawCanvasButton(ctx, 40, 246, 460, 42, 'UNLOCK ALL 10 CAMPAIGN LEVELS', '#1e293b', '#facc15', '#facc15', () => {
      neon.unlockedLevel = 10;
      saveNeonSaveData();
      playNeonSfx('win');
    });
  }

  else if (neon.screen === 'paused') {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 26px monospace';
    ctx.fillText('GAME PAUSED', 270, 96);
    ctx.textAlign = 'left';

    drawCanvasButton(ctx, 145, 130, 250, 42, 'RESUME RUN', '#22d3ee', '#071018', '#ffffff', () => {
      neon.screen = 'playing';
    });
    drawCanvasButton(ctx, 145, 184, 250, 42, 'RESTART LEVEL', '#1e293b', '#f8fafc', '#38bdf8', () => {
      restartNeonRun();
    });
    drawCanvasButton(ctx, 145, 238, 250, 42, 'MAIN MENU & SHOP', '#1e293b', '#facc15', '#facc15', () => {
      neon.screen = 'menu';
    });
  }

  else if (neon.screen === 'game_over') {
    const earned = Math.floor(neon.runScore);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('CRASHED!', 270, 84);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`Run Score Banked: +${earned}   |   Total Bank: ${neon.bankedScore}`, 270, 116);

    if (neon.mode === 'campaign') {
      const pct = Math.min(100, Math.floor((neon.distance / neon.levelLength) * 100));
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Level ${neon.levelIdx + 1} Progress: ${pct}% (Attempt ${neon.attempts})`, 270, 140);
    }
    ctx.textAlign = 'left';

    drawCanvasButton(ctx, 145, 166, 250, 44, 'RETRY IMMEDIATELY (SPACE)', '#22d3ee', '#071018', '#ffffff', () => {
      restartNeonRun();
    });
    drawCanvasButton(ctx, 145, 222, 250, 42, 'SPEND SCORE IN SHOP', '#facc15', '#071018', '#ffffff', () => {
      neon.screen = 'shop';
    });
    drawCanvasButton(ctx, 145, 276, 250, 40, 'MAIN MENU', '#1e293b', '#f8fafc', '#475569', () => {
      neon.screen = 'menu';
    });
  }

  else if (neon.screen === 'level_clear') {
    const clearBonus = 150 + (neon.levelIdx + 1) * 35;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 28px monospace';
    ctx.fillText(`LEVEL ${neon.levelIdx + 1} COMPLETE!`, 270, 82);

    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`Run + Clear Bonus: +${Math.floor(neon.runScore) + clearBonus} PTS!`, 270, 114);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Total Banked Score: ${neon.bankedScore}`, 270, 138);
    ctx.textAlign = 'left';

    if (neon.levelIdx < 9) {
      drawCanvasButton(ctx, 145, 166, 250, 44, `NEXT: LEVEL ${neon.levelIdx + 2} →`, '#4ade80', '#071018', '#ffffff', () => {
        startNeonRun('campaign', neon.levelIdx + 1);
      });
    } else {
      drawCanvasButton(ctx, 145, 166, 250, 44, 'ALL 10 LEVELS BEATEN! ENDLESS →', '#facc15', '#071018', '#ffffff', () => {
        startNeonRun('endless', 0);
      });
    }

    drawCanvasButton(ctx, 145, 222, 250, 42, 'POWER-UP SHOP', '#1e293b', '#facc15', '#facc15', () => {
      neon.screen = 'shop';
    });
    drawCanvasButton(ctx, 145, 276, 250, 40, 'LEVEL SELECT', '#1e293b', '#f8fafc', '#475569', () => {
      neon.screen = 'campaign_select';
    });
  }
}

/* ---------- Main Frame Entry Point ---------- */
function stepNeonJumpShowcase(ctx) {
  bindNeonCanvasPointer(ctx.canvas);
  neon.uiHitboxes = [];

  const lvlCfg = NEON_LEVELS[neon.levelIdx] || NEON_LEVELS[0];

  if (neon.screen === 'playing') {
    stepNeonGameplay();
  }

  ctx.save();
  if (neon.shakeTimer > 0) {
    const sx = (Math.random() - 0.5) * neon.shakeMag;
    const sy = (Math.random() - 0.5) * neon.shakeMag;
    ctx.translate(sx, sy);
  }

  drawNeonBackground(ctx, lvlCfg);
  drawNeonWorld(ctx, lvlCfg);
  drawNeonInventoryHud(ctx);

  if (neon.screen !== 'playing') {
    drawNeonOverlayMenus(ctx);
  }
  ctx.restore();

  const hudBadge = document.getElementById('showcaseHudBadge');
  if (hudBadge) {
    const qTxt = neon.slots[0] ? NEON_POWERUPS[neon.slots[0]].short : '-';
    const eTxt = neon.slots[1] ? NEON_POWERUPS[neon.slots[1]].short : '-';
    hudBadge.textContent = `Bank: ${neon.bankedScore} • Q:${qTxt} E:${eTxt}`;
  }

  if (neon.screen === 'playing' && Math.floor(neon.distance) % 30 < 6) {
    updateNeonCodeSnippet();
  }
}
