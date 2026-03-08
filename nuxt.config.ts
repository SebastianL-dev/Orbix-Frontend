export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "Orbix",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  css: ["~/assets/styles/globals.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
});