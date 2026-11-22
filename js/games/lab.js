/* ==================== GAME LAB (8 GAMES + FULL CODE TOGGLE) ==================== */
let activeGame = 'pong';
let gameFrameCount = 0;
let prevGameVars = {};
let showFullGameCode = false;
const gameKeys = {};

function syncGamePadPressedVisuals() {
  document.querySelectorAll('#gameTouchControls [data-gkey]').forEach(btn => {
    const code = btn.dataset.gkey;
    let active = !!gameKeys[code];
    if (code === 'ArrowUp' && gameKeys['KeyW']) active = true;
    if (code === 'ArrowDown' && gameKeys['KeyS']) active = true;
    if (code === 'ArrowLeft' && gameKeys['KeyA']) active = true;
    if (code === 'ArrowRight' && gameKeys['KeyD']) active = true;
    btn.classList.toggle('pressed', active);
  });
}

function setGameKey(code, isDown) {
  gameKeys[code] = isDown;
  syncGamePadPressedVisuals();
  if (isDown && activeView === 'games') {
    if (activeGame === 'snake') handleSnakeInput(code);
    if (activeGame === 'tetris') handleTetrisInput(code);
  }
}

function toggleFullGameCode() {
  showFullGameCode = !showFullGameCode;
  const btn = document.getElementById('fullCodeToggleBtn');
  const copyBtn = document.getElementById('copyFullCodeBtn');
  const snippetEl = document.getElementById('liveCodeContainer');
  const fullEl = document.getElementById('fullGameCodeBlock');
  const headingEl = document.getElementById('codeBoxHeading');

  btn.classList.toggle('on', showFullGameCode);
  btn.textContent = showFullGameCode ? 'Show Live Snippet' : 'Show Full Code';
  copyBtn.style.display = showFullGameCode ? 'inline-block' : 'none';
  snippetEl.style.display = showFullGameCode ? 'none' : 'block';
  fullEl.style.display = showFullGameCode ? 'block' : 'none';
  headingEl.textContent = showFullGameCode ? 'Full Python Script' : 'Live Python Execution';
  updateFullGameCodeText();
}

function copyFullGameCode(btnEl) {
  const fullText = FULL_GAME_SCRIPTS[activeGame] || '';
  copyString(fullText, btnEl);
}


const FULL_SCRIPT_LINE_MAPS = {
  pong:      { 0:[19,20], 1:[21,22], 2:[25], 3:[26], 4:[28], 5:[29], 6:[30], 7:[31], 8:[32,33,34], 9:[35,36,37] },
  snake:     { 0:[29], 1:[34], 2:[35], 3:[36], 4:[36], 5:[37], 6:[38], 7:[30], 8:[31,32] },
  tetris:    { 0:[42], 1:[34,35], 2:[36,37], 3:[38], 4:[39], 5:[43], 6:[44,45], 7:[44], 8:[45] },
  invaders:  { 0:[22,23], 1:[24,25], 2:[26], 3:[27,28], 4:[30], 5:[31], 6:[35], 7:[36], 8:[38], 9:[39,40], 10:[41] },
  breakout:  { 0:[19,20], 1:[21,22], 2:[24], 3:[25], 4:[26], 5:[27], 6:[28], 7:[29], 8:[31], 9:[32], 10:[33], 11:[34], 12:[35] },
  flappy:    { 0:[18], 1:[19], 2:[21], 3:[22], 4:[23], 5:[25], 6:[28], 7:[28], 8:[25], 9:[26,27], 10:[32], 11:[33,34,35,36] },
  maze:      { 0:[23], 1:[25], 2:[26], 3:[27], 4:[28], 5:[30], 6:[31], 7:[32], 8:[33], 9:[34], 10:[35] },
  asteroids: { 0:[20,21], 1:[22,23], 2:[25], 3:[26], 4:[27], 5:[32], 6:[28,29,30,31], 7:[34], 8:[6,7,11] }
};

function renderFullScriptLines(gameId, execIdxList, changeIdxList) {
  const el = document.getElementById('fullGameCodeBlock');
  if (!el) return;
  const scriptLines = (FULL_GAME_SCRIPTS[gameId] || '').split('\n');
  const lineMap = FULL_SCRIPT_LINE_MAPS[gameId] || {};
  const fullExecSet = new Set([13, 39, 40, 41, 42, 43]);
  const fullChangeSet = new Set();

  execIdxList.forEach(idx => {
    (lineMap[idx] || []).forEach(fullLine => fullExecSet.add(fullLine));
  });
  changeIdxList.forEach(idx => {
    (lineMap[idx] || []).forEach(fullLine => fullChangeSet.add(fullLine));
  });

  el.innerHTML = scriptLines.map((ln, idx) => {
    let cls = 'live-line';
    if (fullChangeSet.has(idx)) cls += ' hl-change';
    else if (fullExecSet.has(idx)) cls += ' hl-exec';
    return `<div class="${cls}"><span class="live-line-num">${idx + 1}</span><span>${escapeHtml(ln)}</span></div>`;
  }).join('');
}

