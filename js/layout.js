const LOGO_SVG = `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="4" y="4" width="40" height="40" rx="8" fill="#B23A2E"/>
  <rect x="4" y="4" width="40" height="40" rx="8" fill="none" stroke="#C9A227" stroke-width="2"/>
  <circle cx="16" cy="16" r="3" fill="#F6EFE3"/>
  <circle cx="32" cy="16" r="3" fill="#F6EFE3"/>
  <circle cx="24" cy="24" r="3" fill="#F6EFE3"/>
  <circle cx="16" cy="32" r="3" fill="#F6EFE3"/>
  <circle cx="32" cy="32" r="3" fill="#F6EFE3"/>
</svg>`;

function buildHeader(active) {
  const lang = getLang();
  return `
  <header class="site-header">
    <div class="topbar">
      <a href="index.html" class="brand">${LOGO_SVG}<span>${t(I18N.siteName)}</span></a>
      <div class="d-flex align-items-center gap-2">
        <div class="lang-switch" role="group" aria-label="Language">
          <button type="button" data-lang="sr" class="${lang === 'sr' ? 'active' : ''}">SR</button>
          <button type="button" data-lang="en" class="${lang === 'en' ? 'active' : ''}">EN</button>
        </div>
        <button type="button" class="mobile-nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
    <nav class="main-nav">
      <div class="nav-inner" id="navInner">
        <ul>
          <li class="${active === 'home' ? 'active' : ''}"><a href="index.html">${t(I18N.nav.home)}</a></li>
          <li class="${active === 'gallery' ? 'active' : ''}">
            <button type="button" class="nav-link-btn">${t(I18N.nav.gallery)} ▾</button>
            <div class="dropdown-panel">
              <a href="gallery.html#store">${t(I18N.navSub.galleryStore)}</a>
              <a href="gallery.html#games">${t(I18N.navSub.galleryGames)}</a>
              <a href="gallery.html#videos">${t(I18N.navSub.galleryVideos)}</a>
            </div>
          </li>
          <li class="${active === 'catalog' ? 'active' : ''}">
            <button type="button" class="nav-link-btn">${t(I18N.nav.catalog)} ▾</button>
            <div class="dropdown-panel">
              <a href="catalog.html?group=family">${t(I18N.navSub.catFamily)}</a>
              <a href="catalog.html?group=strategy">${t(I18N.navSub.catStrategy)}</a>
              <a href="catalog.html?group=party">${t(I18N.navSub.catParty)}</a>
              <a href="catalog.html">${t(I18N.nav.catalog)}</a>
            </div>
          </li>
          <li class="${active === 'account' ? 'active' : ''}"><a href="account.html">${t(I18N.nav.account)}</a></li>
          <li class="${active === 'about' ? 'active' : ''}"><a href="about.html">${t(I18N.nav.about)}</a></li>
        </ul>
      </div>
    </nav>
  </header>`;
}

function buildBreadcrumbs(crumbs) {
  const parts = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    if (isLast || !c.href) {
      return `<span class="current" aria-current="page">${t(c.label)}</span>`;
    }
    return `<a href="${c.href}">${t(c.label)}</a>`;
  });
  return `
  <div class="breadcrumb-bar">
    <div class="breadcrumb">${parts.join('<span class="sep">›</span>')}</div>
  </div>`;
}

function buildFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <h4>${t(I18N.siteName)}</h4>
        <p style="max-width:34ch;">${getLang() === 'sr'
          ? 'Продавница друштвених игара која окупља људе око стола, у Земуну.'
          : 'A board game shop bringing people together at the table, in Zemun.'}</p>
      </div>
      <div>
        <h4>${t(I18N.footer.linksTitle)}</h4>
        <ul>
          <li><a href="index.html">${t(I18N.nav.home)}</a></li>
          <li><a href="catalog.html">${t(I18N.nav.catalog)}</a></li>
          <li><a href="gallery.html">${t(I18N.nav.gallery)}</a></li>
          <li><a href="about.html">${t(I18N.nav.about)}</a></li>
        </ul>
      </div>
      <div>
        <h4>${t(I18N.footer.followTitle)}</h4>
        <ul>
          <li><a href="https://www.bgg-example.org" target="_blank" rel="noopener">BoardGameGuild.org</a></li>
          <li><a href="https://www.tabletopfed-example.org" target="_blank" rel="noopener">Tabletop Federation</a></li>
          <li><a href="https://www.playmeet-example.org" target="_blank" rel="noopener">PlayMeet Belgrade</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">${t(I18N.footer.copyright)}</div>
  </footer>`;
}

function initLayout(opts) {
  document.title = `${t(I18N.siteName)} — ${t(opts.titleKey)}`;
  document.documentElement.lang = getLang();

  const headerMount = document.getElementById('site-header');
  const crumbMount = document.getElementById('site-breadcrumbs');
  const footerMount = document.getElementById('site-footer');

  if (headerMount) headerMount.innerHTML = buildHeader(opts.active);
  if (crumbMount && opts.crumbs) crumbMount.innerHTML = buildBreadcrumbs(opts.crumbs);
  if (footerMount) footerMount.innerHTML = buildFooter();

  // language switch
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
      location.reload();
    });
  });

  // mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const navInner = document.getElementById('navInner');
  if (toggle && navInner) {
    toggle.addEventListener('click', () => {
      const open = navInner.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // mobile dropdown taps
    navInner.querySelectorAll('.nav-link-btn').forEach(b => {
      b.addEventListener('click', (e) => {
        if (window.innerWidth <= 767) {
          e.currentTarget.nextElementSibling.classList.toggle('open');
        }
      });
    });
  }

  if (typeof onLayoutReady === 'function') onLayoutReady();
}

function formatPrice(rsd) {
  return rsd.toLocaleString(getLang() === 'sr' ? 'sr-RS' : 'en-US') + ' ' + t(I18N.common.rsd);
}

function gameImg(seed, w = 480, h = 360) {
  return `assets/games/${seed}/${seed}.png`;
}

function gameImgX(seed, num, w = 480, h = 360) {
  return `assets/games/${seed}/${seed}-${num}.png`;
}

function storeImg(seed, w = 480, h = 360) {
  return `assets/gallery/store/${seed}.png`;
}

function closeGameImg(seed, w = 480, h = 360) {
  return `assets/gallery/games/${seed}.png`;
}

function starHtml(avg) {
  const full = Math.round(avg);
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += i <= full ? '★' : '<span class="empty">★</span>';
  }
  return html;
}

function getExtraRatings(gameId) {
  try {
    return JSON.parse(localStorage.getItem('g4y_ratings_' + gameId) || '[]');
  } catch { return []; }
}
function addRating(gameId, value) {
  const list = getExtraRatings(gameId);
  list.push(value);
  localStorage.setItem('g4y_ratings_' + gameId, JSON.stringify(list));
}
function getAverageRating(game) {
  const all = [...game.baseRatings, ...getExtraRatings(game.id)];
  if (!all.length) return 0;
  return all.reduce((a, b) => a + b, 0) / all.length;
}
function getRatingCount(game) {
  return game.baseRatings.length + getExtraRatings(game.id).length;
}

function getComments(gameId) {
  try {
    return JSON.parse(localStorage.getItem('g4y_comments_' + gameId) || '[]');
  } catch { return []; }
}
function addComment(gameId, name, text) {
  const list = getComments(gameId);
  list.push({ name, text, date: new Date().toLocaleDateString(getLang() === 'sr' ? 'sr-RS' : 'en-US') });
  localStorage.setItem('g4y_comments_' + gameId, JSON.stringify(list));
}

function getCart() {
  try { return JSON.parse(localStorage.getItem('g4y_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('g4y_cart', JSON.stringify(cart));
}
function addToCart(gameId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.gameId === gameId);
  if (existing) existing.qty += qty;
  else cart.push({ gameId, qty });
  saveCart(cart);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function getOrders() {
  try { return JSON.parse(localStorage.getItem('g4y_orders') || '[]'); } catch { return []; }
}
function saveOrders(orders) {
  localStorage.setItem('g4y_orders', JSON.stringify(orders));
}

function gameBoxCardHtml(game) {
  const avg = getAverageRating(game);
  const hasDiscount = game.discount > 0;
  const finalPrice = hasDiscount ? Math.round(game.price * (1 - game.discount / 100)) : game.price;
  let ribbon = '';
  if (hasDiscount) ribbon = `<div class="ribbon">-${game.discount}% ${t(I18N.home.discountBadge)}</div>`;
  else if (game.isNew) ribbon = `<div class="ribbon gold">${t(I18N.common.newBadge)}</div>`;

  return `
  <div class="col-sm-6 col-lg-4">
    <a href="game.html?id=${game.id}" class="game-box text-decoration-none text-reset d-block h-100">
      ${ribbon}
      <div class="box-img-wrap"><img src="${gameImg(game.imgSeed)}" alt="${t(game.name)}" loading="lazy"></div>
      <div class="box-body">
        <div class="box-group">${t(GROUP_LABELS[game.group])}</div>
        <h3>${t(game.name)}</h3>
        <p class="box-tagline">${t(game.tagline)}</p>
        <div class="box-meta">
          <span>👥 ${game.players}</span>
          <span>🎂 ${game.age}</span>
          <span>⏱ ${game.duration}</span>
        </div>
        <div class="box-footer">
          <span class="stars" title="${avg.toFixed(1)}">${starHtml(avg)}</span>
          <span class="price">${hasDiscount ? `<span class="old">${formatPrice(game.price)}</span>` : ''}${formatPrice(finalPrice)}</span>
        </div>
      </div>
    </a>
  </div>`;
}
