const a11yState = {
  'invert': false,
  'large-text': false,
  'dyslexic': false,
  'high-contrast': false,
  'reduce-motion': false,
  'focus-rings': false
};

function toggleA11yMenu() {
  document.getElementById('a11yDropdown').classList.toggle('open');
}

function setA11yOption(opt, isOn, save = true) {
  a11yState[opt] = isOn;
  // "reduce-motion" also needs a class so CSS (like the blinking logo cursor) can stop moving.
  document.documentElement.classList.toggle('a11y-' + opt, isOn);
  const btn = document.getElementById('a11y-' + opt);
  const badge = document.getElementById('badge-' + opt);
  if (btn) btn.classList.toggle('active', isOn);
  if (badge) badge.textContent = isOn ? 'ON' : 'OFF';
  if (save) store.set('a11y', Object.assign({}, a11yState));
}

function toggleA11yOption(opt) {
  setA11yOption(opt, !a11yState[opt]);
}

/** Puts back saved settings. If nothing is saved and the computer asks for
 *  "reduce motion", the moving previews start paused. */
function loadSavedA11y() {
  const saved = store.get('a11y', null);
  const osReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  Object.keys(a11yState).forEach(opt => {
    let on = saved ? !!saved[opt] : false;
    if (opt === 'reduce-motion' && !saved && osReduce) on = true;
    if (on) setA11yOption(opt, true, false);
  });
}

document.addEventListener('click', (e) => {
  const wrap = document.getElementById('a11yWrapper');
  const dd = document.getElementById('a11yDropdown');
  if (wrap && dd && !wrap.contains(e.target)) {
    dd.classList.remove('open');
  }
});


/* Esc closes the accessibility menu. */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const dd = document.getElementById('a11yDropdown');
    if (dd) dd.classList.remove('open');
  }
});
