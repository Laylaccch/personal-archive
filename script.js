const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '＋';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '＋';
}));
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.photo-card').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
});


// Gentle scroll-linked parallax for the floating photo collage.
(() => {
  const stage = document.querySelector('#photo-collage');
  const items = stage ? [...stage.querySelectorAll('[data-speed]')] : [];
  if (!stage || !items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    const rect = stage.getBoundingClientRect();
    const centerOffset = (window.innerHeight * 0.5) - (rect.top + rect.height * 0.5);
    items.forEach(item => {
      const speed = Number(item.dataset.speed || 0.2);
      item.style.translate = `0 ${centerOffset * speed * 0.22}px`;
    });
    ticking = false;
  };
  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };
  window.addEventListener('scroll', requestUpdate, {passive:true});
  window.addEventListener('resize', requestUpdate);
  update();
})();
