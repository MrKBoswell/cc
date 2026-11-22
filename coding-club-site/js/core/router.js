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

  const coreSec = document.getElementById('coreSectionLabel');
  const coreGrid = document.getElementById('coreCardsGrid');
  const gpSec = document.getElementById('gameplaySectionLabel');
  const gpGrid = document.getElementById('gameplayCardsGrid');

  if (category === 'all') {
    coreSec.style.display = 'flex'; coreGrid.style.display = 'grid';
    gpSec.style.display = 'flex'; gpGrid.style.display = 'grid';
  } else if (category === 'core') {
    coreSec.style.display = 'flex'; coreGrid.style.display = 'grid';
    gpSec.style.display = 'none'; gpGrid.style.display = 'none';
  } else {
    coreSec.style.display = 'none'; coreGrid.style.display = 'none';
    gpSec.style.display = 'flex'; gpGrid.style.display = 'grid';
  }
}

