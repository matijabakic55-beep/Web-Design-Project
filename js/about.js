function onLayoutReady() {
  const lang = getLang();
  document.getElementById('pageTitle').textContent = t(I18N.about.title);
  document.getElementById('historyTitle').textContent = t(I18N.about.historyTitle);
  document.getElementById('historyText').textContent = t(I18N.about.historyText);
  document.getElementById('missionTitle').textContent = t(I18N.about.missionTitle);
  document.getElementById('missionText').textContent = t(I18N.about.missionText);
  document.getElementById('awardsTitle').textContent = t(I18N.about.awardsTitle);
  document.getElementById('awardsList').innerHTML = I18N.about.awards[lang].map(a => `<li>${a}</li>`).join('');
  document.getElementById('hoursTitle').textContent = t(I18N.about.hoursTitle);
  document.getElementById('hoursList').innerHTML = I18N.about.hours[lang].map(h => `<li>${h}</li>`).join('');
  document.getElementById('contactTitle').textContent = t(I18N.about.contactTitle);
  document.getElementById('addressText').textContent = '📍 ' + t(I18N.about.address);
  document.getElementById('phoneText').textContent = '📞 ' + t(I18N.about.phone);
  document.getElementById('emailText').textContent = '✉️ ' + t(I18N.about.email);
  document.getElementById('mapTitle').textContent = t(I18N.about.mapTitle);

  document.getElementById('site-breadcrumbs').innerHTML = buildBreadcrumbs([
    { label: I18N.breadcrumbHome, href: 'index.html' },
    { label: I18N.nav.about }
  ]);
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout({ active: 'about', crumbs: null, titleKey: I18N.about.title });
});
