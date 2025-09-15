import { defineConfig } from "tsup";

export default defineConfig(() => ({
  name: "vite-file-tree-builder",
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  bundle: true,
  clean: true,
  dts: {
    // TODO: Somehow make declarations work without <reference types="vite-file-tree-builder" />

    // Create a reference to the ambient module with type declarations. Tsup builds regular module where
    // "declare module" doesn't work. This import, however, works somehow and doesn't break backwards compatibility.
    // If it'll break, we can do a subpath export with this .d.ts like Vite is doing.
    footer: `import "./declarations";`,
  },
}));
