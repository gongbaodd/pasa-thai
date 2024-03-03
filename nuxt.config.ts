import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/ionic"],
  ssr: false,
  routeRules: {
    "/": {
      prerender: false,
    },
  },
});
