const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
root.classList.add('js');

// Theme: dark is the designed default; remember a visitor's explicit choice.
const themeToggle = document.querySelector('.theme-toggle');
function setTheme(theme) {
  root.dataset.theme = theme;
  const light = theme === 'light';
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.title = light ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggle.querySelector('.theme-icon').textContent = light ? '☾' : '☼';
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f4f6fb' : '#090b12');
}
try {
  const savedTheme = localStorage.getItem('dharmika-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
} catch (_) { /* Private browsing may block storage; the dark theme still works. */ }
themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('dharmika-theme', next); } catch (_) { /* Theme remains active for this visit. */ }
});

// Responsive navigation with Escape, outside-click, and link-close behavior.
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function setMenu(open) {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
}
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
document.addEventListener('click', event => {
  if (nav?.classList.contains('is-open') && !nav.contains(event.target) && !menuToggle?.contains(event.target)) setMenu(false);
});

// Typewriter cycles only between factual focus areas from the supplied résumé.
const typedRole = document.querySelector('#typed-role');
const roleOptions = ['Embedded systems', 'Python automation', 'SOFTWARE DEVELOPMENT', 'IT OPERATIONS', 'ROBOTICS & AUTOMATION','Digital operations'];
if (typedRole && !reducedMotion) {
  let roleIndex = 0;
  let charIndex = roleOptions[0].length;
  let deleting = true;
  const typeStep = () => {
    const phrase = roleOptions[roleIndex];
    charIndex += deleting ? -1 : 1;
    typedRole.textContent = phrase.slice(0, Math.max(0, charIndex));
    let delay = deleting ? 45 : 75;
    if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roleOptions.length; delay = 320; }
    if (charIndex >= roleOptions[roleIndex].length && !deleting) { deleting = true; delay = 1500; }
    window.setTimeout(typeStep, delay);
  };
  window.setTimeout(typeStep, 1500);
}

// Reveal-on-scroll; content remains visible when motion is reduced or observers are unavailable.
const revealItems = document.querySelectorAll('.reveal');
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Project filter with accessible selected state.
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');
const filterStatus = document.querySelector('#filter-status');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let visibleCount = 0;
  projectCards.forEach(card => {
    const show = selected === 'all' || card.dataset.category === selected;
    card.hidden = !show;
    if (show) { visibleCount += 1; card.classList.add('is-visible'); }
  });
  if (filterStatus) filterStatus.textContent = `${visibleCount} work ${visibleCount === 1 ? 'item' : 'items'} shown.`;
}));

// Timeline fill follows scroll position without requiring animation to understand the content.
const timeline = document.querySelector('#timeline');
let timelineQueued = false;
function updateTimeline() {
  if (!timeline) return;
  const rect = timeline.getBoundingClientRect();
  const range = rect.height + window.innerHeight * 0.55;
  const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.72 - rect.top) / range));
  timeline.style.setProperty('--timeline-progress', String(progress));
  timelineQueued = false;
}
function requestTimelineUpdate() {
  if (!timelineQueued) { timelineQueued = true; window.requestAnimationFrame(updateTimeline); }
}
window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
window.addEventListener('resize', requestTimelineUpdate);
requestTimelineUpdate();

// Subtle pointer-only tilt and magnetic response. Never runs for touch or reduced-motion users.
if (finePointer && !reducedMotion) {
  const heroVisual = document.querySelector('.hero-visual');
  const heroGlow = document.querySelector('.hero-glow');
  heroVisual?.addEventListener('pointermove', event => {
    if (!heroGlow) return;
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroGlow.style.setProperty('--parallax-x', `${(x * 8).toFixed(1)}px`);
    heroGlow.style.setProperty('--parallax-y', `${(y * 8).toFixed(1)}px`);
  });
  heroVisual?.addEventListener('pointerleave', () => {
    heroGlow?.style.removeProperty('--parallax-x');
    heroGlow?.style.removeProperty('--parallax-y');
  });
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 2.6).toFixed(2)}deg) rotateY(${(x * 3.2).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
  document.querySelectorAll('.magnetic').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
      button.style.setProperty('--mag-x', `${(x * 5).toFixed(1)}px`);
      button.style.setProperty('--mag-y', `${(y * 4).toFixed(1)}px`);
    });
    button.addEventListener('pointerleave', () => {
      button.style.removeProperty('--mag-x');
      button.style.removeProperty('--mag-y');
    });
  });
  const cursorOrb = document.querySelector('.cursor-orb');
  let cursorFrame = 0;
  window.addEventListener('pointermove', event => {
    if (!cursorOrb) return;
    if (!cursorFrame) cursorFrame = window.requestAnimationFrame(() => {
      cursorOrb.style.left = `${event.clientX}px`;
      cursorOrb.style.top = `${event.clientY}px`;
      cursorOrb.classList.add('is-visible');
      cursorFrame = 0;
    });
  }, { passive: true });
  document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('pointerenter', () => cursorOrb?.classList.add('is-hover'));
    element.addEventListener('pointerleave', () => cursorOrb?.classList.remove('is-hover'));
  });
}

// The form is intentionally transparent: it prepares a message in the visitor's email app.
const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const values = new FormData(contactForm);
  const name = String(values.get('name') || '').trim();
  const email = String(values.get('email') || '').trim();
  const message = String(values.get('message') || '').trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nReply to: ${email}\n\n${message}`);
  const formNote = document.querySelector('#form-note');
  if (formNote) formNote.textContent = 'Your email app should open with the message ready. No message is stored on this site.';
  window.location.href = `mailto:dharmikadd@gmail.com?subject=${subject}&body=${body}`;
});

// Keep the small footer date current.
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Hide the intro loader promptly, with a timeout fallback if a resource stalls.
const loader = document.querySelector('.page-loader');
const hideLoader = () => loader?.classList.add('is-hidden');
window.addEventListener('load', () => window.setTimeout(hideLoader, 180), { once: true });
window.setTimeout(hideLoader, 900);
