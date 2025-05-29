// Header Navigation Component
// This script injects the responsive header navigation with automatic page highlighting

function loadHeaderNav() {
  const headerHTML = `
    <!-- Navigation -->
    <r-grid columns=8 columns-s=2 class="sticky">
      <r-cell span=2-3 span-s=1>
        <h3 style="font-family: syne tactile; color: #C9C6CF;">
          <a href="index.html" class="link">Julija.works</a>
        </h3>
      </r-cell>
      
      <r-cell span=4-7 span-s=1>
        <h3 style="float: right; color: rgb(20, 20, 20);">
          <a href="index.html" class="link-arrow nav-work">Work</a>
          &nbsp; &nbsp;
          <a href="services.html" class="link-arrow nav-services">Services</a>
          &nbsp; &nbsp;
          <a href="bio.html" class="link-arrow nav-about">Bio</a>
          &nbsp; &nbsp;
        </h3>
      </r-cell>
    </r-grid>
    
    <style>
      /* Sticky Header Styles */
      .sticky {
        position: sticky; 
        position: -webkit-sticky;
        top: 0;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 100;
        padding: 2%;
      }
      
      /* Selected state - just color change, no dots */
      .selected-bulb {
        color:rgb(107, 1, 1) !important;
      }
      
      /* Hover effects */
      .link-arrow:hover {
        color:rgb(107, 1, 1);
        transition: color 0.3s ease;
      }
      
      /* Mobile responsive - same layout, smaller text */
      @media (max-width: 768px) {
        .sticky {
          padding: 16px 2%;
        }
        
        .sticky h3 {
          font-size: 0.9rem;
        }
        
        .link-arrow {
          font-size: 0.9rem;
        }
      }
      
      @media (max-width: 480px) {
        .sticky h3 {
          font-size: 0.8rem;
        }
        
        .link-arrow {
          font-size: 0.8rem;
        }
        
        /* Reduce spacing on very small screens */
        .sticky r-cell[span="4-7"] h3 {
          white-space: nowrap;
        }
      }
    </style>
  `;

  // Find the header placeholder and inject the HTML
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = headerHTML;
    
    // Set active navigation item based on current page
    setActiveNavItem();
  }
}

function setActiveNavItem() {
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Remove existing selected-bulb classes
  document.querySelectorAll('.nav-work, .nav-services, .nav-about').forEach(link => {
    link.classList.remove('selected-bulb');
  });
  
  // Add selected-bulb class to current page
  if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
    document.querySelectorAll('.nav-work').forEach(link => {
      link.classList.add('selected-bulb');
    });
  } else if (currentPage.includes('services') || currentPage === 'services.html') {
    document.querySelectorAll('.nav-services').forEach(link => {
      link.classList.add('selected-bulb');
    });
  } else if (currentPage.includes('about') || currentPage === 'bio.html') {
    document.querySelectorAll('.nav-about').forEach(link => {
      link.classList.add('selected-bulb');
    });
  }
  // For case study pages or other work pages, highlight Work
  else if (currentPage.includes('.html') && !currentPage.includes('services') && !currentPage.includes('about')) {
    document.querySelectorAll('.nav-work').forEach(link => {
      link.classList.add('selected-bulb');
    });
  }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadHeaderNav();
});