import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteAwesomeSvgLoader } from "vite-awesome-svg-loader";

export default defineConfig({
  base: "./",
  plugins: [
    viteAwesomeSvgLoader({
      replaceColorsList: [
        {
          files: ["multicolor.svg"],
          replacements: {
            red: "cyan",
            blue: "magenta",
            green: "yellow",
          },
        },
      ],
      urlImportsInLibraryMode: "emit-files",
    }),
    dts({
      rollupTypes: true,
      bundledPackages: ["types"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: (_, entry) => entry + ".js",
      formats: ["es"],
    },
  },
});
