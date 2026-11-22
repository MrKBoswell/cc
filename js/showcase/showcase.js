/* ==================== YOUR GAMES — FEATURED SHOWCASE (NEON JUMP) ==================== */
let activeShowcaseGame = 'neonjump';
const showcaseKeys = {};

function selectShowcaseGame(gameId) {
  activeShowcaseGame = 'neonjump';
  if (!neon || !neon.mode) initNeonJump();
  updateShowcaseUI();
}

function updateShowcaseUI() {
  const titleEl = document.getElementById('showcaseActiveTitle');
  if (titleEl) {
    titleEl.textContent = 'Neon Jump by Mr Boswell';
  }

  // const helpEl = document.getElementById('showcaseControlsHelp');
  // if (helpEl) {
  //   helpEl.innerHTML = '<strong>Neon Jump Controls:</strong> Jump / Fly / Gravity Flip with <code>Space</code> / <code>↑</code> / <code>Click</code> • Use Slot 1 with <code>Q</code> • Use Slot 2 with <code>E</code> • Quick Restart with <code>R</code> • Pause / Menu with <code>P</code> or <code>Esc</code>.';
  // }

  const infoEl = document.getElementById('showcaseInfoBody');
  if (infoEl) {
    infoEl.innerHTML = `
      <p><strong style="color:var(--text-main);">Creator:</strong> Mr Boswell (TBA Coding Club)</p>
      <p><strong style="color:var(--text-main);">Modes:</strong> 10 Unique Campaign Levels (each with a new twist!) + Endless Arcade Mode + Pre-Run Score Shop saved in your browser.</p>
      <p><strong style="color:var(--text-main);">Inventory Rules:</strong> Collect gold <code>?</code> Mystery Boxes to fill Slot <code>Q</code> first, then Slot <code>E</code>. If both slots are full, gold <code>?</code> boxes stay on the track until you spend a slot!</p>
    `;
  }

  updateNeonCodeSnippet();
}

function updateNeonCodeSnippet() {
  const snipEl = document.getElementById('showcaseCodeSnippet');
  if (!snipEl || typeof neon === 'undefined') return;
  const qName = neon.slots && neon.slots[0] ? neon.slots[0].toUpperCase() : 'EMPTY';
  const eName = neon.slots && neon.slots[1] ? neon.slots[1].toUpperCase() : 'EMPTY';
  snipEl.textContent = [
    '# Neon Jump (Geometry Dash Edition) — Mr Boswell',
    `mode = "${neon.mode}"   # level = ${neon.levelIdx + 1}/10`,
    `banked_score = ${neon.bankedScore}   # Saved in localStorage`,
    `run_score = ${Math.floor(neon.runScore)}`,
    `inventory = ["${qName}", "${eName}"]   # [Q, E]`,
    '',
    'if len(inventory) < 2 and player.colliderect(mystery_box):',
    '    inventory.append(roll_mario_powerup())',
    'if keys[pygame.K_q]: use_slot(0)',
    'if keys[pygame.K_e]: use_slot(1)'
  ].join('\n');
}

function handleShowcaseExtraAction() {
  if (typeof openNeonMenu === 'function') {
    openNeonMenu();
    updateShowcaseUI();
  }
}

function restartShowcaseGame() {
  if (typeof restartNeonRun === 'function') {
    restartNeonRun();
  } else {
    initNeonJump();
  }
  updateShowcaseUI();
}

function setShowcaseKey(code, isDown) {
  showcaseKeys[code] = isDown;
  document.querySelectorAll('#showcaseTouchControls [data-skey]').forEach(btn => {
    if (btn.dataset.skey === code) {
      btn.classList.toggle('pressed', !!isDown);
    }
  });
  if (isDown && activeView === 'yourgames') {
    if (typeof handleNeonKeyDown === 'function') {
      handleNeonKeyDown(code);
    }
  }
}

function stepShowcaseCanvas() {
  if (activeView !== 'yourgames') return;
  const canvas = document.getElementById('showcaseCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!neon || !neon.initialized) initNeonJump();
  stepNeonJumpShowcase(ctx);
}
