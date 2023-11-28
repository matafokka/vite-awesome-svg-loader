// This script:
// 1. Wraps generated types with module, so (2) can work.
// 2. Generates query configuration types. Only import types, singular configuration params
// and type + param combinations are generated. This is done because TypeScript doesn't allow "*.svg?*"
// in module declaration.

import { fileURLToPath } from "url";
import fse from "fs-extra";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Wrap everything with declare module, so other module declarations would work.
// TODO: Find a way to do that with tsc or any other tool.
// TODO: Find a way to not require user to add ///<reference types="vite-awesome-svg-loader" />

let content =
  `declare module "vite-awesome-svg-loader" {\n` +
  fse.readFileSync(path.join(__dirname, "..", "dist", "index.d.ts")).toString() +
  "\n}\n";

content = content.replaceAll("export declare", "export");

function getUrlType(paramAndValue) {
  return `declare module "*.svg?${paramAndValue}" { const src: string; export default src; }\n`;
}

// Build import types

const importTypes = ["url", "source", "source-data-uri", "base64", "base64-data-uri"];

for (const type of importTypes) {
  content += getUrlType(type);
}

// Build configuration types

const rawParams = ["preserve-line-width", "set-current-color", "skip-transforms", "skip-awesome-svg-loader"];
const params = [];

for (const param of rawParams) {
  params.push(param);

  for (const type of importTypes) {
    params.push(`${type}&${param}`);
  }
}

for (const param of params) {
  for (const value of ["", "true", "false"]) {
    content += getUrlType(param + (value ? "=" + value : ""));
  }
}

fse.writeFileSync(path.join(__dirname, "..", "dist", "index.d.ts"), content);
