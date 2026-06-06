import { backendBaseUrl } from '../backend-url.ts';

export default function init(root: HTMLElement) {
  const form = root.querySelector('form') as HTMLFormElement;
  const statusEl = root.querySelector('#lead-status') as HTMLElement;

  if (!form) return;

  // Prefer server-provided backend url (from load) for client-side calls
  const dataBackend = root.dataset.backend;
  if (dataBackend) {
    // monkey patch for this init
    (globalThis as any).__BACKEND_URL = dataBackend;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('#email') as HTMLInputElement;
    const interestsInput = form.querySelector('#interests') as HTMLInputElement;
    const email = emailInput?.value.trim();
    if (!email) return;

    statusEl.textContent = 'Enviando...';

    try {
      const base = backendBaseUrl();
      const res = await fetch(`${base}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          interests: interestsInput?.value.trim() || undefined,
          source: 'nexus-frontend',
        }),
      });
      if (res.ok) {
        statusEl.textContent = '¡Gracias! Revisa tu bandeja.';
        form.reset();
      } else {
        statusEl.textContent = 'No se pudo registrar. Intenta de nuevo.';
      }
    } catch {
      statusEl.textContent = 'Error de red. Prueba más tarde.';
    }
  });
}
