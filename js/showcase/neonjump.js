// 2. Neon Jump State (Geometry Dash-style platformer + Mario power-ups on Q & E)
let neon = {
  x: 90,
  y: 274,
  vy: 0,
  size: 28,
  groundY: 302,
  onGround: true,
  speed: 4.6,
  score: 0,
  obstacles: [],
  powerups: [],
  boostTimer: 0,
  shieldActive: false,
  qCharges: 2,
  eCharges: 2,
  spawnTimer: 0,
  jumpCd: 0,
  qCd: 0,
  eCd: 0
};

function initNeonJump() {
  neon = {
    x: 90,
    y: 274,
    vy: 0,
    size: 28,
    groundY: 302,
    onGround: true,
    speed: 4.6,
    score: 0,
    obstacles: [
      { x: 340, w: 24, h: 28, passed: false },
      { x: 520, w: 28, h: 34, passed: false }
    ],
    powerups: [
      { x: 430, y: 240, type: 'boost' },
      { x: 610, y: 230, type: 'shield' }
    ],
    boostTimer: 0,
    shieldActive: false,
    qCharges: 2,
    eCharges: 2,
    spawnTimer: 0,
    jumpCd: 0,
    qCd: 0,
    eCd: 0
  };
}

function triggerNeonJump() {
  if (neon.onGround && neon.jumpCd === 0) {
    neon.vy = -12.6;
    neon.onGround = false;
    neon.jumpCd = 10;
  }
}

function activateNeonPowerQ() {
  if (neon.qCd === 0 && neon.qCharges > 0) {
    neon.qCharges -= 1;
    neon.boostTimer = 150;
    neon.qCd = 18;
    if (neon.onGround) {
      neon.vy = -9.5;
      neon.onGround = false;
    }
  }
}

function activateNeonPowerE() {
  if (neon.eCd === 0 && neon.eCharges > 0 && !neon.shieldActive) {
    neon.eCharges -= 1;
    neon.shieldActive = true;
    neon.eCd = 18;
  }
}

