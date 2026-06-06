export default function init(root: HTMLElement) {
  const twitterBtn = root.querySelector<HTMLButtonElement>('#share-twitter');
  const linkedinBtn = root.querySelector<HTMLButtonElement>('#share-linkedin');
  const copyBtn = root.querySelector<HTMLButtonElement>('#share-copy');
  const copyFeedback = root.querySelector<HTMLSpanElement>('#copy-feedback');

  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  twitterBtn?.addEventListener('click', () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      '_blank',
      'width=600,height=400'
    );
  });

  linkedinBtn?.addEventListener('click', () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
      'width=600,height=400'
    );
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (copyFeedback) {
        copyFeedback.textContent = '¡Copiado!';
        setTimeout(() => (copyFeedback.textContent = ''), 2000);
      }
    } catch {
      if (copyFeedback) {
        copyFeedback.textContent = 'Error al copiar';
        setTimeout(() => (copyFeedback.textContent = ''), 2000);
      }
    }
  });
}
