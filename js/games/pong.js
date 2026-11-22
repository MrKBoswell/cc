// 1. Pong state
let pong = { p1Y: 150, p2Y: 150, bX: 250, bY: 190, bVx: 4, bVy: 3, s1: 0, s2: 0 };
function initPong() { pong = { p1Y: 150, p2Y: 150, bX: 250, bY: 190, bVx: 4, bVy: 3, s1: 0, s2: 0 }; }


/* --- Game 1: Pong --- */
function stepPong(ctx) {
  const exec = [2, 3, 4, 6]; const change = [2, 3];
  if (gameKeys['ArrowUp'] || gameKeys['KeyW']) { pong.p1Y = Math.max(10, pong.p1Y - 5); exec.push(0); change.push(0); }
  if (gameKeys['ArrowDown'] || gameKeys['KeyS']) { pong.p1Y = Math.min(300, pong.p1Y + 5); exec.push(1); change.push(1); }

  const targetY = pong.bY - 35;
  pong.p2Y += Math.sign(targetY - pong.p2Y) * 3.1;
  pong.p2Y = Math.max(10, Math.min(300, pong.p2Y));

  pong.bX += pong.bVx; pong.bY += pong.bVy;
  if (pong.bY <= 8 || pong.bY >= 372) { pong.bVy = -pong.bVy; exec.push(5); change.push(5); }

  const hitP1 = pong.bX - 8 <= 32 && pong.bX >= 18 && pong.bY >= pong.p1Y && pong.bY <= pong.p1Y + 70;
  const hitP2 = pong.bX + 8 >= 468 && pong.bX <= 482 && pong.bY >= pong.p2Y && pong.bY <= pong.p2Y + 70;
  if (hitP1 || hitP2) { pong.bVx = -pong.bVx; exec.push(7); change.push(7); }

  if (pong.bX < 0) { pong.s2++; pong.bX = 250; pong.bY = 190; pong.bVx = 4; exec.push(8); change.push(8); }
  if (pong.bX > 500) { pong.s1++; pong.bX = 250; pong.bY = 190; pong.bVx = -4; exec.push(9); change.push(9); }

  ctx.fillStyle = '#0b1018'; ctx.fillRect(0, 0, 500, 380);
  ctx.fillStyle = '#38bdf8'; ctx.fillRect(20, pong.p1Y, 12, 70);
  ctx.fillStyle = '#f59e0b'; ctx.fillRect(468, pong.p2Y, 12, 70);
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(pong.bX, pong.bY, 8, 0, Math.PI * 2); ctx.fill();

  renderLiveCodeLines(GAME_SOURCES.pong, exec, change);
  updateLiveVarWatch({ 'left_paddle.y': Math.round(pong.p1Y), 'ball.x': Math.round(pong.bX), 'ball_vx': pong.bVx, 'score_p1': pong.s1, 'score_p2': pong.s2 });
}