function stepNeonJumpShowcase(ctx) {
  if (neon.jumpCd > 0) neon.jumpCd--;
  if (neon.qCd > 0) neon.qCd--;
  if (neon.eCd > 0) neon.eCd--;
  if (neon.boostTimer > 0) neon.boostTimer--;

  const wantsJump = !!(showcaseKeys['Space'] || showcaseKeys['ArrowUp'] || showcaseKeys['KeyW']);
  if (wantsJump) triggerNeonJump();
  if (showcaseKeys['KeyQ']) activateNeonPowerQ();
  if (showcaseKeys['KeyE']) activateNeonPowerE();

  if (showcaseKeys['ArrowLeft'] || showcaseKeys['KeyA']) neon.x = Math.max(24, neon.x - 4.5);
  if (showcaseKeys['ArrowRight'] || showcaseKeys['KeyD']) neon.x = Math.min(340, neon.x + 4.5);

  const activeSpeed = neon.boostTimer > 0 ? neon.speed * 1.55 : neon.speed;

  if (!neon.onGround) {
    neon.vy += 0.62;
    neon.y += neon.vy;
    if (neon.y + neon.size >= neon.groundY) {
      neon.y = neon.groundY - neon.size;
      neon.vy = 0;
      neon.onGround = true;
    }
  }

  neon.spawnTimer++;
  if (neon.spawnTimer >= 72) {
    neon.spawnTimer = 0;
    const h = 24 + Math.floor(Math.random() * 18);
    neon.obstacles.push({ x: 560, w: 24, h, passed: false });
    if (Math.random() < 0.55) {
      neon.powerups.push({
        x: 615,
        y: 215 + Math.floor(Math.random() * 55),
        type: Math.random() < 0.5 ? 'boost' : 'shield'
      });
    }
  }

  for (let i = neon.powerups.length - 1; i >= 0; i--) {
    const p = neon.powerups[i];
    p.x -= activeSpeed;
    if (Math.hypot((neon.x + neon.size / 2) - p.x, (neon.y + neon.size / 2) - p.y) < 26) {
      if (p.type === 'boost') neon.qCharges = Math.min(4, neon.qCharges + 1);
      else neon.eCharges = Math.min(4, neon.eCharges + 1);
      neon.score += 2;
      neon.powerups.splice(i, 1);
      continue;
    }
    if (p.x < -20) neon.powerups.splice(i, 1);
  }

  let crashed = false;
  for (let i = neon.obstacles.length - 1; i >= 0; i--) {
    const ob = neon.obstacles[i];
    ob.x -= activeSpeed;
    const obTop = neon.groundY - ob.h;
    const overlaps =
      neon.x + neon.size - 4 > ob.x &&
      neon.x + 4 < ob.x + ob.w &&
      neon.y + neon.size - 3 > obTop;

    if (overlaps) {
      if (neon.shieldActive) {
        neon.shieldActive = false;
        neon.obstacles.splice(i, 1);
        neon.score += 3;
        continue;
      } else {
        crashed = true;
        break;
      }
    }

    if (!ob.passed && ob.x + ob.w < neon.x) {
      ob.passed = true;
      neon.score += 1;
    }
    if (ob.x < -40) neon.obstacles.splice(i, 1);
  }

  if (crashed) {
    initNeonJump();
  }

  ctx.fillStyle = '#090614';
  ctx.fillRect(0, 0, 540, 380);

  // Synth grid lines
  ctx.strokeStyle = 'rgba(217, 70, 239, 0.16)';
  ctx.lineWidth = 1;
  for (let gx = 0; gx <= 540; gx += 45) {
    ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, neon.groundY); ctx.stroke();
  }
  for (let gy = 40; gy < neon.groundY; gy += 45) {
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(540, gy); ctx.stroke();
  }

  // Ground deck
  ctx.fillStyle = '#18102b';
  ctx.fillRect(0, neon.groundY, 540, 78);
  ctx.strokeStyle = neon.boostTimer > 0 ? '#facc15' : '#22d3ee';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, neon.groundY); ctx.lineTo(540, neon.groundY); ctx.stroke();

  // Power-up orbs
  neon.powerups.forEach(p => {
    ctx.fillStyle = p.type === 'boost' ? '#facc15' : '#4ade80';
    ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#090614'; ctx.font = 'bold 10px monospace';
    ctx.fillText(p.type === 'boost' ? 'Q' : 'E', p.x - 3, p.y + 3);
  });

  // Neon Spikes
  neon.obstacles.forEach(ob => {
    const baseY = neon.groundY;
    const tipY = neon.groundY - ob.h;
    ctx.fillStyle = '#f43f5e';
    ctx.strokeStyle = '#fda4af';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ob.x, baseY);
    ctx.lineTo(ob.x + ob.w / 2, tipY);
    ctx.lineTo(ob.x + ob.w, baseY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // Player cube
  ctx.fillStyle = neon.boostTimer > 0 ? '#facc15' : '#22d3ee';
  ctx.fillRect(neon.x, neon.y, neon.size, neon.size);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(neon.x, neon.y, neon.size, neon.size);

  if (neon.shieldActive) {
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(neon.x + neon.size / 2, neon.y + neon.size / 2, neon.size * 0.78, 0, Math.PI * 2);
    ctx.stroke();
  }

  // HUD
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(`Score: ${neon.score}`, 14, 24);
  ctx.fillStyle = '#facc15';
  ctx.fillText(`[Q] Boost: ${neon.qCharges}${neon.boostTimer > 0 ? ' (ACTIVE)' : ''}`, 14, 46);
  ctx.fillStyle = '#4ade80';
  ctx.fillText(`[E] Shield: ${neon.eCharges}${neon.shieldActive ? ' (ON)' : ''}`, 14, 68);

  document.getElementById('showcaseHudBadge').textContent = `Score: ${neon.score} • Q:${neon.qCharges} E:${neon.eCharges}`;
}

