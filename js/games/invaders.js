// 4. Space Invaders state
let inv = { shipX: 230, bullets: [], aliens: [], vx: 1.8, cooldown: 0, score: 0 };
function initInvaders() {
  inv = { shipX: 230, bullets: [], aliens: [], vx: 1.8, cooldown: 0, score: 0 };
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      inv.aliens.push({ x: 60 + c * 52, y: 40 + r * 36, w: 32, h: 22 });
    }
  }
}


/* --- Game 4: Space Invaders --- */
function stepInvaders(ctx) {
  const exec = [4, 6, 7]; const change = [7];
  if (inv.cooldown > 0) inv.cooldown--;

  if (gameKeys['ArrowLeft'] || gameKeys['KeyA']) { inv.shipX = Math.max(10, inv.shipX - 5); exec.push(0); change.push(0); }
  if (gameKeys['ArrowRight'] || gameKeys['KeyD']) { inv.shipX = Math.min(450, inv.shipX + 5); exec.push(1); change.push(1); }
  if (gameKeys['Space'] && inv.cooldown === 0) {
    inv.bullets.push({ x: inv.shipX + 18, y: 332 });
    inv.cooldown = 16;
    exec.push(2, 3); change.push(3);
  }

  if (inv.bullets.length) change.push(5);
  inv.bullets.forEach(b => b.y -= 8);
  inv.bullets = inv.bullets.filter(b => b.y > -10);

  let hitEdge = false;
  inv.aliens.forEach(a => {
    a.x += inv.vx;
    if (a.x <= 12 || a.x + a.w >= 488) hitEdge = true;
  });
  if (hitEdge) {
    inv.vx = -inv.vx;
    inv.aliens.forEach(a => a.y += 10);
  }

  for (let bi = inv.bullets.length - 1; bi >= 0; bi--) {
    const b = inv.bullets[bi];
    for (let ai = inv.aliens.length - 1; ai >= 0; ai--) {
      const a = inv.aliens[ai];
      if (b.x >= a.x && b.x <= a.x + a.w && b.y >= a.y && b.y <= a.y + a.h) {
        inv.aliens.splice(ai, 1);
        inv.bullets.splice(bi, 1);
        inv.score += 50;
        exec.push(8, 9, 10); change.push(8, 9, 10);
        break;
      }
    }
  }
  if (!inv.aliens.length) initInvaders();

  ctx.fillStyle = '#0b1018'; ctx.fillRect(0, 0, 500, 380);
  ctx.fillStyle = '#2dd4bf'; ctx.fillRect(inv.shipX, 340, 40, 20);
  ctx.fillStyle = '#f59e0b'; inv.bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 12));
  ctx.fillStyle = '#ef4444'; inv.aliens.forEach(a => ctx.fillRect(a.x, a.y, a.w, a.h));

  renderLiveCodeLines(GAME_SOURCES.invaders, exec, change);
  updateLiveVarWatch({ 'ship.x': inv.shipX, 'len(bullets)': inv.bullets.length, 'len(aliens)': inv.aliens.length, 'score': inv.score });
}

