/* ==================== MAIN ANIMATION LOOP ==================== */
function mainLoop(now) {
  if (activeView === 'workspace' && currentToolId === 'movement') {
    const k = moveState.keys;
    let dx = 0, dy = 0;
    if (k['ArrowLeft'] || k['KeyA']) dx -= moveState.speed;
    if (k['ArrowRight'] || k['KeyD']) dx += moveState.speed;
    if (k['ArrowUp'] || k['KeyW']) dy -= moveState.speed;
    if (k['ArrowDown'] || k['KeyS']) dy += moveState.speed;

    moveState.x += dx; moveState.y += dy;
    let hitWall = '';
    if (moveState.clamp) {
      if (moveState.x < 0) { moveState.x = 0; hitWall = 'LEFT'; }
      if (moveState.x > 400 - moveState.size) { moveState.x = 400 - moveState.size; hitWall = 'RIGHT'; }
      if (moveState.y < 0) { moveState.y = 0; hitWall = 'TOP'; }
      if (moveState.y > 300 - moveState.size) { moveState.y = 300 - moveState.size; hitWall = 'BOTTOM'; }
    }
    document.getElementById('movePosReadout').textContent = `X: ${Math.round(moveState.x)}, Y: ${Math.round(moveState.y)}`;
    drawMoveCanvas(hitWall);
  }

  if (activeView === 'workspace' && currentToolId === 'gravity') {
    if (gravState.keys.left) gravState.x = Math.max(0, gravState.x - gravState.speedX);
    if (gravState.keys.right) gravState.x = Math.min(520 - gravState.size, gravState.x + gravState.speedX);

    if (!gravState.onGround || gravState.vy < 0) {
      gravState.vy += gravState.gravity;
      gravState.y += gravState.vy;
      if (gravState.y + gravState.size >= gravState.groundY) {
        gravState.y = gravState.groundY - gravState.size;
        gravState.vy = 0;
        gravState.onGround = true;
      }
    }
    drawGravityCanvas();
  }

  if (activeView === 'workspace' && currentToolId === 'patrol') {
    stepAndDrawPatrol(now);
  }

  if (activeView === 'games') {
    gameFrameCount++;
    document.getElementById('liveTickCounter').textContent = `Frame: ${gameFrameCount}`;
    const canvas = document.getElementById('liveGameCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (activeGame === 'pong') stepPong(ctx);
      else if (activeGame === 'snake') stepSnake(ctx);
      else if (activeGame === 'tetris') stepTetris(ctx);
      else if (activeGame === 'invaders') stepInvaders(ctx);
      else if (activeGame === 'breakout') stepBreakout(ctx);
      else if (activeGame === 'flappy') stepFlappy(ctx);
      else if (activeGame === 'maze') stepMaze(ctx);
      else if (activeGame === 'asteroids') stepAsteroids(ctx);
    }
  }

  if (activeView === 'yourgames') {
    stepShowcaseCanvas();
  }

  stepHomeMiniTools(now);
  stepHomeMiniGames();
  stepHomeMiniLearn(now);
  requestAnimationFrame(mainLoop);
}

