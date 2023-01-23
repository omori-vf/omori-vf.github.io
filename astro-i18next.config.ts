import type { AstroI18nextConfig } from "astro-i18next";

const config: AstroI18nextConfig = {
  defaultLocale: "en",
  locales: ["en", "fr"],
  load: ["server"],
  i18nextServer: {
    debug: true,
    backend: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json",
    },
  },
};

export default config;
