function onLayoutReady() {
  document.getElementById('pageTitle').textContent = t(I18N.account.title);
  document.getElementById('cartTitle').textContent = t(I18N.account.cartTitle);
  document.getElementById('historyTitle').textContent = t(I18N.account.historyTitle);

  document.getElementById('site-breadcrumbs').innerHTML = buildBreadcrumbs([
    { label: I18N.breadcrumbHome, href: 'index.html' },
    { label: I18N.nav.account }
  ]);

  renderCart();
  renderHistory();
}

function gamePriceNow(g) {
  return g.discount > 0 ? Math.round(g.price * (1 - g.discount / 100)) : g.price;
}

function renderCart() {
  const cart = getCart();
  const area = document.getElementById('cartArea');

  if (!cart.length) {
    area.innerHTML = `
      <p class="text-muted">${t(I18N.account.emptyCart)}</p>
      <a href="catalog.html" class="btn btn-g4y-outline btn-sm">${t(I18N.account.browseCta)}</a>`;
    return;
  }

  let total = 0;
  const rows = cart.map(item => {
    const g = GAMES.find(x => x.id === item.gameId);
    if (!g) return '';
    const price = gamePriceNow(g);
    const subtotal = price * item.qty;
    total += subtotal;
    return `
    <tr data-id="${g.id}">
      <td>
        <div class="d-flex align-items-center gap-2">
          <img src="${gameImg(g.imgSeed, 80, 60)}" alt="${t(g.name)}" style="width:56px;height:42px;object-fit:cover;border-radius:5px;">
          <a href="game.html?id=${g.id}">${t(g.name)}</a>
        </div>
      </td>
      <td><input type="number" min="1" value="${item.qty}" class="qty-input cart-qty" data-id="${g.id}"></td>
      <td class="mono">${formatPrice(price)}</td>
      <td class="mono">${formatPrice(subtotal)}</td>
      <td><button type="button" class="btn btn-sm btn-g4y-outline cart-remove" data-id="${g.id}">${t(I18N.account.remove)}</button></td>
    </tr>`;
  }).join('');

  area.innerHTML = `
    <div class="table-responsive">
      <table class="cart-table">
        <thead>
          <tr>
            <th>${t(I18N.account.game)}</th>
            <th>${t(I18N.account.qty)}</th>
            <th>${t(I18N.account.unitPrice)}</th>
            <th>${t(I18N.account.subtotal)}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
      <span class="h5 mb-0">${t(I18N.account.total)}: <span class="mono">${formatPrice(total)}</span></span>
      <button type="button" class="btn btn-g4y" id="checkoutBtn">${t(I18N.account.checkout)}</button>
    </div>
  `;

  area.querySelectorAll('.cart-qty').forEach(inp => {
    inp.addEventListener('change', () => {
      const cart2 = getCart();
      const it = cart2.find(x => x.gameId === inp.dataset.id);
      let val = parseInt(inp.value, 10);
      if (!val || val < 1) val = 1;
      it.qty = val;
      saveCart(cart2);
      renderCart();
    });
  });
  area.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart2 = getCart().filter(x => x.gameId !== btn.dataset.id);
      saveCart(cart2);
      renderCart();
    });
  });
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', finalizeOrder);
}

function finalizeOrder() {
  const cart = getCart();
  if (!cart.length) return;
  let total = 0;
  const items = cart.map(item => {
    const g = GAMES.find(x => x.id === item.gameId);
    const price = gamePriceNow(g);
    total += price * item.qty;
    return { gameId: g.id, name: g.name, qty: item.qty, price };
  });
  const orders = getOrders();
  orders.push({ date: new Date().toISOString(), items, total });
  saveOrders(orders);
  saveCart([]);
  renderCart();
  renderHistory();
  const msg = document.getElementById('checkoutMsg');
  msg.textContent = t(I18N.account.checkoutSuccess);
  msg.style.display = 'block';
  setTimeout(() => (msg.style.display = 'none'), 4000);
}

function renderHistory() {
  const orders = getOrders();
  const area = document.getElementById('historyArea');
  if (!orders.length) {
    area.innerHTML = `<p class="text-muted">${t(I18N.account.noOrders)}</p>`;
    return;
  }
  const lang = getLang();
  area.innerHTML = orders.slice().reverse().map(o => {
    const dateStr = new Date(o.date).toLocaleString(lang === 'sr' ? 'sr-RS' : 'en-US');
    const itemsHtml = o.items.map(i => `<li>${i.name[lang]} × ${i.qty} — <span class="mono">${formatPrice(i.price * i.qty)}</span></li>`).join('');
    return `
    <div class="order-card">
      <div class="d-flex justify-content-between flex-wrap">
        <strong>${t(I18N.account.orderFrom)} ${dateStr}</strong>
        <span class="mono">${t(I18N.account.orderTotalLabel)} ${formatPrice(o.total)}</span>
      </div>
      <ul class="mb-0 mt-2">${itemsHtml}</ul>
    </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout({ active: 'account', crumbs: null, titleKey: I18N.account.title });
});
