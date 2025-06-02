import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Define React Compiler configuration
const ReactCompilerConfig = {
  /* your compiler config here */
};

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
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
