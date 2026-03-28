import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// Import vite-awesome-svg-loader
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  plugins: [
    viteAwesomeSvgLoader({
      // Files to preserve line width of
      preserveLineWidthList: [/preserve-line-width\//, /all\//],

      // Files to replace colors of
      replaceColorsList: [/set-current-color\//, /all\//],

      // A list of files to skip while preserving line width
      skipPreserveLineWidthList: [/line-width-not-preserved\.svg/],

      // A list of files to skip while replacing colors
      skipReplaceColorsList: [/colors-not-replaced\.svg/],

      // A list of files to skip while transforming (applies to any transformation except SVGO)
      skipTransformsList: [/skip-transforms\.svg/, /ignore-elements-orig\.svg/],

      // A list of files to skip loading of. These files will be passed to another loader.
      skipFilesList: [/skip-loading\.svg/],

      urlImportsInLibraryMode: "emit-files",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
