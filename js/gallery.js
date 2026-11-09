function onLayoutReady() {
  document.getElementById('pageTitle').textContent = t(I18N.gallery.title);
  document.getElementById('pageIntro').textContent = t(I18N.gallery.intro);
  document.getElementById('sideNavTitle').textContent = t(I18N.gallery.title);
  document.getElementById('linkStore').textContent = t(I18N.gallery.store);
  document.getElementById('linkGames').textContent = t(I18N.gallery.games);
  document.getElementById('linkVideos').textContent = t(I18N.gallery.videos);
  document.getElementById('storeTitle').textContent = t(I18N.gallery.store);
  document.getElementById('gamesTitle').textContent = t(I18N.gallery.games);
  document.getElementById('videosTitle').textContent = t(I18N.gallery.videos);

  document.getElementById('site-breadcrumbs').innerHTML = buildBreadcrumbs([
    { label: I18N.breadcrumbHome, href: 'index.html' },
    { label: I18N.nav.gallery }
  ]);

  document.getElementById('storeGrid').innerHTML = GALLERY_STORE.map(seed => `
    <img src="${storeImg(seed, 500, 375)}" alt="Games4You store" loading="lazy">`).join('');

  document.getElementById('gamesGrid').innerHTML = GALLERY_GAMES.map(seed => `
    <img src="${closeGameImg(seed, 500, 375)}" alt="Board game detail" loading="lazy">`).join('');

  document.getElementById('videosGrid').innerHTML = GALLERY_VIDEOS.map(v => `
    <div class="video-card">
      <iframe src="https://www.youtube.com/embed/${v.id}" title="${t(v.title)}" loading="lazy" allowfullscreen></iframe>
      <p class="vtitle">${t(v.title)}</p>
    </div>`).join('');

  // highlight active side-nav section on scroll
  const links = { store: document.getElementById('linkStore'), games: document.getElementById('linkGames'), videos: document.getElementById('linkVideos') };
  const sections = ['store', 'games', 'videos'].map(id => document.getElementById(id));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Object.values(links).forEach(l => l.classList.remove('active'));
        links[entry.target.id].classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => obs.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout({ active: 'gallery', crumbs: null, titleKey: I18N.gallery.title });
});
