function onLayoutReady() {
  document.getElementById('heroTitle').textContent = t(I18N.home.heroTitle);
  document.getElementById('heroText').textContent = t(I18N.home.heroText);
  document.getElementById('heroCta').textContent = t(I18N.home.heroCta);

  document.getElementById('dealsTitle').textContent = t(I18N.home.dealsTitle);
  document.getElementById('announceTitle').textContent = t(I18N.home.announceTitle);
  document.getElementById('newTitle').textContent = t(I18N.home.newTitle);
  document.getElementById('topTitle').textContent = t(I18N.home.topTitle);
  document.getElementById('bannersTitle').textContent = t(I18N.home.bannersTitle);

  renderDeals();
  renderAnnouncements();
  renderNewGames();
  renderTopGames();
  renderBanners();
}

function renderDeals() {
  const deals = GAMES.filter(g => g.discount > 0);
  document.getElementById('dealsRow').innerHTML = deals.map(g => `
    <div class="col-md-4">
      <div class="deal-card">
        <span class="badge-pct">-${g.discount}%</span>
        <h3 class="h5">${t(g.name)}</h3>
        <p class="mb-1">${t(g.shortDesc)}</p>
        <p class="mono mb-2"><span style="text-decoration:line-through;color:var(--ink-soft);">${formatPrice(g.price)}</span>
          &nbsp;→&nbsp; <strong>${formatPrice(Math.round(g.price * (1 - g.discount / 100)))}</strong></p>
        <a href="game.html?id=${g.id}" class="btn btn-g4y-outline btn-sm">${t(I18N.catalog.viewGame)}</a>
      </div>
    </div>`).join('');
}

function renderAnnouncements() {
  document.getElementById('announceRow').innerHTML = ANNOUNCEMENTS.map(a => `
    <div class="col-md-4">
      <div class="announce-card">
        <div class="date">${t(a.date)}</div>
        <h3 class="h5 mt-1">${t(a.title)}</h3>
        <p class="mb-0">${t(a.text)}</p>
      </div>
    </div>`).join('');
}

function renderNewGames() {
  const list = GAMES.filter(g => g.isNew);
  document.getElementById('newRow').innerHTML = list.map(gameBoxCardHtml).join('');
}

function renderTopGames() {
  const top = [...GAMES].sort((a, b) => getAverageRating(b) - getAverageRating(a)).slice(0, 3);
  document.getElementById('topRow').innerHTML = top.map(gameBoxCardHtml).join('');
}

function renderBanners() {
  const banners = [
    { name: 'BoardGameGuild.org', href: 'https://www.bgg-example.org' },
    { name: 'Tabletop Federation', href: 'https://www.tabletopfed-example.org' },
    { name: 'PlayMeet Belgrade', href: 'https://www.playmeet-example.org' },
    { name: 'Games4You Tournaments', href: 'https://www.g4y-tournaments-example.org' }
  ];
  document.getElementById('bannersRow').innerHTML = banners.map(b => `
    <div class="col-6 col-md-3">
      <a class="partner-banner" href="${b.href}" target="_blank" rel="noopener">${b.name}</a>
    </div>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout({
    active: 'home',
    crumbs: [{ label: I18N.breadcrumbHome }],
    titleKey: I18N.nav.home
  });
});
