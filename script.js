const skillGroups = [
  {category:'software', title:'Programming languages', detail:'C, C++, Embedded C, Python and Java.', tag:'Software development'},
  {category:'software', title:'Web development', detail:'HTML, CSS, JavaScript, PHP, WordPress and .NET / ASP.NET.', tag:'Web development'},
  {category:'software', title:'Database management', detail:'SQL, MySQL, Oracle and MS Access.', tag:'Data & systems'},
  {category:'systems', title:'Embedded systems & IoT', detail:'Firmware development, embedded programming and hardware–software integration.', tag:'Engineering'},
  {category:'systems', title:'Robotics & automation', detail:'Robotic systems, hardware communication, firmware integration and automation.', tag:'Engineering'},
  {category:'digital', title:'Software & IT operations', detail:'Python scripting, data processing, debugging, testing, technical support and documentation.', tag:'IT operations'},
  {category:'digital', title:'Tools & applications', detail:'Git, GitHub, MS Office and Adobe Photoshop.', tag:'Tools & practice'},
  {category:'digital', title:'Technical strengths', detail:'Analytical problem-solving, troubleshooting, communication, technical training and teamwork.', tag:'Professional strengths'}
];
const skillsGrid = document.querySelector('#skills-grid');
function renderSkills(filter='all') {
  if (!skillsGrid) return;
  const filtered = skillGroups.filter(skill => filter === 'all' || skill.category === filter);
  skillsGrid.innerHTML = filtered.map((skill, index) => `<article class="skill-card"><span class="skill-number">${String(index + 1).padStart(2,'0')}</span><h3>${skill.title}</h3><p>${skill.detail}</p><span class="skill-category">${skill.tag}</span></article>`).join('');
}
renderSkills();
document.querySelectorAll('[data-skill-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-skill-filter]').forEach(item => {item.classList.toggle('is-active', item === button); item.setAttribute('aria-pressed', String(item === button));});
  renderSkills(button.dataset.skillFilter);
}));
document.querySelectorAll('[data-project-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-project-filter]').forEach(item => {item.classList.toggle('is-active', item === button); item.setAttribute('aria-pressed', String(item === button));});
  document.querySelectorAll('.project-card').forEach(card => {card.hidden = button.dataset.projectFilter !== 'all' && card.dataset.projectCategory !== button.dataset.projectFilter;});
}));
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
function setMenu(open) {
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav?.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {if (event.key === 'Escape') setMenu(false);});
const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nReply to: ${data.get('email')}\n\n${data.get('message')}`);
  document.querySelector('#form-note').textContent = 'Your email app should open with this message ready to send.';
  window.location.href = `mailto:dharmikadd@gmail.com?subject=${subject}&body=${body}`;
});
document.querySelectorAll('[data-contact-project]').forEach(button => button.addEventListener('click', () => {
  const message = document.querySelector('#sender-message');
  if (message) message.value = `I’d like to discuss: ${button.dataset.contactProject}.`;
  document.querySelector('#contact')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  window.setTimeout(() => message?.focus({preventScroll:true}), 450);
}));
const assistantToggle = document.querySelector('.assistant-toggle');
const assistantPanel = document.querySelector('#assistant-panel');
const assistantWidget = document.querySelector('.profile-assistant');
const heroSection = document.querySelector('.hero');
if ('IntersectionObserver' in window && assistantWidget && heroSection) {
  const introObserver = new IntersectionObserver(([entry]) => assistantWidget.classList.toggle('is-ready', !entry.isIntersecting), {rootMargin:'-90px 0px 0px 0px'});
  introObserver.observe(heroSection);
} else assistantWidget?.classList.add('is-ready');
assistantToggle?.addEventListener('click', () => {
  const open = assistantToggle.getAttribute('aria-expanded') !== 'true';
  assistantToggle.setAttribute('aria-expanded', String(open));
  assistantPanel.hidden = !open;
});
const cursor = document.querySelector('.cursor-aura');
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', event => {cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; cursor.classList.add('is-visible');}, {passive:true});
  document.querySelectorAll('a,button').forEach(item => {item.addEventListener('pointerenter', () => cursor.classList.add('is-hover')); item.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));});
}
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('is-visible'); observer.unobserve(entry.target);}}), {threshold:.12});
  document.querySelectorAll('.content-section,.expertise-section,.work-section,.lab-section,.journey-strip,.resume-section,.contact-section').forEach(section => {section.classList.add('reveal'); observer.observe(section);});
}
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => window.setTimeout(() => preloader?.classList.add('is-done'), 240), {once:true});
window.setTimeout(() => preloader?.classList.add('is-done'), 1500);
document.querySelector('#year').textContent = new Date().getFullYear();
