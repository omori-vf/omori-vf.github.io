import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: "https://omori-vf.github.io/",
  base: "/omori-vf.github.io",
  integrations: [astroI18next()],
});
