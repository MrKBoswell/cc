/* ==================== THEME (LIGHT/DARK + 10 PALETTES) & ACCESSIBILITY ==================== */
function toggleMode() {
  const html = document.documentElement;
  const current = html.getAttribute('data-mode');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-mode', next);
  document.getElementById('modeIcon').textContent = next === 'dark' ? '☀️' : '🌙';
  document.getElementById('modeLabel').textContent = next === 'dark' ? 'Light' : 'Dark';
  store.set('mode', next);
  refreshThemeColours();
  drawGridCanvas();
  drawInspectorCanvas();
  drawAimCanvas();
}

function selectPalette(paletteId) {
  document.documentElement.setAttribute('data-palette', paletteId);
  const dd = document.getElementById('themeDropdown');
  if (dd && dd.value !== paletteId) dd.value = paletteId;
  store.set('palette', paletteId);
  refreshThemeColours();
  drawGridCanvas();
  drawInspectorCanvas();
  drawAimCanvas();
}


/** Puts back the mode and colour theme this browser chose last time. */
function loadSavedTheme() {
  const mode = store.get('mode');
  if ((mode === 'dark' || mode === 'light') && mode !== document.documentElement.getAttribute('data-mode')) {
    toggleMode();
    store.set('mode', mode);
  }
  const palette = store.get('palette');
  if (palette && document.querySelector('#themeDropdown option[value="' + palette + '"]')) selectPalette(palette);
  refreshThemeColours();
}
