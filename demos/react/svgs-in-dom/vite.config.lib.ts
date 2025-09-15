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
      external: ["react", "react/jsx-runtime", "react-dom"],
      output: {
        globals: {
          "react": "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
} satisfies UserConfig);
