let CURRENT_GAME = null;
let SELECTED_RATING = 0;

function getGameFromUrl() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  return GAMES.find(g => g.id === id) || GAMES[0];
}

function onLayoutReady() {
  CURRENT_GAME = getGameFromUrl();
  const g = CURRENT_GAME;

  document.title = `${t(I18N.siteName)} — ${t(g.name)}`;
  document.getElementById('site-breadcrumbs').innerHTML = buildBreadcrumbs([
    { label: I18N.breadcrumbHome, href: 'index.html' },
    { label: I18N.nav.catalog, href: 'catalog.html' },
    { label: GROUP_LABELS[g.group], href: `catalog.html?group=${g.group}` },
    { label: g.name }
  ]);

  document.getElementById('gameShell').innerHTML = buildGamePage(g);
  wireGamePage(g);
  renderComments(g);
  renderRelated(g);
}

function buildGamePage(g) {
  const avg = getAverageRating(g);
  const count = getRatingCount(g);
  const hasDiscount = g.discount > 0;
  const finalPrice = hasDiscount ? Math.round(g.price * (1 - g.discount / 100)) : g.price;

  return `
  <div class="game-detail-grid">
    <div>
      <div class="game-gallery-main">
        <img id="mainImg" src="${gameImg(g.imgSeed, 700, 520)}" alt="${t(g.name)}">
      </div>
      <div class="game-thumbs" id="thumbRow">
        ${[1,2,3].map((n,i) => `<img data-src="${gameImgX(g.imgSeed, n, 700, 520)}" src="${gameImgX(g.imgSeed, n, 700, 520)}" class="${i===0?'active':''}" alt="${t(g.name)} ${n}">`).join('')}
      </div>
    </div>
    <div>
      <div class="box-group">${t(GROUP_LABELS[g.group])}</div>
      <h1>${t(g.name)}</h1>
      <p style="color:var(--ink-soft);font-size:1.05rem;">${t(g.tagline)}</p>

      <div class="d-flex align-items-center gap-2">
        <span class="stars" style="font-size:1.2rem;">${starHtml(avg)}</span>
        <span class="mono" style="font-size:0.85rem;color:var(--ink-soft);">${avg.toFixed(1)} · ${count} ${t(I18N.game.reviewsCount)}</span>
      </div>

      <div class="stat-badges">
        <div class="stat-badge"><span class="val">${g.players}</span>${t(I18N.game.players)}</div>
        <div class="stat-badge"><span class="val">${g.age}</span>${t(I18N.game.age)}</div>
        <div class="stat-badge"><span class="val">${g.duration}</span>${t(I18N.game.duration)}</div>
      </div>

      <div class="price-block">
        ${hasDiscount ? `<span class="price-old">${formatPrice(g.price)}</span>` : ''}
        <span class="price-current">${formatPrice(finalPrice)}</span>
        ${hasDiscount ? `<span class="badge-pct" style="background:var(--dice-red);color:#fff;padding:.25rem .55rem;border-radius:5px;font-family:var(--font-mono);font-size:.78rem;">-${g.discount}%</span>` : ''}
      </div>

      <button type="button" class="btn btn-g4y" id="addCartBtn">🛒 ${t(I18N.game.addToCart)}</button>
      <span id="addedMsg" class="mono ms-2" style="color:var(--felt);font-weight:700;display:none;">${t(I18N.game.addedToCart)}</span>

      <h2 class="h5 mt-4">${t(I18N.game.description)}</h2>
      <p>${t(g.longDesc)}</p>

      <h2 class="h5 mt-4">${t(I18N.game.yourRating)}</h2>
      <div class="rate-stars-input" id="rateStars" role="group" aria-label="${t(I18N.game.yourRating)}">
        ${[1,2,3,4,5].map(n => `<span data-val="${n}">★</span>`).join('')}
      </div>
      <span id="rateThanks" class="mono" style="color:var(--felt);font-weight:700;display:none;">${t(I18N.game.thankYouRating)}</span>
    </div>
  </div>

  <div class="section-title"><h2>${t(I18N.game.commentsTitle)}</h2><div class="rule"></div></div>
  <div class="row">
    <div class="col-lg-7">
      <div id="commentsList"></div>
      <p id="noComments" class="text-muted" style="display:none;">${t(I18N.game.noComments)}</p>
    </div>
    <div class="col-lg-5">
      <form id="commentForm" class="info-card">
        <div class="mb-2">
          <label class="form-label mono" style="font-size:.75rem;text-transform:uppercase;">${t(I18N.game.commentName)}</label>
          <input type="text" class="form-control" id="commentNameInput" required>
        </div>
        <div class="mb-2">
          <label class="form-label mono" style="font-size:.75rem;text-transform:uppercase;">${t(I18N.game.commentsTitle)}</label>
          <textarea class="form-control" id="commentTextInput" rows="3" placeholder="${t(I18N.game.commentPlaceholder)}" required></textarea>
        </div>
        <button type="submit" class="btn btn-g4y btn-sm">${t(I18N.game.submitComment)}</button>
      </form>
    </div>
  </div>

  <div class="section-title"><h2>${t(I18N.game.relatedTitle)}</h2><div class="rule"></div></div>
  <div class="row g-3" id="relatedRow"></div>
  `;
}

