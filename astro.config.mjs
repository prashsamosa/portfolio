import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "nord",
      wrap: true,
    },
  },
  integrations: [
    react({
      // Removed Babel configuration for React Compiler
      // You can add SWC specific options here if @astrojs/react supports them
      // directly for transformations, but typically Astro handles SWC internally
      // for its own build process.
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
