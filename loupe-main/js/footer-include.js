// Footer Component Template
// This script injects the footer directly without needing a separate HTML file

function loadFooter() {
  const footerHTML = `
    <!-- Simple Footer Component -->
    <r-grid columns=8 columns-s=1 
    style="gradient-background {
  background: linear-gradient(196deg,#fff7f7,#cec5c5,#fcfcfc);
  background-size: 180% 180%;
  animation: gradient-animation 6s ease infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
    border-top: 1px solid rgba(223, 223, 223, 0.323); height:fit-content; padding-top: 5%; padding-bottom: 5%; padding-left: 4%;">
      <r-cell span=2-4 span-s=1>
        <a class="button button-primary" 
           href="#" 
           data-cal-link="julija/30min"
           data-cal-namespace="30min"
           data-cal-config='{"layout":"column_view","theme":"light"}'>☕ Book a coffee chat</a>
      </r-cell>

      <r-cell span=5-7 span-s=1>
        <h2 style="color: #515151;">hello@julija.works</h2>
        </br>
        <p style="color: #afafaf;">site developed by Julija Rukanskaitė, based on <a href="https://rsms.me/raster/" target="blank" class="link-arrow">Raster by Rasmus Andersson (c) 2019</a></p>
        </br>  
        <p style="color: #afafaf;">Studio Julija Rukanskaite 
          </br>
          Org.no: 932 773 511 MVA</p>
      </r-cell>
    </r-grid>
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