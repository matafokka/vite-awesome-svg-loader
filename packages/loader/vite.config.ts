import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "unplugin-dts/vite";
import pkgJson from "./package.json";
import rootPkgJson from "../../package.json";

export default defineConfig({
  plugins: [dts()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ViteAwesomeSvgLoader",
      fileName: "index",
      formats: ["es", "cjs"],
    },

    rollupOptions: {
      external: [
        ...Object.keys(pkgJson.dependencies),
        ...Object.keys(rootPkgJson.dependencies),
        "svgo/lib/xast.js",
        "node:fs/promises",
        "path",
      ],
    },
  },
});
