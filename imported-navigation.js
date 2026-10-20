'use strict';
// Add collection navigation without replacing each notebook's own interactive code.
(() => {
  const kind = document.documentElement.dataset.notebookImport;
  if (kind === 'ppo') return; // PPO already has a tested mobile drawer.
  const panel = kind === 'flow' ? document.getElementById('toc') : document.querySelector('nav.toc');
  const button = document.getElementById('notebook-menu');
  if (!panel || !button) return;
  if (!panel.id) panel.id = 'notebook-toc';
  button.setAttribute('aria-controls', panel.id);
  if (panel.tagName === 'DETAILS') {
    panel.open = true;
    panel.querySelector('summary')?.addEventListener('click', event => event.preventDefault());
  }
  const close = () => {
    document.body.classList.remove('notebook-menu-open');
    button.setAttribute('aria-expanded', 'false');
  };
  button.addEventListener('click', () => {
    const open = document.body.classList.toggle('notebook-menu-open');
    button.setAttribute('aria-expanded', String(open));
  });
  panel.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('click', event => {
    if (!panel.contains(event.target) && !button.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
})();
