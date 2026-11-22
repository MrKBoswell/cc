/* ==================== TOOL 1: 2D PYGAME COORDINATE GRID ==================== */
const gridState = { x: 240, y: 160, w: 80, h: 80, showGrid: true, dragging: false };

function toggleGridLines() { gridState.showGrid = !gridState.showGrid; drawGridCanvas(); }
function resetGridBox() {
  gridState.x = 240; gridState.y = 160; gridState.w = 80; gridState.h = 80;
  syncInputsFromGrid(); drawGridCanvas();
}
function syncInputsFromGrid() {
  document.getElementById('gridX').value = gridState.x;
  document.getElementById('gridY').value = gridState.y;
  document.getElementById('gridW').value = gridState.w;
  document.getElementById('gridH').value = gridState.h;
}
function syncGridFromInputs() {
  gridState.x = parseInt(document.getElementById('gridX').value, 10) || 0;
  gridState.y = parseInt(document.getElementById('gridY').value, 10) || 0;
  gridState.w = Math.max(10, parseInt(document.getElementById('gridW').value, 10) || 40);
  gridState.h = Math.max(10, parseInt(document.getElementById('gridH').value, 10) || 40);
  drawGridCanvas();
}

function drawGridCanvas() {
  const canvas = document.getElementById('gridCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, 800, 600);

  if (gridState.showGrid) {
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 800; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 600); ctx.stroke(); }
    for (let y = 0; y <= 600; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(800, y); ctx.stroke(); }
    ctx.fillStyle = '#64748b';
    ctx.font = '15px monospace';
    for (let x = 0; x < 800; x += 100) ctx.fillText(x, x + 4, 18);
    for (let y = 100; y < 600; y += 100) ctx.fillText(y, 6, y - 4);
  }

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(gridState.x, 0); ctx.lineTo(gridState.x, gridState.y);
  ctx.moveTo(0, gridState.y); ctx.lineTo(gridState.x, gridState.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.fillRect(gridState.x, gridState.y, gridState.w, gridState.h);
  ctx.strokeRect(gridState.x, gridState.y, gridState.w, gridState.h);

  ctx.fillStyle = '#2dd4bf';
  ctx.beginPath();
  ctx.arc(gridState.x, gridState.y, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 18px monospace';
  ctx.fillText(`Origin: (${gridState.x}, ${gridState.y})  Size: ${gridState.w}x${gridState.h}`, Math.min(gridState.x + 12, 460), Math.max(gridState.y - 12, 36));

  document.getElementById('gridCodeOutput').textContent = [
    'import pygame',
    '',
    'screen = pygame.display.set_mode((800, 600))',
    'ORANGE = (245, 158, 11)',
    '',
    '# pygame.draw.rect(surface, color, [x, y, width, height])',
    `pygame.draw.rect(screen, ORANGE, [${gridState.x}, ${gridState.y}, ${gridState.w}, ${gridState.h}])`,
    'pygame.display.flip()'
  ].join('\n');
}

function initGridPointer() {
  const canvas = document.getElementById('gridCanvas');
  const updatePos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const rawX = Math.round(((e.clientX - rect.left) * (canvas.width / rect.width)) / 10) * 10;
    const rawY = Math.round(((e.clientY - rect.top) * (canvas.height / rect.height)) / 10) * 10;
    gridState.x = Math.max(0, Math.min(800 - gridState.w, rawX));
    gridState.y = Math.max(0, Math.min(600 - gridState.h, rawY));
    syncInputsFromGrid();
    drawGridCanvas();
  };
  canvas.addEventListener('pointerdown', (e) => { gridState.dragging = true; canvas.setPointerCapture(e.pointerId); updatePos(e); });
  canvas.addEventListener('pointermove', (e) => { if (gridState.dragging) updatePos(e); });
  canvas.addEventListener('pointerup', () => { gridState.dragging = false; });
  canvas.addEventListener('pointercancel', () => { gridState.dragging = false; });
}

