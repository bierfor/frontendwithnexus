const KEY = 'pf_reader_key';
const STORAGE_KEY = 'puro-flusso-reader';

function uuid(): string {
  // Simple UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getReaderKey(): string {
  if (typeof window === 'undefined') return '';
  try {
    let k = localStorage.getItem(KEY) || localStorage.getItem(STORAGE_KEY);
    if (!k) {
      k = uuid();
      localStorage.setItem(KEY, k);
      localStorage.setItem(STORAGE_KEY, k);
    }
    return k;
  } catch {
    return '';
  }
}

export function ensureReaderKey(): string {
  const k = getReaderKey();
  if (!k && typeof window !== 'undefined') {
    const fresh = uuid();
    try {
      localStorage.setItem(KEY, fresh);
      localStorage.setItem(STORAGE_KEY, fresh);
    } catch {}
    return fresh;
  }
  return k;
}
