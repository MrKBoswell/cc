/* ==================== TOOL 2: RGB & RECT INSPECTOR ==================== */
function updateInspector() {
  const r = parseInt(document.getElementById('sliderR').value, 10);
  const g = parseInt(document.getElementById('sliderG').value, 10);
  const b = parseInt(document.getElementById('sliderB').value, 10);
  document.getElementById('lblR').textContent = r;
  document.getElementById('lblG').textContent = g;
  document.getElementById('lblB').textContent = b;

  const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase();
  document.getElementById('inspHexTag').textContent = `HEX: #${toHex(r)}${toHex(g)}${toHex(b)}`;
  document.getElementById('inspRgbTag').textContent = `RGB: (${r}, ${g}, ${b})`;
  drawInspectorCanvas();
}

function drawInspectorCanvas() {
  const canvas = document.getElementById('inspectorCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const r = parseInt(document.getElementById('sliderR').value, 10);
  const g = parseInt(document.getElementById('sliderG').value, 10);
  const b = parseInt(document.getElementById('sliderB').value, 10);
  const x = parseInt(document.getElementById('inspX').value, 10) || 0;
  const y = parseInt(document.getElementById('inspY').value, 10) || 0;
  const w = Math.max(10, parseInt(document.getElementById('inspW').value, 10) || 50);
  const h = Math.max(10, parseInt(document.getElementById('inspH').value, 10) || 50);

  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#1e293b';
  for (let gx = 0; gx <= canvas.width; gx += 25) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, canvas.height); ctx.stroke(); }
  for (let gy = 0; gy <= canvas.height; gy += 25) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(canvas.width, gy); ctx.stroke(); }

  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '13px monospace';
  ctx.fillText(`(${x}, ${y})`, x, Math.max(16, y - 6));
  ctx.fillText(`${w}px`, x + w / 2 - 16, Math.min(canvas.height - 8, y + h + 16));

  document.getElementById('inspectorCodeOutput').textContent = [
    `COLOR = (${r}, ${g}, ${b})`,
    `rect = pygame.Rect(${x}, ${y}, ${w}, ${h})`,
    '',
    'pygame.draw.rect(screen, COLOR, rect)',
    `print(f"Right edge: {rect.right}, Bottom: {rect.bottom}")  # ${x + w}, ${y + h}`
  ].join('\n');
}

