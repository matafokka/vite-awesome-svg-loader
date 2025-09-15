import { mergeConfig, type UserConfig } from "vite";
import baseConfig from "./vite.config";
import { viteFileTreeBuilder } from "vite-file-tree-builder";
import { viteAstroEntryGenerator } from "vite-astro-entry-generator";

export default mergeConfig(baseConfig, {
  base: "./",
  plugins: [viteFileTreeBuilder(), viteAstroEntryGenerator()],
  build: {
    lib: {
      entry: {
        index: "./src/lib.ts",
        app: "./src/main.ts",
      },
      fileName: (_, entry) => entry + ".js",
      formats: ["es"],
    },
  },
} satisfies UserConfig);
