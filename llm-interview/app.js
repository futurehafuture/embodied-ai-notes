(() => {
  const root = document.documentElement;
  const toc = document.getElementById('toc');
  const toggle = document.getElementById('toc-toggle');
  const theme = document.getElementById('theme-toggle');
  const progress = document.getElementById('reading-progress');
  const links = [...toc.querySelectorAll('ol a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const storedTheme = localStorage.getItem('llm-interview-theme');
  if (storedTheme === 'dark' || storedTheme === 'light') root.dataset.theme = storedTheme;
  const updateThemeLabel = () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    theme.textContent = dark ? '切换浅色' : '切换深色';
  };
  updateThemeLabel();
  theme.addEventListener('click', () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'light' : 'dark';
    localStorage.setItem('llm-interview-theme', root.dataset.theme);
    updateThemeLabel();
  });

  toggle.addEventListener('click', () => {
    const open = toc.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.forEach(link => link.addEventListener('click', () => {
    toc.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  let scheduled = false;
  const updatePosition = () => {
    scheduled = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 100}%`;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top < 170) current = section;
      else break;
    }
    links.forEach(link => {
      const active = link.getAttribute('href') === `#${current.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updatePosition); }
  }, {passive: true});
  addEventListener('resize', updatePosition);
  updatePosition();
})();
