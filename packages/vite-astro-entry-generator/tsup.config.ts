import { defineConfig } from "tsup";

export default defineConfig(() => ({
  name: "vite-astro-entry-generator",
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  bundle: true,
  clean: true,
  dts: true,
}));
