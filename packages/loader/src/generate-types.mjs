// This script generates query configuration types. Only import types, singular configuration params
// and type + param combinations are generated. This is done because TypeScript doesn't allow "*.svg?*"
// in module declaration.

import { fileURLToPath } from "url";
import fse from "fs-extra";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let svgDeclarations = "";

function getDeclaration(paramAndValue) {
  return [
    `declare module "*.svg${paramAndValue ? "?" + paramAndValue : ""}" {`,
    `  export const src: string;`,
    `  export default src;`,
    `  export const prefix: string`,
    `}\n`,
  ].join("\n");
}

// Svg without query

svgDeclarations += getDeclaration();

// Build import types

const importTypes = ["url", "source", "source-data-uri", "base64", "base64-data-uri"];

for (const type of importTypes) {
  svgDeclarations += getDeclaration(type);
}

// Build configuration params

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
    svgDeclarations += getDeclaration(param + (value ? "=" + value : ""));
  }
}

// declarations.d.ts is used in tsup.config.ts
fse.writeFileSync(path.join(__dirname, "..", "dist", "declarations.d.ts"), svgDeclarations);
