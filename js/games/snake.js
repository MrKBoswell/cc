// 2. Snake state
let snk = { body: [{x:10,y:9},{x:9,y:9},{x:8,y:9}], dx: 1, dy: 0, food: {x:16,y:9}, tick: 0 };
function initSnake() { snk = { body: [{x:10,y:9},{x:9,y:9},{x:8,y:9}], dx: 1, dy: 0, food: {x:16,y:9}, tick: 0 }; }
function handleSnakeInput(code) {
  if ((code === 'ArrowUp' || code === 'KeyW') && snk.dy !== 1) { snk.dx = 0; snk.dy = -1; }
  if ((code === 'ArrowDown' || code === 'KeyS') && snk.dy !== -1) { snk.dx = 0; snk.dy = 1; }
  if ((code === 'ArrowLeft' || code === 'KeyA') && snk.dx !== 1) { snk.dx = -1; snk.dy = 0; }
  if ((code === 'ArrowRight' || code === 'KeyD') && snk.dx !== -1) { snk.dx = 1; snk.dy = 0; }
}


/* --- Game 2: Snake --- */
function stepSnake(ctx) {
  snk.tick++;
  const exec = [0, 1, 2, 7]; const change = [];
  if (snk.tick % 8 === 0) {
    const head = { x: snk.body[0].x + snk.dx, y: snk.body[0].y + snk.dy };
    const hitSelf = snk.body.some(s => s.x === head.x && s.y === head.y);
    if (head.x < 0 || head.x >= 25 || head.y < 0 || head.y >= 19 || hitSelf) {
      initSnake();
      exec.push(8); change.push(8);
    } else {
      snk.body.unshift(head);
      change.push(0, 1);
      if (head.x === snk.food.x && head.y === snk.food.y) {
        snk.food = { x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 19) };
        exec.push(3, 4); change.push(3, 4);
      } else {
        snk.body.pop();
        exec.push(5, 6); change.push(6);
      }
    }
  }

  ctx.fillStyle = '#0b1018'; ctx.fillRect(0, 0, 500, 380);
  ctx.fillStyle = '#ef4444'; ctx.fillRect(snk.food.x * 20 + 2, snk.food.y * 20 + 2, 16, 16);
  snk.body.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? '#2dd4bf' : '#22c55e';
    ctx.fillRect(seg.x * 20 + 1, seg.y * 20 + 1, 18, 18);
  });
  ctx.fillStyle = '#f8fafc'; ctx.font = 'bold 14px monospace';
  ctx.fillText(`Length: ${snk.body.length}`, 14, 24);

  if (snk.tick % 8 === 0) {
    renderLiveCodeLines(GAME_SOURCES.snake, exec, change);
    updateLiveVarWatch({ 'length': snk.body.length, 'head': `(${snk.body[0].x}, ${snk.body[0].y})`, 'food': `(${snk.food.x}, ${snk.food.y})` });
  }
}

