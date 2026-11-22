/* ==================== YOUR GAMES — STUDENT SHOWCASE (MINI CHESS & NEON JUMP) ==================== */
let activeShowcaseGame = 'minichess';
const showcaseKeys = {};


function selectShowcaseGame(gameId) {
  activeShowcaseGame = gameId;
  document.getElementById('showcase-card-minichess').classList.toggle('active', gameId === 'minichess');
  document.getElementById('showcase-card-neonjump').classList.toggle('active', gameId === 'neonjump');
  if (gameId === 'minichess' && !mchess.board.length) initMiniChess();
  if (gameId === 'neonjump' && !neon.obstacles.length) initNeonJump();
  updateShowcaseUI();
}

function updateShowcaseUI() {
  const isChess = activeShowcaseGame === 'minichess';
  document.getElementById('showcaseActiveTitle').textContent = isChess
    ? 'Mini Chess (6×6 Chess360) — By Mr Boswell'
    : 'Neon Jump (Power-Up Runner) — By Mr Boswell';

  const extraBtn = document.getElementById('showcaseExtraBtn');
  extraBtn.textContent = isChess ? 'Shuffle back row' : 'Switch Board Style';
  extraBtn.style.display = isChess ? 'inline-block' : 'none';

  document.getElementById('showcaseControlsHelp').innerHTML = isChess
    ? '<strong>Mini Chess Controls:</strong> Click squares to select &amp; move pieces, or move cursor with <code>Arrow Keys</code> + <code>Space</code>. Click <strong>Randomize 360 Rank</strong> to shuffle the back rank.'
    : '<strong>Neon Jump Controls:</strong> Jump with <code>Space</code> / <code>↑</code> • Activate Boost with <code>Q</code> • Activate Shield with <code>E</code> • Nudge left/right with <code>← / →</code>.';

  document.getElementById('showcaseInfoBody').innerHTML = isChess
    ? `<p><strong style="color:var(--text-main);">Creator:</strong> Mr Boswell (TBA Coding Club)</p>
       <p><strong style="color:var(--text-main);">Mode:</strong> 6×6 Mini Chess with randomized Chess360 back ranks, move counter, and turn tracking.</p>`
    : `<p><strong style="color:var(--text-main);">Creator:</strong> Mr Boswell (TBA Coding Club)</p>
       <p><strong style="color:var(--text-main);">Mode:</strong> Neon rhythm-style obstacle runner with jump physics, <code>Q</code> speed/hop boost, and <code>E</code> spike shield.</p>`;

  document.getElementById('showcaseCodeSnippet').textContent = isChess
    ? [
        '# Mini Chess (6x6 Chess360) — Mr Boswell',
        'BACK_RANK = ["r", "n", "b", "q", "k", "r"]',
        'random.shuffle(BACK_RANK)',
        `turn = "${mchess.turn}"`,
        `moves = ${mchess.moves}`
      ].join('\n')
    : [
        '# Neon Jump — Mr Boswell',
        `score = ${neon.score}`,
        `q_boost_charges = ${neon.qCharges}   # Key Q`,
        `e_shield_charges = ${neon.eCharges}  # Key E`,
        'if keys[pygame.K_q]: activate_boost()',
        'if keys[pygame.K_e]: activate_shield()'
      ].join('\n');
}

function handleShowcaseExtraAction() {
  if (activeShowcaseGame === 'minichess') {
    initMiniChess();
    updateShowcaseUI();
  }
}

function restartShowcaseGame() {
  if (activeShowcaseGame === 'minichess') initMiniChess();
  else initNeonJump();
  updateShowcaseUI();
}

function setShowcaseKey(code, isDown) {
  showcaseKeys[code] = isDown;
  document.querySelectorAll('#showcaseTouchControls [data-skey]').forEach(btn => {
    if (btn.dataset.skey === code) {
      btn.classList.toggle('pressed', !!isDown);
    }
  });
  if (isDown && activeView === 'yourgames' && activeShowcaseGame === 'minichess') {
    if (code === 'ArrowUp' || code === 'KeyW') mchess.cursor.r = Math.max(0, mchess.cursor.r - 1);
    if (code === 'ArrowDown' || code === 'KeyS') mchess.cursor.r = Math.min(5, mchess.cursor.r + 1);
    if (code === 'ArrowLeft' || code === 'KeyA') mchess.cursor.c = Math.max(0, mchess.cursor.c - 1);
    if (code === 'ArrowRight' || code === 'KeyD') mchess.cursor.c = Math.min(5, mchess.cursor.c + 1);
    if (code === 'Space') handleMiniChessSquare(mchess.cursor.r, mchess.cursor.c);
  }
}

function stepShowcaseCanvas() {
  if (activeView !== 'yourgames') return;
  const canvas = document.getElementById('showcaseCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (activeShowcaseGame === 'minichess') {
    if (!mchess.board.length) initMiniChess();
    stepMiniChessShowcase(ctx);
  } else {
    if (!neon.obstacles.length) initNeonJump();
    stepNeonJumpShowcase(ctx);
  }
}

