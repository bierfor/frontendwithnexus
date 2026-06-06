import { gql } from '../gql.ts';
import { RECORD_READER_ENGAGEMENT_MUTATION } from '../queries.ts';
import { ensureReaderKey } from '../reader-key.ts';

export default function init(root: HTMLElement) {
  const slug = root.dataset.slug;
  if (!slug) return;

  const key = ensureReaderKey();
  if (!key) return;

  let recorded = false;

  const record = async () => {
    if (recorded) return;
    recorded = true;
    try {
      await gql(RECORD_READER_ENGAGEMENT_MUTATION, { readerKey: key, articleSlug: slug });
    } catch {}
  };

  // Record after reading for a bit or on scroll to 40%
  const onScroll = () => {
    const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (scrolled > 0.4) {
      record();
      window.removeEventListener('scroll', onScroll);
    }
  };

  setTimeout(record, 45000); // after ~45s reading
  window.addEventListener('scroll', onScroll, { passive: true });

  // Also record on visibility leave if deep
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') record();
  }, { once: true });
}
