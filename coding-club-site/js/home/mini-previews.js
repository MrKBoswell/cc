/* ==================== HOMEPAGE MINI LIVE ANIMATED PREVIEWS ==================== */
const miniState = {
  pongX: 80, pongY: 50, pongVx: 2.2, pongVy: 1.6,
  snk: [{x:4,y:4},{x:3,y:4},{x:2,y:4}], snkTick: 0,
  tetY: 10, tetX: 90,
  invX: 95, invBulletY: 75,
  brkX: 110, brkY: 75, brkVx: 2.0, brkVy: -1.8,
  flpY: 55, flpPipeX: 190,
  mzX: 25, mzY: 25, mzDir: 1,
  astRocks: [
    {x: 35, y: 15, r: 7, s: 1.4},
    {x: 110, y: 55, r: 9, s: 1.9},
    {x: 185, y: 25, r: 6, s: 1.2}
  ]
};

const miniToolState = {
  grid:      { hover: false, mx: 110, my: 45 },
  inspector: { hover: false, mx: 130, my: 59 },
  movement:  { hover: false, mx: 130, my: 59, px: 115, py: 45 },
  collision: { hover: false, mx: 130, my: 59, px: 75, py: 42 },
  gravity:   { hover: false, mx: 130, my: 59, py: 72, vy: 0, px: 115 },
  patrol:    { hover: false, mx: 215, my: 25, gx: 70, gdir: 1 },
  aiming:    { hover: false, mx: 185, my: 35 }
};

function initMiniToolPreviews() {
  const toolIds = ['grid', 'inspector', 'movement', 'collision', 'gravity', 'patrol', 'aiming'];
  toolIds.forEach(id => {
    const canvas = document.getElementById('mini-tool-' + id);
    if (!canvas) return;
    canvas.addEventListener('pointerenter', () => {
      miniToolState[id].hover = true;
      if (id === 'gravity' && miniToolState.gravity.py >= 71) {
        miniToolState.gravity.vy = -7.2;
      }
    });
    canvas.addEventListener('pointerleave', () => {
      miniToolState[id].hover = false;
    });
    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      miniToolState[id].mx = Math.max(0, Math.min(canvas.width, (e.clientX - rect.left) * (canvas.width / rect.width)));
      miniToolState[id].my = Math.max(0, Math.min(canvas.height, (e.clientY - rect.top) * (canvas.height / rect.height)));
    });
  });
}

