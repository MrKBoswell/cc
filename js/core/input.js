/* ==================== GLOBAL KEYBOARD LISTENERS ==================== */
/** True when the person is typing in a box or using a slider / drop-down. */
function isTypingTarget(el) {
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
}
/** True when a button was reached with the Tab key (so Space should press it). */
function isKeyboardFocusedButton(el) {
  return !!el && el.tagName === 'BUTTON' && el.matches(':focus-visible');
}

/* After a mouse click, let go of the button so the Space bar goes to the game. */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn && e.detail > 0 && btn.closest('#view-games, #view-yourgames')) btn.blur();
});

window.addEventListener('keydown', (e) => {
  if (isTypingTarget(e.target)) return;
  if (e.code === 'Space' && isKeyboardFocusedButton(e.target)) return;
  if (activeView === 'workspace' && currentToolId === 'movement'
      && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
    e.preventDefault();
  }
  if (activeView === 'workspace' && currentToolId === 'movement') {
    moveState.keys[e.code] = true;
    updateDpadVisuals();
  }
  if (activeView === 'workspace' && currentToolId === 'gravity') {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') gravState.keys.left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') gravState.keys.right = true;
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault();
      triggerJump();
    }
  }
  if (activeView === 'games') {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
    setGameKey(e.code, true);
  }
  if (activeView === 'yourgames') {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyQ', 'KeyE'].includes(e.code)) {
      e.preventDefault();
    }
    setShowcaseKey(e.code, true);
  }
});

window.addEventListener('keyup', (e) => {
  if (activeView === 'workspace' && currentToolId === 'movement') {
    moveState.keys[e.code] = false;
    updateDpadVisuals();
  }
  if (activeView === 'workspace' && currentToolId === 'gravity') {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') gravState.keys.left = false;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') gravState.keys.right = false;
  }
  if (activeView === 'games') {
    setGameKey(e.code, false);
  }
  if (activeView === 'yourgames') {
    setShowcaseKey(e.code, false);
  }
});

