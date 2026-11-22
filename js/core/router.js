/* ==================== NAVIGATION & SEARCH ==================== */
let activeView = 'home';

function navigateTo(viewName) {
  activeView = viewName;
  document.querySelectorAll('.subview').forEach(el => el.classList.remove('active'));
  document.getElementById('view-workspace').classList.remove('active');
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === viewName);
  });
  const target = document.getElementById('view-' + viewName);
  if (target) target.classList.add('active');
  if (viewName === 'games') {
    initGameIfNeeded();
  }
  if (viewName === 'yourgames') {
    updateShowcaseUI();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterTools(category, btnEl) {
  document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  document.querySelectorAll('#toolsColumnStack .tool-card').forEach(card => {
    if (category === 'all' || card.dataset.cat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}
