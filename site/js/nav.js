/**
 * Shared navigation component for the showcase site.
 * Auto-injects the header nav bar and initializes scroll/mobile behavior.
 */
(function () {
  const PAGE = location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    if (href === 'index.html' && (PAGE === '' || PAGE === 'index.html')) return true;
    return PAGE === href;
  }

  const nav = document.createElement('header');
  nav.className = 'nav';
  nav.id = 'site-nav';
  nav.innerHTML = `
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">
        <span class="nav__logo-icon">📅</span>
        <span>Nepali Datepicker</span>
      </a>
      <button class="nav__hamburger" id="nav-hamburger" aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <nav class="nav__menu" id="nav-menu">
        <ul class="nav__links">
          <li><a href="index.html" class="nav__link ${isActive('index.html') ? 'active' : ''}">Home</a></li>
          <li><a href="examples.html" class="nav__link ${isActive('examples.html') ? 'active' : ''}">Examples</a></li>
          <li><a href="docs.html" class="nav__link ${isActive('docs.html') ? 'active' : ''}">API Docs</a></li>
        </ul>
        <a href="https://github.com" target="_blank" rel="noopener" class="nav__cta">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 00-3.8 23.38c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.33-1.76c-1.09-.74.08-.73.08-.73a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.56 2.56 0 01.76-1.61c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 011.24-3.22 4.3 4.3 0 01.12-3.18s1-.32 3.3 1.23a11.38 11.38 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23a4.3 4.3 0 01.12 3.18 4.64 4.64 0 011.23 3.22c0 4.61-2.81 5.63-5.48 5.92a2.87 2.87 0 01.82 2.23v3.29c0 .32.21.7.82.58A12 12 0 0012 .3"/></svg>
          GitHub
        </a>
      </nav>
    </div>
  `;

  document.body.prepend(nav);

  // Scroll effect
  let scrolled = false;
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 10;
    if (isScrolled !== scrolled) {
      scrolled = isScrolled;
      nav.classList.toggle('scrolled', isScrolled);
    }
  }, { passive: true });

  // Mobile hamburger
  const hamburger = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-menu');
  hamburger?.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Close menu on link click
  menu?.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });

  // Background ambience
  const bgGrid = document.createElement('div');
  bgGrid.className = 'bg-grid';
  document.body.appendChild(bgGrid);

  ['bg-glow--1', 'bg-glow--2', 'bg-glow--3'].forEach(cls => {
    const el = document.createElement('div');
    el.className = `bg-glow ${cls}`;
    document.body.appendChild(el);
  });

  // Scroll-driven fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observe after DOM ready
  function observeAnimations() {
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAnimations);
  } else {
    observeAnimations();
  }

  // Copy button logic
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.code-block__copy');
    if (!copyBtn) return;
    const codeBlock = copyBtn.closest('.code-block');
    const code = codeBlock?.querySelector('pre')?.textContent;
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
      });
    }
  });
})();
