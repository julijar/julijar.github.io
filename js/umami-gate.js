// Umami pageview gate.
// The Umami tag has data-auto-track="false", so nothing is counted on load.
// A pageview is sent only once the visitor acts like a person: they interact
// with the page, or keep it visible for a few seconds. Headless browsers that
// render the page and leave right away are never counted.
// A second event after 30s of visible time gives single-page visits a real
// duration instead of 0s.
(function () {
  if (navigator.webdriver) return;

  var DWELL_MS = 4000;
  var ENGAGED_MS = 30000;
  var INTERACTIONS = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'mousemove'];

  var pageviewSent = false;
  var engagedSent = false;
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

  function update() {
    if (visibleSince !== null) {
      visibleMs += Date.now() - visibleSince;
      visibleSince = document.hidden ? null : Date.now();
    }
    if (visibleMs >= DWELL_MS) sendPageview();
    if (pageviewSent && !engagedSent && visibleMs >= ENGAGED_MS) {
      engagedSent = true;
      withUmami(function () { umami.track('Engaged_30s', { page: location.pathname }); });
      clearInterval(tick);
    }
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
