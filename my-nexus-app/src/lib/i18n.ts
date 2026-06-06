/**
 * i18n — aligned with nexus.config.ts `i18n.locales`.
 * Resolve locale per request: ?lang= → cookie nx-lang → Accept-Language → default.
 */

export type Locale = 'es' | 'en';

export const LOCALES: Locale[] = ['es', 'en'];
export const DEFAULT_LOCALE: Locale = 'es';

type CtxLike = {
  url: URL;
  getCookie: (name: string) => string | undefined;
  request: Request;
};

function isLocale(s: string | undefined | null): s is Locale {
  return s === 'es' || s === 'en';
}

/** Active locale for this request (use in templates: getLocale(ctx)). */
export function getLocale(ctx: CtxLike): Locale {
  const q = ctx.url.searchParams.get('lang') ?? ctx.url.searchParams.get('locale');
  if (isLocale(q)) return q;
  const ck = ctx.getCookie('nx-lang');
  if (isLocale(ck)) return ck;
  const al = ctx.request.headers.get('accept-language');
  if (al) {
    const first = al.split(',')[0]?.trim().split('-')[0]?.toLowerCase();
    if (first === 'es' || first === 'en') return first as Locale;
  }
  return DEFAULT_LOCALE;
}

/** Same path + query, with `lang` set (preserves other search params). */
export function langHref(ctx: CtxLike, locale: Locale): string {
  const u = new URL(ctx.url.href);
  u.searchParams.set('lang', locale);
  return u.pathname + u.search;
}

/** Internal link with current locale in `lang` (e.g. `/islands?lang=es`). */
export function pathWithLang(ctx: CtxLike, pathname: string): string {
  const u = new URL(ctx.url.href);
  u.pathname = pathname;
  u.searchParams.set('lang', getLocale(ctx));
  return u.pathname + u.search;
}

export function layoutCopy(locale: Locale) {
  const t: Record<Locale, any> = {
    es: {
      appName: 'Puro Flusso',
      metaDescription:
        'Recupera tu tiempo y claridad. Minimalismo digital, productividad consciente y lecturas que importan.',
      navHome: 'Inicio',
      navRevista: 'Revista',
      navRelampago: 'Relámpago',
      navBoletin: 'Boletín',
      navSobre: 'Sobre',
      navAria: 'Principal',
      langAria: 'Idioma',
      footerTagline: 'Claridad · Foco · Lecturas que importan',
      footerMade: 'Hecho con',
      footerLinks: 'Legal',
    },
    en: {
      appName: 'Puro Flusso',
      metaDescription:
        'Reclaim your time and clarity. Digital minimalism, conscious productivity and writing that matters.',
      navHome: 'Home',
      navRevista: 'Revista',
      navRelampago: 'Flash',
      navBoletin: 'Newsletter',
      navSobre: 'About',
      navAria: 'Main',
      langAria: 'Language',
      footerTagline: 'Clarity · Focus · Writing that matters',
      footerMade: 'Built with',
      footerLinks: 'Legal',
    },
  };
  return t[locale];
}

export function langActiveClass(ctx: CtxLike, locale: Locale): string {
  return getLocale(ctx) === locale ? 'nx-lang-btn--on' : '';
}

export function homeCopy(locale: Locale) {
  const t: Record<Locale, any> = {
    es: {
      siteTitle: 'Puro Flusso',
      metaDesc: 'Recupera tu tiempo y claridad. Minimalismo digital, productividad consciente y lecturas esenciales.',
      heroKicker: 'Puro Flusso',
      heroHeadline: 'El fin de la obesidad digital',
      heroSub: 'Recupera 10 horas a la semana. Lecturas profundas, foco sostenido y claridad sin ruido.',
      ctaRead: 'Empezar a leer',
      ctaRevista: 'Ver la revista',
      flashTitle: 'Relámpago',
      flashMore: 'Ver todas',
      moreTitle: 'Más lecturas',
      moreCta: 'Archivo completo',
      recsTitle: 'Lecturas recomendadas',
    },
    en: {
      siteTitle: 'Puro Flusso',
      metaDesc: 'Reclaim your time and clarity. Digital minimalism, conscious productivity and writing that matters.',
      heroKicker: 'Puro Flusso',
      heroHeadline: 'The end of digital obesity',
      heroSub: 'Reclaim 10 hours a week. Deep reading, sustained focus and clarity without noise.',
      ctaRead: 'Start reading',
      ctaRevista: 'Browse revista',
      flashTitle: 'Flash',
      flashMore: 'See all',
      moreTitle: 'More reading',
      moreCta: 'Full archive',
      recsTitle: 'Recommended reads',
    },
  };
  return t[locale];
}

