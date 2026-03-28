import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import pkgJson from "./package.json";
import rootPkgJson from "../../package.json";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./cypress", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [...Object.keys(pkgJson.dependencies), ...Object.keys(rootPkgJson.dependencies)],
    },
  },
});
