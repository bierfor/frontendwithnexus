export default function init(root: HTMLElement) {
  const json = root.getAttribute('data-json');
  if (!json) return;
  const target = document.getElementById('article-md');
  if (!target) return;
  try {
    target.innerHTML = JSON.parse(json);
  } catch {}
}
