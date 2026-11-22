function copyRawText(elementId, btnEl) {
  const text = document.getElementById(elementId).innerText;
  copyString(text, btnEl);
}

function copyString(text, btnEl) {
  const done = () => {
    if (!btnEl) return;
    const orig = btnEl.textContent;
    btnEl.textContent = 'Copied!';
    setTimeout(() => { btnEl.textContent = orig; }, 1400);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  if (cb) cb();
}


function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}


/* ---------- Saved settings (this browser only) ---------- */
const store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem('tba:' + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('tba:' + key, JSON.stringify(value)); } catch (e) { /* storage blocked: ignore */ }
  }
};

/* The canvas background colour. Saved once, so the page does not ask the
   browser for it 60 times a second. Call refreshThemeColours() after a theme change. */
let canvasBgColour = '#0b1018';
function refreshThemeColours() {
  canvasBgColour = getComputedStyle(document.documentElement).getPropertyValue('--canvas-bg').trim() || '#0b1018';
}
