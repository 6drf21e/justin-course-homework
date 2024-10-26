// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    '@nuxt/content',
    '@nuxt/image'
  ],
  colorMode: {
    classSuffix: ''
  },
  gtag: {
    id: process.env.GTAG_ID || 'G-XXXXXXXXXX'
  }
})