// 5. Breakout state
let brk = { padX: 205, bX: 250, bY: 260, bVx: 3.5, bVy: -3.5, bricks: [], score: 0 };
function initBreakout() {
  brk = { padX: 205, bX: 250, bY: 260, bVx: 3.5, bVy: -3.5, bricks: [], score: 0 };
  const colors = ['#ef4444', '#f59e0b', '#2dd4bf', '#38bdf8'];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 8; c++) {
      brk.bricks.push({ x: 22 + c * 58, y: 35 + r * 24, w: 52, h: 16, color: colors[r] });
    }
  }
}


/* --- Game 5: Brick Breakout --- */
function stepBreakout(ctx) {
  const exec = [2, 3, 4, 6, 8]; const change = [2, 3];
  if (gameKeys['ArrowLeft'] || gameKeys['KeyA']) { brk.padX = Math.max(0, brk.padX - 6); exec.push(0); change.push(0); }
  if (gameKeys['ArrowRight'] || gameKeys['KeyD']) { brk.padX = Math.min(410, brk.padX + 6); exec.push(1); change.push(1); }

  brk.bX += brk.bVx;
  brk.bY += brk.bVy;

  if (brk.bX - 7 <= 0 || brk.bX + 7 >= 500) { brk.bVx = -brk.bVx; exec.push(5); change.push(5); }
  const hitPad = brk.bY + 7 >= 344 && brk.bY - 7 <= 358 && brk.bX >= brk.padX && brk.bX <= brk.padX + 90;
  if (brk.bY - 7 <= 0 || hitPad) { brk.bVy = -brk.bVy; exec.push(7); change.push(7); }

  for (let i = brk.bricks.length - 1; i >= 0; i--) {
    const br = brk.bricks[i];
    if (brk.bX + 7 > br.x && brk.bX - 7 < br.x + br.w && brk.bY + 7 > br.y && brk.bY - 7 < br.y + br.h) {
      brk.bricks.splice(i, 1);
      brk.bVy = -brk.bVy;
      brk.score += 10;
      exec.push(9, 10, 11, 12); change.push(9, 10, 11, 12);
      break;
    }
  }
  if (brk.bY > 390 || !brk.bricks.length) initBreakout();

  ctx.fillStyle = '#0b1018'; ctx.fillRect(0, 0, 500, 380);
  brk.bricks.forEach(br => { ctx.fillStyle = br.color; ctx.fillRect(br.x, br.y, br.w, br.h); });
  ctx.fillStyle = '#38bdf8'; ctx.fillRect(brk.padX, 345, 90, 14);
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(brk.bX, brk.bY, 7, 0, Math.PI * 2); ctx.fill();

  renderLiveCodeLines(GAME_SOURCES.breakout, exec, change);
  updateLiveVarWatch({ 'ball.x': Math.round(brk.bX), 'ball.y': Math.round(brk.bY), 'ball_vy': brk.bVy, 'len(bricks)': brk.bricks.length, 'score': brk.score });
}

