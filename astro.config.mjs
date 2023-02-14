import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import svelte from "@astrojs/svelte";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import { promises as fs } from "fs";
import crypto from "crypto";
import os from "os";

export default defineConfig({
  site: "https://www.omori-en-francais.com/",
  integrations: [
    astroI18next(),
    svelte(),
    sitemap(),
    compress({
      img: {
        webp: false,
        png: true,
      },
    }),
    {
      name: "Generate inline script hashes for each page",
      hooks: {
        "astro:build:done": async (options) => {
          await Promise.all(
            options.pages.map(async (page) => {
              // pathname starts with / on windows for some reason
              const base =
                os.platform() === "win32" &&
                options.dir.pathname.startsWith("/")
                  ? options.dir.pathname.substring(1)
                  : options.dir.pathname;

              const path = `${base}${page.pathname}index.html`;
              const file = await fs.readFile(path, "utf-8");

              const scriptMatches = [
                ...file.matchAll(/<script>(.+?)<\/script>/g),
              ];

              const scriptHashes = scriptMatches.map((match) => {
                const hash = crypto.createHash("sha256");
                // first capture is on index 1
                const generatedHash = hash
                  .update(match[1], "utf-8")
                  .digest("base64");

                return `'sha256-${generatedHash}'`;
              });

              let newFile = file.replace(
                /script-src 'self' 'unsafe-inline'/,
                `script-src 'self' ${scriptHashes.join(" ")}`
              );

              await fs.writeFile(path, newFile, { encoding: "utf-8" });
            })
          );
        },
      },
    },
  ],
});
