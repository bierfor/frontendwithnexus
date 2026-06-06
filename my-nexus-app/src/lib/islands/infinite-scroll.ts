import { gql } from '../gql.ts';
import { ARTICLES_QUERY } from '../queries.ts';
import { relativeTime } from '../date-utils.ts';

export default function init(root: HTMLElement) {
  const container = document.getElementById('articles-container');
  if (!container) {
    console.warn('[InfiniteScroll] Missing #articles-container');
    return;
  }

  const configEl = document.getElementById('revista-config');
  const locale = configEl?.getAttribute('data-locale') || 'es';
  const totalCount = parseInt(configEl?.getAttribute('data-total-count') || '0', 10);

  let offset = container.querySelectorAll(':scope > a').length;
  const limit = 12;
  let loading = false;
  let hasMore = totalCount > 0 ? totalCount > offset : offset > 0;

  console.log('[InfiniteScroll] Init → offset:', offset, 'totalCount:', totalCount, 'hasMore:', hasMore);

  // Use root directly as the loader container
  const loader = root;

  if (!hasMore) {
    loader.innerHTML =
      '<p class="text-center py-20 text-xs font-bold uppercase tracking-[0.3em] text-neutral-600">Fin del archivo</p>';
    return;
  }

  loader.innerHTML = `
    <button id="load-more-btn" class="px-6 py-3 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:border-accent/40 transition-all">
      Cargar más artículos
    </button>
    <div id="scroll-sentinel" class="h-4 w-full"></div>
  `;

  const btn = loader.querySelector<HTMLButtonElement>('#load-more-btn')!;
  const sentinel = loader.querySelector<HTMLDivElement>('#scroll-sentinel')!;

  let observer: IntersectionObserver;

  function buildCard(a: any): HTMLElement {
    const card = document.createElement('a');
    card.href = `/articulo/${a.slug}${locale !== 'es' ? '?lang=' + locale : ''}`;
    card.className =
      'revista-card-animate group block p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 hover:border-accent/20';

    const tagsHtml = (a.tags || [])
      .slice(0, 2)
      .map((t: any) => `<span>${t.name}</span>`)
      .join('');

    card.innerHTML = `
      <div class="relative aspect-[16/9] mb-6 overflow-hidden rounded-xl bg-neutral-900 border border-white/5 shadow-xl">
        <img src="${a.coverImage || 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&q=80'}" alt="${a.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      </div>
      <div class="flex gap-2 text-[10px] font-black uppercase tracking-widest text-accent mb-4">${tagsHtml}</div>
      <h3 class="font-display text-2xl leading-tight text-white mb-4 group-hover:text-accent transition-colors line-clamp-2">${a.title}</h3>
      ${a.excerpt ? `<p class="text-sm text-neutral-400 line-clamp-3 mb-6 font-light leading-relaxed">${a.excerpt}</p>` : ''}
      <div class="flex items-center justify-between pt-4 border-t border-white/5">
        <div class="flex items-center gap-3 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
          <span>${a.readTimeMinutes || 6} min</span>
          <span class="w-1 h-1 rounded-full bg-neutral-700"></span>
          <span>${relativeTime(a.publishedAt)}</span>
        </div>
        <span class="text-[10px] font-black text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">LEER →</span>
      </div>
    `;
    return card;
  }

  async function loadMore() {
    if (loading || !hasMore) return;
    loading = true;
    btn.disabled = true;
    btn.textContent = 'Cargando…';

    const spinner = document.createElement('div');
    spinner.className = 'flex justify-center py-8 w-full col-span-full';
    spinner.innerHTML =
      '<div class="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>';
    loader.insertBefore(spinner, btn);

    try {
      console.log('[InfiniteScroll] Fetching offset:', offset, 'limit:', limit);
      const data = await gql(ARTICLES_QUERY, { limit, offset }, { locale });
      const articles: any[] = data?.articles || [];
      console.log('[InfiniteScroll] Received:', articles.length, 'articles');

      spinner.remove();

      if (articles.length === 0) {
        hasMore = false;
      } else {
        articles.forEach((a: any) => {
          const card = buildCard(a);
          container!.appendChild(card);
        });
        offset += articles.length;
        if (articles.length < limit) {
          hasMore = false;
        }
      }

      if (!hasMore) {
        btn.remove();
        sentinel.remove();
        loader.innerHTML =
          '<p class="text-center py-20 text-xs font-bold uppercase tracking-[0.3em] text-neutral-600">Fin del archivo</p>';
        observer?.disconnect();
      } else {
        btn.disabled = false;
        btn.textContent = 'Cargar más artículos';
      }
    } catch (e) {
      console.error('[InfiniteScroll] Error:', e);
      spinner.remove();
      btn.disabled = false;
      btn.textContent = 'Reintentar';
      const err = document.createElement('p');
      err.className = 'text-center py-4 text-xs text-red-400 font-bold uppercase tracking-widest';
      err.textContent = 'Error al cargar. Intenta de nuevo.';
      loader.insertBefore(err, btn);
      setTimeout(() => err.remove(), 4000);
    } finally {
      loading = false;
    }
  }

  btn.addEventListener('click', () => void loadMore());

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        void loadMore();
      }
    },
    { rootMargin: '400px' }
  );

  observer.observe(sentinel);

  const rect = sentinel.getBoundingClientRect();
  if (rect.top < window.innerHeight + 400 && rect.bottom >= 0 && hasMore) {
    void loadMore();
  }
}
