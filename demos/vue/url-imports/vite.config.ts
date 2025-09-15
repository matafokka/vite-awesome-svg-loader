import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Import vite-awesome-svg-loader
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  plugins: [
    vue(),
    viteAwesomeSvgLoader({ urlImportsInLibraryMode: 'emit-files' }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
