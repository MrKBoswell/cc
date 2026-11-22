/* ==================== TOOL 5: GRAVITY, JUMP & LEFT/RIGHT WITH OFF-SCREEN ARROW ==================== */
const gravState = {
  x: 235, y: 230, vy: 0, speedX: 4.5,
  gravity: 0.6, jumpPower: -15, groundY: 280, size: 50,
  onGround: true, keys: { left: false, right: false }
};

function updateGravityParams() {
  gravState.gravity = parseFloat(document.getElementById('gravSlider').value);
  gravState.jumpPower = parseFloat(document.getElementById('jumpSlider').value);
  document.getElementById('gravValLbl').textContent = gravState.gravity.toFixed(1);
  document.getElementById('jumpValLbl').textContent = gravState.jumpPower;
  renderGravityCode();
}

function triggerJump() {
  if (gravState.onGround) {
    gravState.vy = gravState.jumpPower;
    gravState.onGround = false;
  }
}

function resetGravity() {
  gravState.x = 235; gravState.y = 230; gravState.vy = 0; gravState.onGround = true;
}

function renderGravityCode() {
  const rx = Math.round(gravState.x);
  const ry = Math.round(gravState.y);
  document.getElementById('gravStatusBadge').textContent = `x: ${rx}, y: ${ry} | vy: ${gravState.vy.toFixed(1)}`;
  document.getElementById('gravityCodeOutput').textContent = [
    `player.x = ${rx}   # Clamped: 0 <= player.x <= 470`,
    `player.y = ${ry}   # Not clamped at top!`,
    `vy = ${gravState.vy.toFixed(1)}`,
    '',
    'if keys[K_LEFT]:  player.x = max(0, player.x - 4.5)',
    'if keys[K_RIGHT]: player.x = min(470, player.x + 4.5)',
    'if keys[K_SPACE] and on_ground:',
    `    vy = ${gravState.jumpPower}`,
    '',
    `vy += ${gravState.gravity.toFixed(1)}`,
    'player.y += vy',
    'if player.bottom < 0:',
    `    draw_top_arrow(x=${rx + 25}, label="(${rx}, ${ry})")`,
    'if player.bottom >= 280:',
    '    player.bottom = 280; vy = 0'
  ].join('\n');
}

function drawGravityCanvas() {
  const canvas = document.getElementById('gravityCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, 520, 340);

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, gravState.groundY, 520, 60);
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, gravState.groundY); ctx.lineTo(520, gravState.groundY); ctx.stroke();

  const px = gravState.x;
  const py = gravState.y;

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px, py, gravState.size, gravState.size);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(px, py, gravState.size, gravState.size);

  if (Math.abs(gravState.vy) > 0.5 && py + gravState.size > 0) {
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px + 25, py + 25);
    ctx.lineTo(px + 25, py + 25 + gravState.vy * 3);
    ctx.stroke();
  }

  if (py + gravState.size < 0) {
    const arrowX = Math.max(24, Math.min(496, px + gravState.size / 2));
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(arrowX, 8);
    ctx.lineTo(arrowX - 12, 26);
    ctx.lineTo(arrowX + 12, 26);
    ctx.closePath();
    ctx.fill();

    const coordText = `(${Math.round(px)}, ${Math.round(py)})`;
    ctx.font = 'bold 13px monospace';
    const textW = ctx.measureText(coordText).width;
    const textX = Math.max(8, Math.min(512 - textW, arrowX + 16));
    ctx.fillStyle = '#fde68a';
    ctx.fillText(coordText, textX, 23);
  }

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '13px monospace';
  ctx.fillText(`x=${Math.round(px)}  y=${Math.round(py)}  vy=${gravState.vy.toFixed(1)}`, 14, 315);
  renderGravityCode();
}

