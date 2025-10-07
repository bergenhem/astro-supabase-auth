import { defineConfig, envField } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  output: "server",
  integrations: [],
  adapter: netlify(),
});
