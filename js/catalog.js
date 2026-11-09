function currentGroup() {
  const params = new URLSearchParams(location.search);
  return params.get('group') || '';
}

function onLayoutReady() {
  const group = currentGroup();

  document.getElementById('pageTitle').textContent = group ? t(GROUP_LABELS[group]) : t(I18N.catalog.title);
  document.getElementById('pageIntro').textContent = t(I18N.catalog.intro);
  document.getElementById('sideNavTitle').textContent = t(I18N.nav.catalog);
  document.getElementById('linkAll').textContent = t(I18N.catalog.allGroups);
  document.getElementById('linkFamily').textContent = t(GROUP_LABELS.family);
  document.getElementById('linkStrategy').textContent = t(GROUP_LABELS.strategy);
  document.getElementById('linkParty').textContent = t(GROUP_LABELS.party);

  ['linkAll', 'linkFamily', 'linkStrategy', 'linkParty'].forEach(id => {
    const el = document.getElementById(id);
    if (el.dataset.group === group) el.classList.add('active');
  });

  document.getElementById('searchInput').placeholder = t(I18N.catalog.searchPlaceholder);
  document.getElementById('sortLabel').textContent = t(I18N.catalog.sortLabel);
  document.getElementById('optNameAsc').textContent = t(I18N.catalog.sortNameAsc);
  document.getElementById('optNameDesc').textContent = t(I18N.catalog.sortNameDesc);
  document.getElementById('optPriceAsc').textContent = t(I18N.catalog.sortPriceAsc);
  document.getElementById('optPriceDesc').textContent = t(I18N.catalog.sortPriceDesc);
  document.getElementById('noResults').textContent = t(I18N.catalog.noResults);
  document.getElementById('pdfLabel').textContent = t(I18N.catalog.downloadPdf);

  const crumbs = [
    { label: I18N.breadcrumbHome, href: 'index.html' },
    { label: I18N.nav.catalog, href: group ? 'catalog.html' : null }
  ];
  if (group) crumbs.push({ label: GROUP_LABELS[group] });
  document.getElementById('site-breadcrumbs').innerHTML = buildBreadcrumbs(crumbs);
  document.title = `${t(I18N.siteName)} — ${group ? t(GROUP_LABELS[group]) : t(I18N.catalog.title)}`;

  document.getElementById('searchInput').addEventListener('input', renderGrid);
  document.getElementById('sortSelect').addEventListener('change', renderGrid);
  document.getElementById('pdfBtn').addEventListener('click', downloadCatalogPdf);

  renderGrid();
}

function getFilteredSortedGames() {
  const group = currentGroup();
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const sort = document.getElementById('sortSelect').value;

  let list = GAMES.filter(g => !group || g.group === group);
  if (query) {
    list = list.filter(g =>
      t(g.name).toLowerCase().includes(query) ||
      g.name.sr.toLowerCase().includes(query) ||
      g.name.en.toLowerCase().includes(query)
    );
  }
  list = [...list];
  switch (sort) {
    case 'name-asc': list.sort((a, b) => t(a.name).localeCompare(t(b.name))); break;
    case 'name-desc': list.sort((a, b) => t(b.name).localeCompare(t(a.name))); break;
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
  }
  return list;
}

function renderGrid() {
  const list = getFilteredSortedGames();
  document.getElementById('gamesGrid').innerHTML = list.map(gameBoxCardHtml).join('');
  document.getElementById('noResults').style.display = list.length ? 'none' : 'block';
  document.getElementById('resultsCount').textContent = `${t(I18N.catalog.resultsCount)} ${list.length}`;
}

function downloadCatalogPdf() {
  const list = getFilteredSortedGames();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const lang = getLang();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Games4You', 14, 18);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const heading = currentGroup() ? (GROUP_LABELS[currentGroup()][lang]) : (lang === 'sr' ? 'Katalog igara' : 'Game Catalog');
  doc.text(heading, 14, 26);

  let y = 38;
  list.forEach((g, idx) => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    const name = transliterateIfNeeded(g.name[lang]);
    doc.text(`${idx + 1}. ${name}`, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    y += 6;
    const price = g.discount > 0 ? Math.round(g.price * (1 - g.discount / 100)) : g.price;
    doc.text(`${lang === 'sr' ? 'Cena' : 'Price'}: ${price} RSD   |   ${lang === 'sr' ? 'Igraci' : 'Players'}: ${g.players}   |   ${lang === 'sr' ? 'Uzrast' : 'Age'}: ${g.age}   |   ${lang === 'sr' ? 'Trajanje' : 'Duration'}: ${g.duration}`, 14, y);
    y += 8;
  });

  doc.save('games4you-katalog.pdf');
}

function transliterateIfNeeded(str) {
  const map = { 'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Ђ':'Dj','Е':'E','Ж':'Z','З':'Z','И':'I','Ј':'J','К':'K','Л':'L','Љ':'Lj','М':'M','Н':'N','Њ':'Nj','О':'O','П':'P','Р':'R','С':'S','Т':'T','Ћ':'C','У':'U','Ф':'F','Х':'H','Ц':'C','Ч':'C','Џ':'Dz','Ш':'S',
    'а':'a','б':'b','в':'v','г':'g','д':'d','ђ':'dj','е':'e','ж':'z','з':'z','и':'i','ј':'j','к':'k','л':'l','љ':'lj','м':'m','н':'n','њ':'nj','о':'o','п':'p','р':'r','с':'s','т':'t','ћ':'c','у':'u','ф':'f','х':'h','ц':'c','ч':'c','џ':'dz','ш':'s' };
  return str.split('').map(ch => map[ch] !== undefined ? map[ch] : ch).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout({
    active: 'catalog',
    crumbs: null,
    titleKey: I18N.catalog.title
  });
});
