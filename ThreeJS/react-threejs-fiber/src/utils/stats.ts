import Stats from 'stats-js';

export function initStats() {
  const stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  const el = document.createElement('div');
  el.id = 'Stats-output';
  el.appendChild(stats.domElement);
  document.body.appendChild(el);
  return stats;
}
