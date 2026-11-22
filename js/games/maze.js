// 7. Maze Escape state
let mz = { x: 42, y: 42, hasKey: false, won: false };
const MAZE_WALLS = [
  { x: 0, y: 0, w: 500, h: 16 }, { x: 0, y: 364, w: 500, h: 16 },
  { x: 0, y: 0, w: 16, h: 380 }, { x: 484, y: 0, w: 16, h: 380 },
  { x: 110, y: 16, w: 20, h: 240 },
  { x: 230, y: 120, w: 20, h: 244 },
  { x: 350, y: 16, w: 20, h: 250 }
];
function initMaze() { mz = { x: 42, y: 42, hasKey: false, won: false }; }


/* --- Game 7: Top-Down Maze Escape --- */
function stepMaze(ctx) {
  const exec = [0, 5, 7, 9]; const change = [];
  const oldX = mz.x, oldY = mz.y;

  if (gameKeys['ArrowLeft'] || gameKeys['KeyA'])  { mz.x -= 4; exec.push(1); change.push(1); }
  if (gameKeys['ArrowRight'] || gameKeys['KeyD']) { mz.x += 4; exec.push(2); change.push(2); }
  if (gameKeys['ArrowUp'] || gameKeys['KeyW'])    { mz.y -= 4; exec.push(3); change.push(3); }
  if (gameKeys['ArrowDown'] || gameKeys['KeyS'])  { mz.y += 4; exec.push(4); change.push(4); }

  const hitWall = MAZE_WALLS.some(w => mz.x < w.x + w.w && mz.x + 24 > w.x && mz.y < w.y + w.h && mz.y + 24 > w.y);
  if (hitWall) {
    mz.x = oldX; mz.y = oldY;
    exec.push(6); change.push(6);
  }

  if (!mz.hasKey && mz.x < 312 && mz.x + 24 > 290 && mz.y < 337 && mz.y + 24 > 315) {
    mz.hasKey = true;
    exec.push(8); change.push(8);
  }

  if (mz.hasKey && mz.x < 460 && mz.x + 24 > 425 && mz.y < 85 && mz.y + 24 > 45) {
    mz.won = true;
    exec.push(10); change.push(10);
  }

  ctx.fillStyle = '#0b1018'; ctx.fillRect(0, 0, 500, 380);
  ctx.fillStyle = '#334155'; MAZE_WALLS.forEach(w => ctx.fillRect(w.x, w.y, w.w, w.h));

  if (!mz.hasKey) {
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(290, 315, 22, 22);
    ctx.fillStyle = '#fde68a'; ctx.font = '11px monospace'; ctx.fillText('KEY', 290, 309);
  }

  ctx.fillStyle = mz.hasKey ? '#22c55e' : '#ef4444';
  ctx.fillRect(425, 45, 35, 40);
  ctx.fillStyle = '#ffffff'; ctx.font = '11px monospace'; ctx.fillText('EXIT', 428, 39);

  ctx.fillStyle = '#38bdf8'; ctx.fillRect(mz.x, mz.y, 24, 24);
  if (mz.won) {
    ctx.fillStyle = '#22c55e'; ctx.font = 'bold 22px monospace';
    ctx.fillText('ESCAPED! Press Restart', 110, 195);
  }

  renderLiveCodeLines(GAME_SOURCES.maze, exec, change);
  updateLiveVarWatch({ 'player.x': mz.x, 'player.y': mz.y, 'has_key': mz.hasKey ? 'True' : 'False', 'level_complete': mz.won ? 'True' : 'False' });
}

