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
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})