// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false,  // 추가
  app: {
    baseURL: '/social_it/',   // ★ 저장소 이름
    buildAssetsDir: '/_nuxt/' // 기본값이지만 명시해도 됨
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