// Additional page copies for the news site (es/en)
export function articleCopy(locale: Locale) {
  const t: Record<Locale, any> = {
    es: {
      back: '← Volver',
      recs: 'Te puede interesar',
      share: 'Compartir',
      readTime: 'min de lectura',
      views: 'vistas',
      engagementNote: 'Gracias por leer. Tus intereses ayudan a mejorar las recomendaciones.',
    },
    en: {
      back: '← Back',
      recs: 'You might like',
      share: 'Share',
      readTime: 'min read',
      views: 'views',
      engagementNote: 'Thanks for reading. Your interests help improve recommendations.',
    },
  };
  return t[locale];
}

export function flashCopy(locale: Locale) {
  const t: Record<Locale, any> = {
    es: { title: 'Noticias Relámpago', lead: 'Ultracortas. Esenciales.' },
    en: { title: 'Flash News', lead: 'Ultra-short. Essential.' },
  };
  return t[locale];
}

export function pageIslandsCopy(ctx: CtxLike) {
  const locale = getLocale(ctx);
  const t: Record<Locale, any> = {
    es: {
      presKicker: 'Arquitectura de Islas',
      pageTitle: 'Interactividad sin peso',
      lead: 'Nexus utiliza el patrón de Islas para enviar Zero JS al navegador por defecto. Solo los componentes marcados se hidratan.',
      s1h: '¿Cómo funciona?',
      s1p: 'El servidor renderiza todo el HTML. Los componentes estáticos se quedan como HTML puro. Las islas se marcan para ser hidratadas en el cliente.',
      diagramAria: 'Diagrama de flujo de hidratación',
      flowSrv: 'Servidor',
      flowHtml: 'HTML estático',
      flowJs: 'JS de la isla',
      flowOk: 'Interactivo',
      s2h: 'Directivas de cliente',
      thDirective: 'Directiva',
      thWhen: '¿Cuándo se hidrata?',
      thUse: 'Uso ideal',
      r1: ['client:load', 'Inmediatamente al cargar la página', 'Componentes críticos como el Header o buscadores.'],
      r2: ['client:idle', 'Cuando el navegador está inactivo', 'Componentes secundarios o decorativos.'],
      r3: ['client:visible', 'Al entrar en el viewport', 'Formularios al final de la página o carruseles.'],
      r4: ['client:media', 'Al cumplir una media query', 'Menús móviles que solo existen en pantallas pequeñas.'],
      r5: ['server:only', 'Nunca (solo servidor)', 'Cualquier cosa que no necesite JS.'],
      s3h: 'Ventajas clave',
      l1: 'Mejor TBT (Total Blocking Time)',
      l2: 'Menos datos transferidos',
      l3: 'SEO perfecto (HTML completo)',
      l4: 'Hidratación parcial y selectiva',
      s4h: 'Zero JS por defecto',
      s4p: 'Si no usas una directiva client:*, Nexus no enviará ni un solo byte de JavaScript al cliente para ese componente.',
      s4muted: 'Esto resulta en una carga instantánea y una experiencia fluida incluso en dispositivos lentos.',
      s5h: 'Demo interactiva',
      s5p: 'Este contador es una isla hidratada con client:visible.',
    },
    en: {
      presKicker: 'Islands Architecture',
      pageTitle: 'Weightless Interactivity',
      lead: 'Nexus uses the Islands pattern to ship Zero JS to the browser by default. Only marked components are hydrated.',
      s1h: 'How does it work?',
      s1p: 'The server renders all HTML. Static components remain as pure HTML. Islands are marked for client-side hydration.',
      diagramAria: 'Hydration flow diagram',
      flowSrv: 'Server',
      flowHtml: 'Static HTML',
      flowJs: 'Island JS',
      flowOk: 'Interactive',
      s2h: 'Client Directives',
      thDirective: 'Directive',
      thWhen: 'When is it hydrated?',
      thUse: 'Ideal use',
      r1: ['client:load', 'Immediately on page load', 'Critical components like Header or search bars.'],
      r2: ['client:idle', 'When browser is idle', 'Secondary or decorative components.'],
      r3: ['client:visible', 'When entering viewport', 'Forms at the bottom of the page or carousels.'],
      r4: ['client:media', 'When matching media query', 'Mobile menus that only exist on small screens.'],
      r5: ['server:only', 'Never (server only)', 'Anything that doesn\'t need JS.'],
      s3h: 'Key Advantages',
      l1: 'Better TBT (Total Blocking Time)',
      l2: 'Less data transferred',
      l3: 'Perfect SEO (Full HTML)',
      l4: 'Partial and selective hydration',
      s4h: 'Zero JS by default',
      s4p: 'If you don\'t use a client:* directive, Nexus won\'t ship a single byte of JavaScript to the client for that component.',
      s4muted: 'This results in instant loading and a smooth experience even on slow devices.',
      s5h: 'Interactive Demo',
      s5p: 'This counter is an island hydrated with client:visible.',
    },
  };
  return t[locale];
}
// Helpers used by layouts and pages
export function pageHomeCopy(ctx: CtxLike) {
  return homeCopy(getLocale(ctx));
}

export function getCurrentLocale(ctx: CtxLike) {
  return getLocale(ctx);
}
