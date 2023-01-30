import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://www.omori-en-francais.com/",
  integrations: [astroI18next(), svelte(), compress()]
});