function wireGamePage(g) {
  // swap
  document.querySelectorAll('#thumbRow img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('mainImg').src = img.dataset.src;
      document.querySelectorAll('#thumbRow img').forEach(i => i.classList.remove('active'));
      img.classList.add('active');
    });
  });

  // add to cart
  document.getElementById('addCartBtn').addEventListener('click', () => {
    addToCart(g.id, 1);
    const msg = document.getElementById('addedMsg');
    msg.style.display = 'inline';
    setTimeout(() => (msg.style.display = 'none'), 2000);
  });

  // rating stars
  const starEls = document.querySelectorAll('#rateStars span');
  starEls.forEach(el => {
    el.addEventListener('mouseenter', () => paintStars(+el.dataset.val));
    el.addEventListener('click', () => {
      SELECTED_RATING = +el.dataset.val;
      addRating(g.id, SELECTED_RATING);
      document.getElementById('rateThanks').style.display = 'inline';
      paintStars(SELECTED_RATING);
      starEls.forEach(s => s.style.pointerEvents = 'none');
    });
  });
  document.getElementById('rateStars').addEventListener('mouseleave', () => paintStars(SELECTED_RATING));

  // comment form
  document.getElementById('commentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('commentNameInput').value.trim();
    const text = document.getElementById('commentTextInput').value.trim();
    if (!name || !text) return;
    addComment(g.id, name, text);
    e.target.reset();
    renderComments(g);
  });
}

function paintStars(val) {
  document.querySelectorAll('#rateStars span').forEach(s => {
    s.classList.toggle('on', +s.dataset.val <= val);
  });
}

function renderComments(g) {
  const comments = getComments(g.id);
  const list = document.getElementById('commentsList');
  document.getElementById('noComments').style.display = comments.length ? 'none' : 'block';
  list.innerHTML = comments.slice().reverse().map(c => `
    <div class="comment-item">
      <div class="d-flex justify-content-between">
        <span class="cname">${escapeHtml(c.name)}</span>
        <span class="cdate">${c.date}</span>
      </div>
      <p class="mb-0 mt-1">${escapeHtml(c.text)}</p>
    </div>`).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderRelated(g) {
  const related = GAMES.filter(x => x.group === g.group && x.id !== g.id).slice(0, 3);
  document.getElementById('relatedRow').innerHTML = related.map(gameBoxCardHtml).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout({
    active: 'catalog',
    crumbs: null,
    titleKey: I18N.nav.catalog
  });
});
