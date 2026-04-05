import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages",
  },

  runtimeConfig: {
    public: {
      apiUrl: "",
    },
  },

  app: {
    head: {
      title: "Orbix",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }],
    },
  },
  css: ["~/assets/styles/globals.css"],
  modules: ["@nuxt/icon"],

  vite: {
    plugins: [...(tailwindcss() as any)],
  },
});
