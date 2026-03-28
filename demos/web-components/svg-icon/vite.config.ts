import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// Import vite-awesome-svg-loader
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  plugins: [
    viteAwesomeSvgLoader({
      preserveLineWidthList: [/icons\//, /lineart\//], // Files to preserve line width of
      replaceColorsList: [/icons\//, /lineart\//], // Files to replace colors of
      urlImportsInLibraryMode: "emit-files",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