function stepHomeMiniTools(t) {
  if (activeView !== 'home') return;
  const bg = canvasBgColour;
  const paused = a11yState['reduce-motion'];

  const cGrid = document.getElementById('mini-tool-grid');
  if (cGrid) {
    const ctx = cGrid.getContext('2d');
    const st = miniToolState.grid;
    const bx = st.hover ? Math.max(0, Math.min(220, st.mx - 20)) : (paused ? 95 : 100 + Math.cos(t * 0.002) * 55);
    const by = st.hover ? Math.max(0, Math.min(86, st.my - 16)) : (paused ? 40 : 42 + Math.sin(t * 0.0025) * 24);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 260, 118);
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1;
    for (let x = 0; x <= 260; x += 26) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 118); ctx.stroke(); }
    for (let y = 0; y <= 118; y += 26) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(260, y); ctx.stroke(); }
    ctx.setLineDash([3, 3]); ctx.strokeStyle = '#38bdf8';
    ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx, by); ctx.moveTo(0, by); ctx.lineTo(bx, by); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.38)'; ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
    ctx.fillRect(bx, by, 40, 32); ctx.strokeRect(bx, by, 40, 32);
    ctx.fillStyle = '#f8fafc'; ctx.font = '11px monospace';
    ctx.fillText(`(${Math.round(bx*3)}, ${Math.round(by*5)})`, 8, 15);
  }

  const cInsp = document.getElementById('mini-tool-inspector');
  if (cInsp) {
    const ctx = cInsp.getContext('2d');
    const st = miniToolState.inspector;
    const hue = st.hover ? Math.round((st.mx / 260) * 360) : (paused ? 260 : Math.round((t * 0.06) % 360));
    const rw = st.hover ? Math.max(45, Math.min(180, st.mx * 0.7)) : (paused ? 110 : 100 + Math.sin(t * 0.003) * 30);
    const rh = st.hover ? Math.max(28, Math.min(76, st.my * 0.75)) : (paused ? 52 : 50 + Math.cos(t * 0.003) * 14);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 260, 118);
    ctx.fillStyle = `hsl(${hue}, 82%, 58%)`;
    const rx = (260 - rw) / 2, ry = (118 - rh) / 2;
    ctx.fillRect(rx, ry, rw, rh);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.strokeRect(rx, ry, rw, rh);
    ctx.fillStyle = '#f8fafc'; ctx.font = '11px monospace';
    ctx.fillText(`HSL(${hue}°, 82%, 58%)`, 8, 15);
  }

  const cMove = document.getElementById('mini-tool-movement');
  if (cMove) {
    const ctx = cMove.getContext('2d');
    const st = miniToolState.movement;
    if (st.hover) {
      st.px += (Math.max(4, Math.min(228, st.mx - 14)) - st.px) * 0.18;
      st.py += (Math.max(4, Math.min(86, st.my - 14)) - st.py) * 0.18;
    } else if (!paused) {
      const phase = (t * 0.0022) % 4;
      if (phase < 1) { st.px = 50 + phase * 130; st.py = 22; }
      else if (phase < 2) { st.px = 180; st.py = 22 + (phase - 1) * 52; }
      else if (phase < 3) { st.px = 180 - (phase - 2) * 130; st.py = 74; }
      else { st.px = 50; st.py = 74 - (phase - 3) * 52; }
    }
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 260, 118);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.strokeRect(3, 3, 254, 112);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(st.px, st.py, 26, 26);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.strokeRect(st.px, st.py, 26, 26);
  }

  const cCol = document.getElementById('mini-tool-collision');
  if (cCol) {
    const ctx = cCol.getContext('2d');
    const st = miniToolState.collision;
    const bx = st.hover ? Math.max(4, Math.min(216, st.mx - 20)) : (paused ? 110 : 105 + Math.sin(t * 0.003) * 55);
    const by = st.hover ? Math.max(4, Math.min(74, st.my - 20)) : 38;
    const tx = 135, ty = 34, tw = 46, th = 46, bw = 40, bh = 40;
    const hit = bx < tx + tw && bx + bw > tx && by < ty + th && by + bh > ty;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 260, 118);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.28)'; ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5;
    ctx.fillRect(tx, ty, tw, th); ctx.strokeRect(tx, ty, tw, th);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)'; ctx.strokeStyle = '#38bdf8';
    ctx.fillRect(bx, by, bw, bh); ctx.strokeRect(bx, by, bw, bh);
    if (hit) {
      const ox = Math.max(bx, tx), oy = Math.max(by, ty);
      ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.fillRect(ox, oy, Math.min(bx+bw, tx+tw) - ox, Math.min(by+bh, ty+th) - oy);
    }
    ctx.fillStyle = hit ? '#4ade80' : '#94a3b8'; ctx.font = 'bold 11px monospace';
    ctx.fillText(`colliderect: ${hit ? 'True' : 'False'}`, 8, 15);
  }

  const cGrav = document.getElementById('mini-tool-gravity');
  if (cGrav) {
    const ctx = cGrav.getContext('2d');
    const st = miniToolState.gravity;
    if (!paused || st.hover) {
      st.vy += 0.42;
      st.py += st.vy;
      if (st.py >= 72) {
        st.py = 72;
        st.vy = st.hover ? -8.2 : -6.8;
      }
      if (st.hover) {
        st.px += (Math.max(8, Math.min(226, st.mx - 12)) - st.px) * 0.16;
      } else {
        st.px = 118 + Math.sin(t * 0.002) * 35;
      }
    }
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 260, 118);
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 96, 260, 22);
    ctx.strokeStyle = '#2dd4bf'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 96); ctx.lineTo(260, 96); ctx.stroke();
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(st.px, st.py, 24, 24);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.strokeRect(st.px, st.py, 24, 24);
  }

  const cPat = document.getElementById('mini-tool-patrol');
  if (cPat) {
    const ctx = cPat.getContext('2d');
    const st = miniToolState.patrol;
    const px = st.hover ? st.mx : 225;
    const py = st.hover ? st.my : 22;
    const dist = Math.hypot(px - st.gx, py - 66);
    const chasing = dist < 68;
    if (!paused || st.hover) {
      if (chasing) {
        st.gx += ((px - st.gx) / (dist || 1)) * 1.6;
      } else {
        st.gx += st.gdir * 1.4;
        if (st.gx > 205) st.gdir = -1;
        if (st.gx < 55) st.gdir = 1;
      }
    }
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 260, 118);
    ctx.setLineDash([4, 4]); ctx.strokeStyle = '#475569';
    ctx.beginPath(); ctx.moveTo(55, 66); ctx.lineTo(205, 66); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = chasing ? 'rgba(239, 68, 68, 0.16)' : 'rgba(45, 212, 191, 0.08)';
    ctx.strokeStyle = chasing ? '#ef4444' : '#2dd4bf';
    ctx.beginPath(); ctx.arc(st.gx, 66, 42, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ef4444'; ctx.fillRect(st.gx - 9, 57, 18, 18);
    ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
  }

  const cAim = document.getElementById('mini-tool-aiming');
  if (cAim) {
    const ctx = cAim.getContext('2d');
    const st = miniToolState.aiming;
    const cx = 130, cy = 62;
    const tx = st.hover ? st.mx : (paused ? 205 : cx + Math.cos(t * 0.0025) * 75);
    const ty = st.hover ? st.my : (paused ? 32 : cy + Math.sin(t * 0.0025) * 42);
    const rad = Math.atan2(-(ty - cy), tx - cx);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 260, 118);
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tx, ty); ctx.stroke();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-rad);
    ctx.fillStyle = '#2dd4bf'; ctx.fillRect(0, -5, 28, 10); ctx.restore();
    ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ef4444'; ctx.beginPath(); ctx.arc(tx, ty, 6, 0, Math.PI * 2); ctx.stroke();
  }
}

