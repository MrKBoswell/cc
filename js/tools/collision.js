/* ==================== TOOL 4: HITBOX & COLLIDERECT PLAYGROUND ==================== */
const colState = { p: { x: 90, y: 120, w: 80, h: 80 }, t: { x: 250, y: 140, w: 95, h: 95 }, score: 0, wasColliding: false, dragging: false, offsetX: 0, offsetY: 0 };

function resetCollisionDemo() {
  colState.p.x = 90; colState.p.y = 120; colState.score = 0; colState.wasColliding = false;
  document.getElementById('collisionConsole').textContent = 'Drag the blue player square into the red target box...';
  drawCollisionCanvas();
}

function drawCollisionCanvas() {
  const canvas = document.getElementById('collisionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const p = colState.p, t = colState.t;
  const isColliding = p.x < t.x + t.w && p.x + p.w > t.x && p.y < t.y + t.h && p.y + p.h > t.y;

  if (isColliding && !colState.wasColliding) {
    colState.score += 1;
    const con = document.getElementById('collisionConsole');
    con.textContent = `COLLISION! rect1.colliderect(rect2) == True -> score = ${colState.score}\n` + con.textContent;
  }
  colState.wasColliding = isColliding;

  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#1a2333';
  for (let x = 0; x <= canvas.width; x += 26) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
  for (let y = 0; y <= canvas.height; y += 26) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

  ctx.fillStyle = 'rgba(239, 68, 68, 0.25)'; ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
  ctx.fillRect(t.x, t.y, t.w, t.h); ctx.strokeRect(t.x, t.y, t.w, t.h);
  ctx.fillStyle = '#fca5a5'; ctx.font = '13px monospace';
  ctx.fillText(`rect2 (${t.x}, ${t.y})`, t.x, t.y + t.h + 16);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.35)'; ctx.strokeStyle = '#38bdf8';
  ctx.fillRect(p.x, p.y, p.w, p.h); ctx.strokeRect(p.x, p.y, p.w, p.h);
  ctx.fillStyle = '#bae6fd';
  ctx.fillText(`rect1 (${p.x}, ${p.y})`, p.x, Math.max(16, p.y - 6));

  if (isColliding) {
    const ox = Math.max(p.x, t.x), oy = Math.max(p.y, t.y);
    const ow = Math.min(p.x + p.w, t.x + t.w) - ox, oh = Math.min(p.y + p.h, t.y + t.h) - oy;
    ctx.fillStyle = 'rgba(34, 197, 94, 0.75)'; ctx.fillRect(ox, oy, ow, oh);
    ctx.fillStyle = '#4ade80'; ctx.font = 'bold 15px monospace';
    ctx.fillText('COLLISION DETECTED!', ox, Math.max(20, oy - 8));
  }

  const boolBadge = document.getElementById('collideBoolBadge');
  boolBadge.textContent = `colliderect: ${isColliding ? 'TRUE' : 'FALSE'}`;
  boolBadge.style.color = isColliding ? 'var(--accent-green)' : 'var(--text-muted)';
  document.getElementById('collideScoreBadge').textContent = `score: ${colState.score}`;

  document.getElementById('collisionCodeOutput').textContent = [
    `rect1 = pygame.Rect(${p.x}, ${p.y}, ${p.w}, ${p.h})`,
    `rect2 = pygame.Rect(${t.x}, ${t.y}, ${t.w}, ${t.h})`,
    '',
    `if rect1.colliderect(rect2):   # Currently: ${isColliding ? 'True' : 'False'}`,
    '    score += 1',
    '    print("COLLISION! Score:", score)'
  ].join('\n');
}

function initCollisionPointer() {
  const canvas = document.getElementById('collisionCanvas');
  canvas.addEventListener('pointerdown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    const p = colState.p;
    if (mx >= p.x && mx <= p.x + p.w && my >= p.y && my <= p.y + p.h) {
      colState.dragging = true; canvas.setPointerCapture(e.pointerId);
      colState.offsetX = mx - p.x; colState.offsetY = my - p.y;
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!colState.dragging) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    colState.p.x = Math.max(0, Math.min(canvas.width - colState.p.w, Math.round(mx - colState.offsetX)));
    colState.p.y = Math.max(0, Math.min(canvas.height - colState.p.h, Math.round(my - colState.offsetY)));
    drawCollisionCanvas();
  });
  canvas.addEventListener('pointerup', () => { colState.dragging = false; });
  canvas.addEventListener('pointercancel', () => { colState.dragging = false; });
}

