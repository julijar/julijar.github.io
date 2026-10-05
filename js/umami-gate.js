// Umami pageview gate.
// The Umami tag has data-auto-track="false", so nothing is counted on load.
// A pageview is sent only once the visitor acts like a person: they interact
// with the page, or keep it visible for a few seconds. Headless browsers that
// render the page and leave right away are never counted.
// Engaged_10s and Engaged_30s events after that much visible time give
// single-page visits a real duration instead of 0s.
(function () {
  if (navigator.webdriver) return;

  var DWELL_MS = 4000;
  var MILESTONES = [10, 30];
  var INTERACTIONS = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'mousemove'];

  var pageviewSent = false;
  var nextMilestone = 0;
  var visibleMs = 0;
  var visibleSince = null;
  var tick = null;

  function withUmami(fn, tries) {
    if (typeof umami !== 'undefined') return fn();
    if ((tries || 0) < 40) setTimeout(function () { withUmami(fn, (tries || 0) + 1); }, 250);
  }

  function sendPageview() {
    if (pageviewSent) return;
    pageviewSent = true;
    INTERACTIONS.forEach(function (e) { window.removeEventListener(e, sendPageview, true); });
    withUmami(function () { umami.track(); });
  }

  function sendEngaged(seconds) {
    withUmami(function () { umami.track('Engaged_' + seconds + 's', { page: location.pathname }); });
  }

  function update() {
    if (visibleSince !== null) {
      visibleMs += Date.now() - visibleSince;
      visibleSince = document.hidden ? null : Date.now();
    }
    if (visibleMs >= DWELL_MS) sendPageview();
    while (pageviewSent && nextMilestone < MILESTONES.length &&
           visibleMs >= MILESTONES[nextMilestone] * 1000) {
      sendEngaged(MILESTONES[nextMilestone++]);
    }
    if (nextMilestone === MILESTONES.length) clearInterval(tick);
  }

  function onVisibility() {
    if (document.hidden) {
      update();
      visibleSince = null;
    } else if (visibleSince === null) {
      visibleSince = Date.now();
    }
  }

  INTERACTIONS.forEach(function (e) {
    window.addEventListener(e, sendPageview, { capture: true, passive: true });
  });
  document.addEventListener('visibilitychange', onVisibility);
  if (!document.hidden) visibleSince = Date.now();
  tick = setInterval(update, 1000);
})();
