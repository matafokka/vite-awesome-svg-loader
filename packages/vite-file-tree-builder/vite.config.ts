import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "unplugin-dts/vite";
import pkgJson from "./package.json";
import rootPkgJson from "../../package.json";

export default defineConfig({
  plugins: [dts({ copyDtsFiles: true, clearPureImport: false })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ViteFileTreeBuilder",
      fileName: "index",
      formats: ["es", "cjs"],
    },

    rollupOptions: {
      external: [...Object.keys(pkgJson.dependencies), ...Object.keys(rootPkgJson.dependencies), "node:fs/promises", "path"],
    },
  },
});
