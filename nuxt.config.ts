// https://nuxt.com/docs/api/configuration/nuxt-config

// For social share previews (Open Graph/Twitter), build absolute URLs based on deployment host.
// Configure via environment for flexible deployments (GitHub Pages subpath vs custom domain root)
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://social-it.store'
const BASE = process.env.NUXT_APP_BASE || process.env.NUXT_PUBLIC_BASE || '/'
const FULL_URL = `${SITE_URL}${BASE}`
const OG_IMAGE = `${FULL_URL}images/logo.png`
// Cache-bust for social scrapers (Kakao, Facebook, etc.)
const OG_IMAGE_VERSION = `${OG_IMAGE}?v=20251213`
// Use relative favicon to current origin to avoid mixed-content on HTTPS
const FAVICON = `${BASE}favicon.ico`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/animations.css'],
  ssr: false,  // SPA mode
  app: {
    baseURL: BASE,   // Controlled by env; '/' for custom domain, '/social_it/' for repo pages
    buildAssetsDir: '/_nuxt/', // default but explicit
    head: {
      title: "SOCIAL IT",
      meta: [
        { name: 'description', content: "감각적인 소셜 매칭 파티. 일정 확인과 신청, 위치 안내 및 소식 구독" },
        // Open Graph
        { property: 'og:title', content: 'SOCIAL IT - Social Matching Party' },
        { property: 'og:description', content: "SOCIAL IT - 감각적인 소셜 매칭 파티. 일정 확인과 신청, 위치 안내 및 소식 구독" },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: FULL_URL },
        { property: 'og:image', content: OG_IMAGE },
        { property: 'og:image:secure_url', content: OG_IMAGE_VERSION },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'SOCIAL IT 로고' },
        { property: 'og:site_name', content: 'SOCIAL IT' },
        { property: 'og:locale', content: 'ko_KR' },
        { property: 'og:updated_time', content: new Date().toISOString() },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'SOCIAL IT' },
        { name: 'twitter:description', content: "감각적인 소셜 매칭 파티. 일정 확인과 신청, 위치 안내 및 소식 구독" },
        { name: 'twitter:url', content: FULL_URL },
        { name: 'twitter:image', content: OG_IMAGE_VERSION },
        { name: 'twitter:image:alt', content: 'SOCIAL IT 로고' },
      ],
      link: [
        { rel: 'canonical', href: FULL_URL },
        { rel: 'icon', type: 'image/x-icon', href: FAVICON },
        { rel: 'shortcut icon', type: 'image/x-icon', href: FAVICON },
        { rel: 'apple-touch-icon', href: `${BASE}images/logo.png` },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;700;900&family=Nanum+Pen+Script&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
        }
      ],
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N9FVT3KW');`,
          type: 'text/javascript'
        }
      ]
    },
  },
  runtimeConfig: {
    // private (server only) - none used in SPA
    public: {
      // Default endpoint for serverless proxy (Netlify Functions). Override via NUXT_PUBLIC_SUBSCRIBE_ENDPOINT env.
      subscribeEndpoint: process.env.NUXT_PUBLIC_SUBSCRIBE_ENDPOINT || '/.netlify/functions/subscribe',
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/socialings/new-year-party']
    }
  }
})