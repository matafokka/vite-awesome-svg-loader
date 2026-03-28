import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { viteSvgDeclarationsBuilder } from "./src/vite-svg-declarations-builder";
import { join } from "path";
import { ENTRIES, INTERNAL_PACKAGES } from "./src/generated/cfg";
import sourcemaps from "rollup-plugin-sourcemaps2";

import { viteBuildPackageJson } from "./src/vite-build-package-json";
import { viteCopyReadme } from "./src/vite-copy-readme";
import { viteCopyDts } from "./src/vite-copy-dts";

// Common data

const packagesDir = join(__dirname, "..").replaceAll("\\", "/");
const entries: Record<string, string> = {};

for (const entry in ENTRIES) {
  const entryPath = ENTRIES[entry];
  entries[entry] = join(__dirname, entryPath);
}

export default defineConfig({
  plugins: [sourcemaps(), viteSvgDeclarationsBuilder(), viteBuildPackageJson(), viteCopyReadme(), viteCopyDts()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    sourcemap: true,

    lib: {
      entry: entries,
      name: "AwesomeSvgLoader",
      formats: ["es", "cjs"],
      fileName: (format, entry) => `${entry}/index.${format.includes("es") ? "js" : "cjs"}`,
    },

    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
      },

      external: (source, importer) => {
        if (source.startsWith("./")) {
          return !!importer && isExternalSource(importer);
        }

        return isExternalSource(source);
      },

      output: {
        manualChunks: (id) => {
          for (const entry in ENTRIES) {
            if (id.includes(`packages/${entry}`)) {
              return `${entry}/index`;
            }
          }
        },
      },
    },
  },
});

function isExternalSource(source: string) {
  source = source.replaceAll("\\", "/");

  if (source.startsWith(packagesDir)) {
    return false;
  }

  for (const matcher of INTERNAL_PACKAGES) {
    if (source === matcher || source.startsWith(`${matcher}/`)) {
      return false;
    }
  }

  return true;
}
