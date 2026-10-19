// Renders window.CV (js/cv-data.js) into #cv as artist-CV style lists.
(function () {
  const root = document.getElementById('cv');
  if (!root || !window.CV) return;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  root.innerHTML = window.CV.map(({ section, entries }) => {
    let prevYear = null;
    const rows = entries.map((e) => {
      // Artist-CV convention: show a year only where it changes
      const year = e.year === prevYear ? '' : e.year;
      prevYear = e.year;
      const external = e.url && /^https?:/.test(e.url);
      const title = e.url
        ? `<a href="${esc(e.url)}" class="cv-link"${external ? ' target="_blank" rel="noopener"' : ''}>${esc(e.title)}<span class="cv-arrow">${external ? '↗' : '→'}</span></a>`
        : esc(e.title);
      return `
        <li class="cv-row">
          <span class="cv-year">${esc(year)}</span>
          <span class="cv-entry">
            ${title}${e.where ? `<span class="cv-where">, ${esc(e.where)}</span>` : ''}
            ${e.note ? `<span class="cv-note">${esc(e.note)}</span>` : ''}
          </span>
        </li>`;
    }).join('');

    return `
      <r-grid columns="8" columns-s="1" class="cv-section">
        <r-cell span="1-2" span-s="row"><h2 class="cv-label">${esc(section)}</h2></r-cell>
        <r-cell span="3-8" span-s="row"><ul class="cv-list">${rows}</ul></r-cell>
      </r-grid>`;
  }).join('');
})();
