// 3. Tetris state
const TETRA_SHAPES = [
  [[1,1,1,1]],
  [[1,1],[1,1]],
  [[0,1,0],[1,1,1]],
  [[1,0,0],[1,1,1]],
  [[0,0,1],[1,1,1]]
];
const TETRA_COLORS = ['#2dd4bf', '#f59e0b', '#a78bfa', '#38bdf8', '#ef4444'];
let tet = { grid: [], piece: null, lines: 0, tick: 0 };
function initTetris() {
  tet.grid = Array.from({length: 19}, () => Array(10).fill(0));
  tet.lines = 0; tet.tick = 0;
  spawnTetrisPiece();
}
function spawnTetrisPiece() {
  const idx = Math.floor(Math.random() * TETRA_SHAPES.length);
  tet.piece = { shape: TETRA_SHAPES[idx], color: TETRA_COLORS[idx], x: 3, y: 0 };
}
function tetCollides(px, py, shape) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = px + c, ny = py + r;
      if (nx < 0 || nx >= 10 || ny >= 19) return true;
      if (ny >= 0 && tet.grid[ny][nx]) return true;
    }
  }
  return false;
}
function handleTetrisInput(code) {
  if (!tet.piece) return;
  const p = tet.piece;
  if (code === 'ArrowLeft' || code === 'KeyA') {
    if (!tetCollides(p.x - 1, p.y, p.shape)) p.x--;
  } else if (code === 'ArrowRight' || code === 'KeyD') {
    if (!tetCollides(p.x + 1, p.y, p.shape)) p.x++;
  } else if (code === 'ArrowUp' || code === 'KeyW' || code === 'Space') {
    const rot = p.shape[0].map((_, i) => p.shape.map(row => row[i]).reverse());
    if (!tetCollides(p.x, p.y, rot)) p.shape = rot;
  } else if (code === 'ArrowDown' || code === 'KeyS') {
    if (!tetCollides(p.x, p.y + 1, p.shape)) p.y++;
  }
}


/* --- Game 3: Mini Tetris --- */
function stepTetris(ctx) {
  if (!tet.piece) initTetris();
  tet.tick++;
  const p = tet.piece;
  const exec = [1, 2, 3, 5]; const change = [];

  if (tet.tick % 22 === 0) {
    if (!tetCollides(p.x, p.y + 1, p.shape)) {
      p.y++;
      exec.push(0); change.push(0);
    } else {
      for (let r = 0; r < p.shape.length; r++) {
        for (let c = 0; c < p.shape[r].length; c++) {
          if (p.shape[r][c] && p.y + r >= 0) tet.grid[p.y + r][p.x + c] = p.color;
        }
      }
      let clearedThisDrop = 0;
      for (let r = 18; r >= 0; r--) {
        if (tet.grid[r].every(cell => cell !== 0)) {
          tet.grid.splice(r, 1);
          tet.grid.unshift(Array(10).fill(0));
          tet.lines++;
          clearedThisDrop++;
          r++;
        }
      }
      spawnTetrisPiece();
      if (tetCollides(tet.piece.x, tet.piece.y, tet.piece.shape)) initTetris();
      exec.push(6, 7, 8);
      change.push(6, 8);
      if (clearedThisDrop > 0) change.push(7);
    }
  }

  ctx.fillStyle = '#0b1018'; ctx.fillRect(0, 0, 500, 380);
  const ox = 150;
  ctx.strokeStyle = '#334155'; ctx.strokeRect(ox, 0, 200, 380);
  for (let r = 0; r < 19; r++) {
    for (let c = 0; c < 10; c++) {
      if (tet.grid[r][c]) {
        ctx.fillStyle = tet.grid[r][c];
        ctx.fillRect(ox + c * 20 + 1, r * 20 + 1, 18, 18);
      }
    }
  }
  for (let r = 0; r < p.shape.length; r++) {
    for (let c = 0; c < p.shape[r].length; c++) {
      if (p.shape[r][c]) {
        ctx.fillStyle = p.color;
        ctx.fillRect(ox + (p.x + c) * 20 + 1, (p.y + r) * 20 + 1, 18, 18);
      }
    }
  }
  ctx.fillStyle = '#f8fafc'; ctx.font = 'bold 14px monospace';
  ctx.fillText(`Lines: ${tet.lines}`, 14, 24);

  if (tet.tick % 22 === 0 || change.length) {
    renderLiveCodeLines(GAME_SOURCES.tetris, exec, change);
    updateLiveVarWatch({ 'lines_cleared': tet.lines, 'piece.x': p.x, 'piece.y': p.y });
  }
}

