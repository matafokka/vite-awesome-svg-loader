import { mergeConfig, type UserConfig } from "vite";
import baseConfig from "./vite.config";
import { viteFileTreeBuilder } from "vite-file-tree-builder";

export default mergeConfig(baseConfig, {
  base: "./",
  plugins: [viteFileTreeBuilder()],
  build: {
    lib: {
      entry: "./src/lib.ts",
      fileName: "index",
      formats: ["es"],
    },

    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
} satisfies UserConfig);
