// https://nuxt.com/docs/api/configuration/nuxt-config

// For social share previews (Open Graph/Twitter), build absolute URLs based on deployment host.
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://leesungki.github.io'
const BASE = '/social_it/'
const FULL_URL = `${SITE_URL}${BASE}`
const OG_IMAGE = `${FULL_URL}images/logo.png`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false,  // 추가
  app: {
    baseURL: BASE,   // ★ 저장소 이름
    buildAssetsDir: '/_nuxt/', // 기본값이지만 명시해도 됨
    head: {
      title: "Social It - Social Matching Party",
      meta: [
        { name: 'description', content: "Social It - 감각적인 소셜 매칭 파티. 일정 확인과 신청, 위치 안내 및 소식 구독" },
        // Open Graph
        { property: 'og:title', content: 'Social It - Social Matching Party' },
        { property: 'og:description', content: "Social It - 감각적인 소셜 매칭 파티. 일정 확인과 신청, 위치 안내 및 소식 구독" },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: FULL_URL },
        { property: 'og:image', content: OG_IMAGE },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Social It - Social Matching Party' },
        { name: 'twitter:description', content: "Social It - 감각적인 소셜 매칭 파티. 일정 확인과 신청, 위치 안내 및 소식 구독" },
        { name: 'twitter:image', content: OG_IMAGE },
      ],
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
      routes: ['/']
    }
  }
})