export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },

  modules: ['@vite-pwa/nuxt'],

  css: ['~/assets/main.css'],

  runtimeConfig: {
    // Server-only. Set NUXT_DATABASE_URL in .env (local) or in Render's environment.
    databaseUrl: '',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ar', dir: 'rtl' },
      title: 'مين إنت من شخصيات باب الحارة؟',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Which Bab Al-Hara character are you? Answer 8 questions and find out.' },
        { name: 'theme-color', content: '#3b2416' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@700&display=swap' },
      ],
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'باب الحارة: مين إنت؟',
      short_name: 'باب الحارة',
      description: 'Which Bab Al-Hara character are you?',
      lang: 'ar',
      dir: 'rtl',
      start_url: '/',
      display: 'standalone',
      background_color: '#f3e7d3',
      theme_color: '#3b2416',
      icons: [
        { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    generateSW: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
    client: { installPrompt: true },
    devOptions: { enabled: false },
  },
})
