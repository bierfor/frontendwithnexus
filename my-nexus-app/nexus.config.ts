import type { NexusConfig } from '@nexus_js/cli';

export default {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },

  css: {
    entry: './src/global.css',
  },

  // Islands hydration strategy defaults
  defaultHydration: 'client:visible',

  // Image optimization
  images: {
    formats: ['avif', 'webp'],
    sizes: [640, 1280, 1920],
  },

  // Server options
  server: {
    port: 3000,
  },

  // Build output
  build: {
    outDir: '.nexus/output',
    sourcemap: false,
  },
} satisfies NexusConfig;
