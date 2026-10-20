'use strict';

const tocPanel = document.getElementById('toc-panel');
const tocButton = document.getElementById('toc-button');
const tocList = document.getElementById('toc-list');
const headings = [...document.querySelectorAll('main section > h2, main section > h3')];
const navLinks = [];

for (const heading of headings) {
  const isChapter = heading.tagName === 'H2';
  const target = isChapter ? heading.parentElement.id : heading.id;
  const item = document.createElement('li');
  if (!isChapter) item.className = 'subitem';
  const link = document.createElement('a');
  link.href = '#' + target;
  link.textContent = (isChapter ? target.slice(2) + ' · ' : '') + heading.textContent.trim();
  item.append(link);
  tocList.append(item);
  navLinks.push(link);
}

function closeToc() {
  tocPanel.classList.remove('open');
  tocButton.setAttribute('aria-expanded', 'false');
}
tocButton.addEventListener('click', () => {
  const open = tocPanel.classList.toggle('open');
  tocButton.setAttribute('aria-expanded', String(open));
});
tocPanel.addEventListener('click', event => {
  if (event.target.closest('a')) closeToc();
});
document.addEventListener('click', event => {
  if (!tocPanel.contains(event.target) && !tocButton.contains(event.target)) closeToc();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeToc();
});

let pendingFrame = false;
let activeIndex = -1;
function updateReadingPosition() {
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  const fraction = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
  document.getElementById('read-progress').style.width = (fraction * 100) + '%';
  document.getElementById('read-percent').textContent = Math.round(fraction * 100) + '%';
  let current = -1;
  for (let i = 0; i < headings.length; i++) {
    if (headings[i].getBoundingClientRect().top <= 140) current = i;
    else break;
  }
  if (current !== activeIndex) {
    if (activeIndex >= 0) {
      navLinks[activeIndex].classList.remove('active');
      navLinks[activeIndex].removeAttribute('aria-current');
    }
    if (current >= 0) {
      const link = navLinks[current];
      link.classList.add('active');
      link.setAttribute('aria-current', 'location');
      const y = link.offsetTop;
      if (y < tocPanel.scrollTop || y > tocPanel.scrollTop + tocPanel.clientHeight - 90) {
        tocPanel.scrollTop = Math.max(0, y - tocPanel.clientHeight / 3);
      }
    }
    if (current < 0) tocPanel.scrollTop = 0;
    activeIndex = current;
  }
  pendingFrame = false;
}
function schedulePositionUpdate() {
  if (!pendingFrame) {
    pendingFrame = true;
    requestAnimationFrame(updateReadingPosition);
  }
}
addEventListener('scroll', schedulePositionUpdate, {passive: true});
addEventListener('resize', schedulePositionUpdate);
addEventListener('load', schedulePositionUpdate);
document.querySelectorAll('main img').forEach(img => img.addEventListener('load', schedulePositionUpdate));
updateReadingPosition();

const themeButton = document.getElementById('theme-toggle');
try {
  const stored = localStorage.getItem('zr0-notebook-theme');
  if (stored === 'light' || stored === 'dark') document.documentElement.dataset.theme = stored;
} catch { /* Reading works when browser storage is unavailable. */ }
themeButton.addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('zr0-notebook-theme', root.dataset.theme); } catch { /* Optional preference. */ }
});

const viewer = document.getElementById('image-viewer');
for (const button of document.querySelectorAll('[data-zoom]')) {
  button.addEventListener('click', () => {
    const img = document.getElementById('viewer-image');
    img.src = button.dataset.zoom;
    img.alt = button.dataset.caption;
    document.getElementById('viewer-caption').textContent = button.dataset.caption;
    viewer.showModal();
  });
}
document.getElementById('viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const rect = viewer.getBoundingClientRect();
  if (event.target === viewer && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) viewer.close();
});

const maskStage = document.getElementById('mask-stage');
function updateMaskLab() {
  const training = maskStage.value === 'train';
  document.querySelectorAll('#mask-lab .ecot-col').forEach(cell => cell.classList.toggle('absent', !training));
  document.getElementById('lm-status').textContent = training ? '✓ 计算语言损失' : '不生成，也不计算损失';
  document.getElementById('mask-output').textContent = training
    ? '训练：ECoT 参与语言监督，更新 VLM 参数；动作专家仍只读取 prompt 特征，不读取 ECoT 输出位置。'
    : '推理：移除 ECoT 自回归解码与语言损失；prompt 前向和动作积分保留，动作专家可读取的条件仍是 prompt。';
}
maskStage.addEventListener('change', updateMaskLab);
updateMaskLab();

const noiseInput = document.getElementById('euler-noise');
const targetInput = document.getElementById('euler-target');
const stepsInput = document.getElementById('euler-steps');
const kInput = document.getElementById('euler-k');
const fmt = value => Number(value.toFixed(4)).toString();
function updateEulerLab() {
  const count = Number(stepsInput.value);
  kInput.max = String(count);
  const k = Math.min(count, Math.max(0, Number(kInput.value)));
  kInput.value = String(k);
  document.getElementById('euler-k-label').textContent = k + ' / ' + count;
  const noise = noiseInput.valueAsNumber;
  const target = targetInput.valueAsNumber;
  const output = document.getElementById('euler-output');
  if (!noiseInput.checkValidity() || !targetInput.checkValidity() || !Number.isFinite(noise) || !Number.isFinite(target)) {
    output.textContent = '请输入 −10 到 10 之间的有效数值。';
    return;
  }
  const velocity = target - noise;
  const step = velocity / count;
  const position = noise + k * step;
  output.textContent = '理想速度 u* = ' + fmt(velocity) + '；每次更新 Δτ·u* = ' + fmt(step)
    + '。第 ' + k + ' 步 τ = ' + fmt(k / count) + '，候选动作 = ' + fmt(position)
    + (k === count ? '，恰好到达预设教学终点。真实模型的速度预测会有误差。' : '。这是归一化动作数值，不是已执行的机器人动作。');
}
for (const input of [noiseInput, targetInput, stepsInput, kInput]) {
  input.addEventListener('input', updateEulerLab);
}
updateEulerLab();

// Direct links to supplemental source still reveal the requested excerpt.
function revealLinkedSource() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  const fold = target?.closest('.source-code-fold');
  if (fold) fold.open = true;
}
addEventListener('hashchange', revealLinkedSource);
revealLinkedSource();
document.querySelectorAll('.source-code-fold').forEach(fold => {
  fold.addEventListener('toggle', schedulePositionUpdate);
});