function updateFullGameCodeText() {
  renderFullScriptLines(activeGame, [], []);
}


function selectGame(gameId) {
  activeGame = gameId;
  prevGameVars = {};
  document.querySelectorAll('.game-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.game === gameId);
  });

  const meta = {
    pong:      { title: '1. Pong', help: '<strong>Controls:</strong> Left Paddle: <code>↑ / ↓</code>' },
    snake:     { title: '2. Snake', help: '<strong>Controls:</strong> Steer Snake: <code>Arrow Keys / WASD</code>' },
    tetris:    { title: '3. Tetris', help: '<strong>Controls:</strong> Move: <code>← / →</code> • Rotate: <code>↑ / Space</code> • Soft Drop: <code>↓</code>' },
    invaders:  { title: '4. Space Invaders', help: '<strong>Controls:</strong> Move Ship: <code>← / →</code> • Shoot Laser: <code>Spacebar</code>' },
    breakout:  { title: '5. Brick Breakout', help: '<strong>Controls:</strong> Move Paddle: <code>← / →</code>' },
    flappy:    { title: '6. Flappy Bird', help: '<strong>Controls:</strong> Flap Wings: <code>Spacebar / ↑</code>' },
    maze:      { title: '7. Maze Escape', help: '<strong>Controls:</strong> Move: <code>Arrow Keys / WASD</code> — Grab the yellow Key, then reach the green Exit!' },
    asteroids: { title: '8. Asteroid Dodger', help: '<strong>Controls:</strong> Dodge Falling Rocks: <code>← / →</code>' }
  };

  document.getElementById('liveGameTitle').textContent = meta[gameId].title;
  document.getElementById('liveGameControlsHelp').innerHTML = meta[gameId].help;
  renderLiveCodeLines(GAME_SOURCES[gameId], [], []);
  updateFullGameCodeText();
}

function restartActiveGame() {
  if (activeGame === 'pong') initPong();
  if (activeGame === 'snake') initSnake();
  if (activeGame === 'tetris') initTetris();
  if (activeGame === 'invaders') initInvaders();
  if (activeGame === 'breakout') initBreakout();
  if (activeGame === 'flappy') initFlappy();
  if (activeGame === 'maze') initMaze();
  if (activeGame === 'asteroids') initAsteroids();
}

function initGameIfNeeded() {
  if (!tet.piece) initTetris();
  if (!inv.aliens.length && inv.score === 0) initInvaders();
  if (!brk.bricks.length && brk.score === 0) initBreakout();
  if (!ast.rocks.length) initAsteroids();
  selectGame(activeGame);
}

function renderLiveCodeLines(lines, execIdxList, changeIdxList) {
  const cont = document.getElementById('liveCodeContainer');
  if (cont) {
    const execSet = new Set(execIdxList);
    const changeSet = new Set(changeIdxList);
    cont.innerHTML = lines.map((ln, idx) => {
      let cls = 'live-line';
      if (changeSet.has(idx)) cls += ' hl-change';
      else if (execSet.has(idx)) cls += ' hl-exec';
      return `<div class="${cls}"><span class="live-line-num">${idx + 1}</span><span>${escapeHtml(ln)}</span></div>`;
    }).join('');
  }
  if (showFullGameCode) {
    renderFullScriptLines(activeGame, execIdxList, changeIdxList);
  }
}

function updateLiveVarWatch(varsObj) {
  const grid = document.getElementById('liveVarWatchGrid');
  if (!grid) return;
  const changedKeys = [];
  Object.entries(varsObj).forEach(([k, v]) => {
    if (prevGameVars[k] !== undefined && prevGameVars[k] !== String(v)) {
      changedKeys.push(k);
    }
    prevGameVars[k] = String(v);
  });

  grid.innerHTML = Object.entries(varsObj).map(([k, v]) => {
    const isChanged = changedKeys.includes(k);
    return `<div class="var-watch-card ${isChanged ? 'var-changed' : ''}"><div class="var-watch-name">${escapeHtml(k)}</div><div class="var-watch-val">${escapeHtml(String(v))}</div></div>`;
  }).join('');
}

