import { localesConfig } from './i18n'

export default defineNuxtConfig({
  // ssr: false,
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_KEY: process.env.API_KEY
    }
  },
  css: [
    '@/assets/styles/main.scss'
  ],

  experimental: {
    typedPages: true
  },

  modules: [
    '@vueuse/nuxt',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'acceptHMRUpdate'],
      storesDirs: ['./stores/**']
    }],
    ['@nuxtjs/tailwindcss', { viewer: false }],
    ['@element-plus/nuxt', { importStyle: false }],
    ['@nuxtjs/i18n', {
      ...localesConfig,
      vueI18n: './i18n/i18n.config.ts'
    }],
    'unplugin-icons/nuxt',
    'nuxt-swiper'
  ]
})
