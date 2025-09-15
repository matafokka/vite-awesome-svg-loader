import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// Import vite-awesome-svg-loader
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  plugins: [viteAwesomeSvgLoader({ urlImportsInLibraryMode: "emit-files" })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
