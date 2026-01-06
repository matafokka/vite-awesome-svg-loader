import { defineConfig } from "tsdown";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "path";
import { ENTRIES } from "./src/generated/cfg.ts";
import { readFile, writeFile, copyFile } from "node:fs/promises";

import loaderPackageJson from "../loader/package.json" with { type: "json" };
import rootPackageJson from "../../package.json" with { type: "json" };
import { rolldownSvgDeclarationsBuilder } from "./src/rolldown-svg-declarations-builder.ts";

// Common data

const __dirname = dirname(fileURLToPath(import.meta.url));
const processedEntries: Record<string, string> = {};
const entriesArr: string[] = [];
const internalSourcesMatchers: string[] = [];

for (const key in ENTRIES) {
  const entryPath = ENTRIES[key];
  processedEntries[key] = toPath(entryPath);
  entriesArr.push(key);
  internalSourcesMatchers.push(key, entryPath);
}

// Config

export default defineConfig({
  platform: "neutral",
  format: ["esm", "cjs"],

  outExtensions: (ctx) => {
    if (ctx.format === "es") {
      // Vue will throw "Failed to resolve extends base type" if .d.ts imports types from .mjs or .d.mts.
      // But this works for some reason.
      // If we'll ever support framework with custom types resolution such as in Vue, we'll need to do different builds
      // or just duplicate declarations.
      return { js: ".js", dts: ".d.ts" };
    }

    return { js: ".cjs", dts: ".d.cts" };
  },

  entry: processedEntries,
  plugins: [rolldownSvgDeclarationsBuilder()],
  hash: false,

  inputOptions: {
    resolve: {
      mainFields: ["module", "main"],
    },
  },

  outputOptions: {
    minifyInternalExports: false,
  },

  external: (source, importer) => {
    if (source.startsWith("./")) {
      return !!importer && isExternalSource(importer);
    }

    return isExternalSource(source);
  },

  noExternal: entriesArr,

  dts: {
    resolve: entriesArr,
    resolver: "tsc",
  },

  hooks: {
    "build:done": onBuildEnd,
  },
});

// Post-build actions

async function onBuildEnd() {
  await Promise.all([buildPackageJson(), copyReadme(), registerSvgDeclarations(), copyAssets()]);
}

async function buildPackageJson() {
  const packageJsonStr = (await readFile(toPath("package.json"))).toString().replaceAll("dist/", "");
  const packageJson = JSON.parse(packageJsonStr);

  packageJson.dependencies = { ...loaderPackageJson.dependencies, ...rootPackageJson.dependencies };
  packageJson.devDependencies = loaderPackageJson.devDependencies;
  delete packageJson.private;
  delete packageJson.scripts;

  await writeFile(toPath("dist/package.json"), JSON.stringify(packageJson, undefined, 2));
}

async function copyReadme() {
  let content = (await readFile(toPath("../../README.md"))).toString();

  // Resolve relative URL
  content = content.replaceAll(
    /(\]\((?!(http:\/\/)|(https:\/\/)))/g,
    "](https://github.com/matafokka/vite-awesome-svg-loader/tree/main/",
  );

  await writeFile(toPath("dist/README.md"), content);
}

async function registerSvgDeclarations() {
  const promises = ["cts", "ts"].map(async (ext) => {
    const path = toPath(`dist/loader.d.${ext}`);
    const content = (await readFile(path)).toString() + `\n\nimport "./declarations.d.ts";`;
    await writeFile(path, content);
  });

  await Promise.all(promises);
}

async function copyAssets() {
  await Promise.all([
    copyFile(toPath("../integration-utils/dist/styles.css"), toPath("dist/integration-utils-styles.css")),
  ]);
}

// Helpers

function toPath(...paths: string[]) {
  return resolve(__dirname, ...paths);
}

function isExternalSource(source: string) {
  source = source.replaceAll("\\", "/");
  return internalSourcesMatchers.every((entry) => source !== entry && !source.includes(`/${entry}`));
}
