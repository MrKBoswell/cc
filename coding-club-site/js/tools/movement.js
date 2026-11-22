/* ==================== TOOL 3: MOVEMENT & BOUNDARY SIMULATOR ==================== */
const moveState = { x: 180, y: 130, size: 40, speed: 4, clamp: true, keys: {} };

const MOVE_CODE_LINES = [
  'keys = pygame.key.get_pressed()',
  'if keys[pygame.K_LEFT]:',
  '    player.x -= 4',
  'if keys[pygame.K_RIGHT]:',
  '    player.x += 4',
  'if keys[pygame.K_UP]:',
  '    player.y -= 4',
  'if keys[pygame.K_DOWN]:',
  '    player.y += 4',
  'if clamp_enabled:',
  '    player.clamp_ip(screen.get_rect())'
];

function toggleMoveClamp() {
  moveState.clamp = !moveState.clamp;
  const btn = document.getElementById('toggleClampBtn');
  btn.classList.toggle('on', moveState.clamp);
  btn.textContent = moveState.clamp ? 'Boundary Clamp: ON' : 'Boundary Clamp: OFF (Can escape!)';
}
function resetMovePlayer() { moveState.x = 180; moveState.y = 130; }
function setVirtualKey(code, isDown) { moveState.keys[code] = isDown; updateDpadVisuals(); }

function updateDpadVisuals() {
  const k = moveState.keys;
  const up = !!(k['ArrowUp'] || k['KeyW']);
  const down = !!(k['ArrowDown'] || k['KeyS']);
  const left = !!(k['ArrowLeft'] || k['KeyA']);
  const right = !!(k['ArrowRight'] || k['KeyD']);

  document.getElementById('btnUp').classList.toggle('pressed', up);
  document.getElementById('btnDown').classList.toggle('pressed', down);
  document.getElementById('btnLeft').classList.toggle('pressed', left);
  document.getElementById('btnRight').classList.toggle('pressed', right);

  document.getElementById('keyStatesBox').textContent = [
    'pygame.key.get_pressed():',
    `K_UP:    ${up ? 'TRUE' : 'False'}`,
    `K_DOWN:  ${down ? 'TRUE' : 'False'}`,
    `K_LEFT:  ${left ? 'TRUE' : 'False'}`,
    `K_RIGHT: ${right ? 'TRUE' : 'False'}`
  ].join('\n');
}

function drawMoveCanvas(hitWall = '') {
  const canvas = document.getElementById('moveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, 400, 300);

  ctx.strokeStyle = '#162032';
  for (let x = 0; x <= 400; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 300); ctx.stroke(); }
  for (let y = 0; y <= 300; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(400, y); ctx.stroke(); }

  if (hitWall) {
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, 394, 294);
  }

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(moveState.x, moveState.y, moveState.size, moveState.size);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(moveState.x, moveState.y, moveState.size, moveState.size);

  const k = moveState.keys;
  const left = !!(k['ArrowLeft'] || k['KeyA']);
  const right = !!(k['ArrowRight'] || k['KeyD']);
  const up = !!(k['ArrowUp'] || k['KeyW']);
  const down = !!(k['ArrowDown'] || k['KeyS']);

  const execLines = [0, 1, 3, 5, 7, 9];
  const changeLines = [];
  if (left) changeLines.push(1, 2);
  if (right) changeLines.push(3, 4);
  if (up) changeLines.push(5, 6);
  if (down) changeLines.push(7, 8);
  if (moveState.clamp && hitWall) changeLines.push(10);
  else if (moveState.clamp) execLines.push(10);

  const panel = document.getElementById('moveLiveCodePanel');
  if (panel) {
    const execSet = new Set(execLines);
    const changeSet = new Set(changeLines);
    panel.innerHTML = MOVE_CODE_LINES.map((ln, idx) => {
      let cls = 'live-line';
      if (changeSet.has(idx)) cls += ' hl-change';
      else if (execSet.has(idx)) cls += ' hl-exec';
      return `<div class="${cls}"><span class="live-line-num">${idx + 1}</span><span>${escapeHtml(ln)}</span></div>`;
    }).join('');
  }
}

