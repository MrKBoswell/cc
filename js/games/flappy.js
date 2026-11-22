// 6. Flappy Bird state
let flp = { y: 170, vy: 0, pipeX: 460, gapY: 165, score: 0, scoredPipe: false, flapCooldown: 0 };
function initFlappy() { flp = { y: 170, vy: 0, pipeX: 460, gapY: 165, score: 0, scoredPipe: false, flapCooldown: 0 }; }


/* --- Game 6: Flappy Bird --- */
function stepFlappy(ctx) {
  const exec = [0, 2, 3, 4, 5, 8]; const change = [2, 3, 4];
  if (flp.flapCooldown > 0) flp.flapCooldown--;

  if ((gameKeys['Space'] || gameKeys['ArrowUp']) && flp.flapCooldown === 0) {
    flp.vy = -7.2;
    flp.flapCooldown = 10;
    change.push(1);
  }
  flp.vy += 0.42;
  flp.y += flp.vy;
  flp.pipeX -= 3.5;

  if (!flp.scoredPipe && flp.pipeX + 50 < 110) {
    flp.score += 1;
    flp.scoredPipe = true;
    exec.push(6, 7); change.push(6, 7);
  }

  if (flp.pipeX < -50) {
    flp.pipeX = 500;
    flp.gapY = 95 + Math.floor(Math.random() * 170);
    flp.scoredPipe = false;
    exec.push(9); change.push(9);
  }

  const inPipeX = 110 + 26 > flp.pipeX && 110 < flp.pipeX + 50;
  const hitPipe = inPipeX && (flp.y < flp.gapY - 58 || flp.y + 24 > flp.gapY + 58);
  if (hitPipe || flp.y < 0 || flp.y > 365) {
    initFlappy();
    exec.push(11); change.push(11);
  }

  ctx.fillStyle = '#0b1018'; ctx.fillRect(0, 0, 500, 380);
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(flp.pipeX, 0, 50, flp.gapY - 58);
  ctx.fillRect(flp.pipeX, flp.gapY + 58, 50, 380 - (flp.gapY + 58));
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(110, flp.y, 26, 24);
  ctx.fillStyle = '#f8fafc'; ctx.font = 'bold 15px monospace';
  ctx.fillText(`Score: ${flp.score}`, 14, 24);

  renderLiveCodeLines(GAME_SOURCES.flappy, exec, change);
  updateLiveVarWatch({ 'score': flp.score, 'bird.y': Math.round(flp.y), 'vy': flp.vy.toFixed(1), 'pipe_x': Math.round(flp.pipeX) });
}

