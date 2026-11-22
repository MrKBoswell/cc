/* ==================== TOOL 7: MOUSE AIMING & MATH.ATAN2 ==================== */
const aimState = { mx: 380, my: 110 };

function initAimPointer() {
  const canvas = document.getElementById('aimCanvas');
  const setAim = (e) => {
    const rect = canvas.getBoundingClientRect();
    aimState.mx = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
    aimState.my = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));
    drawAimCanvas();
  };
  canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); setAim(e); });
  canvas.addEventListener('pointermove', (e) => { setAim(e); });
}

function drawAimCanvas() {
  const canvas = document.getElementById('aimCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 260, cy = 160;
  const dx = aimState.mx - cx;
  const dy = aimState.my - cy;
  const rad = Math.atan2(-dy, dx);
  const deg = Math.round(rad * (180 / Math.PI));

  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, 520, 320);

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(cx, cy); ctx.lineTo(aimState.mx, cy);
  ctx.lineTo(aimState.mx, aimState.my);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(aimState.mx, aimState.my); ctx.stroke();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-rad);
  ctx.fillStyle = '#2dd4bf';
  ctx.fillRect(0, -8, 46, 16);
  ctx.restore();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill();

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(aimState.mx, aimState.my, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1'; ctx.font = '12px monospace';
  ctx.fillText(`dx = ${dx}`, cx + dx / 2 - 20, cy + 16);
  ctx.fillText(`dy = ${dy}`, aimState.mx + 10, cy + dy / 2);

  document.getElementById('aimAngleTag').textContent = `angle: ${deg}°`;
  document.getElementById('aimCodeOutput').textContent = [
    `mouse_x, mouse_y = (${aimState.mx}, ${aimState.my})`,
    `dx = mouse_x - turret.centerx   # ${dx}`,
    `dy = mouse_y - turret.centery   # ${dy}`,
    '',
    '# Convert radians to degrees for pygame.transform.rotate:',
    `angle = math.degrees(math.atan2(-dy, dx))   # ${deg}°`,
    'rotated_turret = pygame.transform.rotate(turret_img, angle)'
  ].join('\n');
}

