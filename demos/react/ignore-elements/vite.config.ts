import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Import vite-awesome-svg-loader
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  plugins: [
    react(),
    viteAwesomeSvgLoader({
      preserveLineWidthList: ["ignore-elements.svg"],
      replaceColorsList: ["ignore-elements.svg"],

      // A list of selectors to skip while preserving line width
      skipPreserveLineWidthSelectors: [
        // It can be a list of CSS selectors like this one. Every element in every file will be checked against it.
        '*[data-original-line-width="true"], *[data-original-line-width="true"] *',

        // Or it can be configured on per-file basis:
        {
          files: [/ignore-elements\.svg/, /some-other-file\.svg/],
          selectors: ['*[data-original-line-width="true"], *[data-original-line-width="true"] *'],
        },
      ],

      // These options are not recommended for architectural and performance reasons:

      // A list of selectors to skip while replacing colors. Same format as above.
      skipReplaceColorsSelectors: ['*[data-original-color="true"], *[data-original-color="true"] *'],

      // A list of selectors to skip while transforming. Same format as above.
      skipTransformsSelectors: ['*[data-no-transforms="true"], *[data-no-transforms="true"] *'],

      urlImportsInLibraryMode: "emit-files",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
