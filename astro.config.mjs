import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import svelte from "@astrojs/svelte";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.omori-en-francais.com/",
  integrations: [
    astroI18next(),
    svelte(),
    compress({
      img: {
        webp: false,
        png: true,
      },
    }),
    sitemap(),
  ],
});