function stepHomeMiniGames() {
  if (activeView !== 'home' || a11yState['reduce-motion']) return;
  const bg = canvasBgColour;

  const cPong = document.getElementById('mini-pong');
  if (cPong) {
    const ctx = cPong.getContext('2d');
    miniState.pongX += miniState.pongVx; miniState.pongY += miniState.pongVy;
    if (miniState.pongX < 18 || miniState.pongX > 222) miniState.pongVx *= -1;
    if (miniState.pongY < 8 || miniState.pongY > 117) miniState.pongVy *= -1;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 240, 125);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(8, Math.max(8, Math.min(89, miniState.pongY - 18)), 6, 36);
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(226, Math.max(8, Math.min(89, miniState.pongY - 18)), 6, 36);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(miniState.pongX, miniState.pongY, 5, 0, Math.PI * 2); ctx.fill();
  }

  const cSnk = document.getElementById('mini-snake');
  if (cSnk) {
    const ctx = cSnk.getContext('2d');
    miniState.snkTick++;
    if (miniState.snkTick % 14 === 0) {
      const head = miniState.snk[0];
      const nx = (head.x + 1) % 16;
      const ny = head.y;
      miniState.snk.unshift({ x: nx, y: ny });
      miniState.snk.pop();
    }
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 240, 125);
    ctx.fillStyle = '#ef4444'; ctx.fillRect(12 * 15, 4 * 15, 12, 12);
    miniState.snk.forEach((s, idx) => {
      ctx.fillStyle = idx === 0 ? '#2dd4bf' : '#22c55e';
      ctx.fillRect(s.x * 15, s.y * 15, 13, 13);
    });
  }

  const cTet = document.getElementById('mini-tetris');
  if (cTet) {
    const ctx = cTet.getContext('2d');
    miniState.tetY += 0.9;
    if (miniState.tetY > 95) miniState.tetY = 10;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 240, 125);
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(miniState.tetX + 14, miniState.tetY, 14, 14);
    ctx.fillRect(miniState.tetX, miniState.tetY + 14, 42, 14);
  }

  const cInv = document.getElementById('mini-invaders');
  if (cInv) {
    const ctx = cInv.getContext('2d');
    miniState.invBulletY -= 3.2;
    if (miniState.invBulletY < 10) miniState.invBulletY = 90;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 240, 125);
    ctx.fillStyle = '#ef4444';
    for (let c = 0; c < 5; c++) ctx.fillRect(35 + c * 36, 22, 22, 14);
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(miniState.invX + 10, miniState.invBulletY, 3, 8);
    ctx.fillStyle = '#2dd4bf'; ctx.fillRect(miniState.invX, 98, 24, 12);
  }

  const cBrk = document.getElementById('mini-breakout');
  if (cBrk) {
    const ctx = cBrk.getContext('2d');
    miniState.brkX += miniState.brkVx; miniState.brkY += miniState.brkVy;
    if (miniState.brkX < 8 || miniState.brkX > 232) miniState.brkVx *= -1;
    if (miniState.brkY < 38 || miniState.brkY > 100) miniState.brkVy *= -1;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 240, 125);
    for (let c = 0; c < 6; c++) { ctx.fillStyle = '#2dd4bf'; ctx.fillRect(16 + c * 36, 14, 30, 10); }
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(miniState.brkX - 20, 106, 40, 7);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(miniState.brkX, miniState.brkY, 4.5, 0, Math.PI * 2); ctx.fill();
  }

  const cFlp = document.getElementById('mini-flappy');
  if (cFlp) {
    const ctx = cFlp.getContext('2d');
    miniState.flpPipeX -= 1.8;
    if (miniState.flpPipeX < -24) miniState.flpPipeX = 240;
    miniState.flpY = 58 + Math.sin(Date.now() * 0.005) * 18;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 240, 125);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(miniState.flpPipeX, 0, 22, 42);
    ctx.fillRect(miniState.flpPipeX, 78, 22, 47);
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(52, miniState.flpY, 14, 12);
  }

  const cMz = document.getElementById('mini-maze');
  if (cMz) {
    const ctx = cMz.getContext('2d');
    miniState.mzX += miniState.mzDir * 1.3;
    if (miniState.mzX > 180 || miniState.mzX < 25) miniState.mzDir *= -1;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 240, 125);
    ctx.fillStyle = '#334155'; ctx.fillRect(75, 10, 12, 75); ctx.fillRect(145, 40, 12, 75);
    ctx.fillStyle = '#22c55e'; ctx.fillRect(198, 20, 20, 20);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(miniState.mzX, 55, 14, 14);
  }

  const cAst = document.getElementById('mini-asteroids');
  if (cAst) {
    const ctx = cAst.getContext('2d');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 240, 125);
    ctx.fillStyle = '#2dd4bf'; ctx.fillRect(108, 100, 18, 14);
    ctx.fillStyle = '#94a3b8';
    miniState.astRocks.forEach(r => {
      r.y += r.s;
      if (r.y > 135) { r.y = -10; r.x = 20 + Math.random() * 200; }
      ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.fill();
    });
  }
}

