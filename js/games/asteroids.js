// 8. Asteroid Dodger state
let ast = { shipX: 235, rocks: [], dodged: 0 };
function makeRandomRock(yMin = -360, yMax = -20) {
  return {
    x: 28 + Math.random() * 444,
    y: yMin + Math.random() * (yMax - yMin),
    r: 12 + Math.random() * 9,
    spd: 2.5 + Math.random() * 3.0
  };
}
function initAsteroids() {
  ast = { shipX: 235, rocks: [], dodged: 0 };
  for (let i = 0; i < 6; i++) {
    ast.rocks.push(makeRandomRock(-380, -25));
  }
}


/* --- Game 8: Asteroid Dodger --- */
function stepAsteroids(ctx) {
  const exec = [2, 3, 7]; const change = [3];

  if (gameKeys['ArrowLeft'] || gameKeys['KeyA']) { ast.shipX = Math.max(10, ast.shipX - 6); exec.push(0); change.push(0); }
  if (gameKeys['ArrowRight'] || gameKeys['KeyD']) { ast.shipX = Math.min(460, ast.shipX + 6); exec.push(1); change.push(1); }

  let resetNow = false;
  for (let i = 0; i < ast.rocks.length; i++) {
    const r = ast.rocks[i];
    r.y += r.spd;
    if (r.y - r.r > 380) {
      ast.dodged += 1;
      ast.rocks[i] = makeRandomRock(-130, -25);
      exec.push(5, 6); change.push(5, 6);
    }
    const rockBoxX = r.x - r.r, rockBoxY = r.y - r.r, rockBoxSize = r.r * 2;
    if (rockBoxX < ast.shipX + 30 && rockBoxX + rockBoxSize > ast.shipX && rockBoxY < 365 && rockBoxY + rockBoxSize > 335) {
      resetNow = true;
      exec.push(8); change.push(8);
      break;
    }
  }
  if (resetNow) initAsteroids();

  ctx.fillStyle = '#0b1018'; ctx.fillRect(0, 0, 500, 380);
  ctx.fillStyle = '#2dd4bf'; ctx.fillRect(ast.shipX, 335, 30, 30);
  ctx.fillStyle = '#94a3b8';
  ast.rocks.forEach(r => { ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.fill(); });

  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(365, 10, 125, 28);
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(365, 10, 125, 28);
  ctx.fillStyle = '#2dd4bf';
  ctx.font = 'bold 14px monospace';
  ctx.fillText(`Score: ${ast.dodged}`, 375, 29);

  renderLiveCodeLines(GAME_SOURCES.asteroids, exec, change);
  updateLiveVarWatch({ 'dodged': ast.dodged, 'ship.x': ast.shipX, 'rocks': ast.rocks.length });
}

