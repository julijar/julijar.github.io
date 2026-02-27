// Global Nav Menu Component
// Injects Work | Services | Bio links and sets active state from current page

function loadNavMenu() {
  const menuHTML = `
    <h3 style="float: right; color: rgb(20, 20, 20); display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; justify-content: flex-end;">
      <a href="index.html" class="link-arrow nav-work">Work</a>
      <a href="services.html" class="link-arrow nav-services">Services</a>
      <a href="bio.html" class="link-arrow nav-bio">Bio</a>
    </h3>
  `;

  const placeholder = document.getElementById('nav-menu-placeholder');
  if (placeholder) {
    placeholder.innerHTML = menuHTML;
    setActiveNavItem();
  }
}

function setActiveNavItem() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-work, .nav-services, .nav-bio').forEach(link => {
    link.classList.remove('selected-bulb');
  });

  if (page === '' || page === 'index.html' || path.endsWith('/')) {
    document.querySelectorAll('.nav-work').forEach(link => link.classList.add('selected-bulb'));
  } else if (page === 'services.html' || path.includes('services')) {
    document.querySelectorAll('.nav-services').forEach(link => link.classList.add('selected-bulb'));
  } else if (page === 'bio.html' || page === 'Bio.html' || path.includes('bio')) {
    document.querySelectorAll('.nav-bio').forEach(link => link.classList.add('selected-bulb'));
  } else {
    document.querySelectorAll('.nav-work').forEach(link => link.classList.add('selected-bulb'));
  }
}

document.addEventListener('DOMContentLoaded', loadNavMenu);
