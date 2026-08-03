// Footer Component Template
// This script injects the footer directly without needing a separate HTML file

function loadFooter() {
  const footerHTML = `
    <div class="site-footer" style="background-color: #f5f5f5; margin-top: 80px;">
      <r-grid columns="8" columns-s="2" style="padding-top: 40px; padding-bottom: 20px;">

        <!-- Left: email, then LinkedIn on next line -->
        <r-cell span="2-4" span-s="1" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0;">
          <a href="mailto:hello@julija.works"
             style="font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 400; color: #1a1a1a; text-decoration: none; letter-spacing: -0.01em;"
             onclick="if(typeof umami !== 'undefined') umami.track('Email_link_clicked', {page: window.location.pathname});"
             onmouseover="this.style.color='#7E0F18'" onmouseout="this.style.color='#1a1a1a'">
            hello@julija.works
          </a>
          <div style="display: inline-flex; align-items: center; gap: 1rem; margin-top: 0.75em;">
            <a href="https://www.linkedin.com/in/julija-rukanskaite/" target="_blank" rel="noopener noreferrer"
               onclick="if(typeof umami !== 'undefined') umami.track('LinkedIn_link_clicked', {page: window.location.pathname});"
               style="color: #6b6b6b; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; transition: opacity 0.2s ease;"
               onmouseover="this.style.opacity='0.5';"
               onmouseout="this.style.opacity='1';"
               aria-label="LinkedIn">
              <i class="fa fa-linkedin" style="font-size: 20px; color: #6b6b6b;"></i>
            </a>
            <a href="https://bsky.app/profile/julija00.bsky.social" target="_blank" rel="noopener noreferrer"
               onclick="if(typeof umami !== 'undefined') umami.track('Bluesky_link_clicked', {page: window.location.pathname});"
               style="color: #6b6b6b; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; transition: opacity 0.2s ease;"
               onmouseover="this.style.opacity='0.5';"
               onmouseout="this.style.opacity='1';"
               aria-label="Bluesky">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bluesky" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/>
              </svg>
            </a>
          </div>
        </r-cell>

        <!-- Right: attribution -->
        <r-cell class="footer-right-cell" span="6-7" span-s="2" style="display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; text-align: left;">
          <p style="color: #555; font-size: 0.95rem; font-weight: 500; line-height: 1.6; text-align: left; margin: 0; padding-top: 12px; border-top: 1px solid #ccc;">
            site developed by Julija Rukanskaitė, based on software by Rasmus Andersson, 2019<br>
            <span style="display: block; margin-top: 0.6em; padding-top: 0.6em; border-top: 1px solid #ccc;">Studio Julija Rukanskaite · Org.no: 932 773 511 MVA 🇳🇴</span>
          </p>
        </r-cell>

      </r-grid>
    </div>
  `;

  // Find the footer placeholder and inject the HTML
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
    
    // Initialize Cal.com after footer is loaded
    initCalEmbed();
  }
}

function initCalEmbed() {
  // Cal.com embed code
  (function (C, A, L) { 
    let p = function (a, ar) { a.q.push(ar); }; 
    let d = C.document; 
    C.Cal = C.Cal || function () { 
      let cal = C.Cal; 
      let ar = arguments; 
      if (!cal.loaded) { 
        cal.ns = {}; 
        cal.q = cal.q || []; 
        d.head.appendChild(d.createElement("script")).src = A; 
        cal.loaded = true; 
      } 
      if (ar[0] === L) { 
        const api = function () { p(api, arguments); }; 
        const namespace = ar[1]; 
        api.q = api.q || []; 
        if(typeof namespace === "string"){
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar); 
        return;
      } 
      p(cal, ar); 
    }; 
  })(window, "https://app.cal.com/embed/embed.js", "init");
  
  Cal("init", "30min", {origin:"https://cal.com"});
  
  Cal.ns["30min"]("ui", {
    "theme":"light",
    "cssVarsPerTheme":{
      "light":{
        "cal-brand":"#6f0000",
        "cal-modal-width":"400px",
        "cal-modal-max-width":"90vw"
      },
      "dark":{
        "cal-brand":"#ffffff",
        "cal-modal-width":"400px",
        "cal-modal-max-width":"90vw"
      }
    },
    "hideEventTypeDetails":false,
    "layout":"column_view"
  });
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);