import { type Plugin } from "rolldown";

export function rolldownSvgDeclarationsBuilder(): Plugin {
  return {
    name: "rolldown-svg-declarations-builder",

    generateBundle() {
      let svgDeclarations = "";

      // Svg without query

      svgDeclarations += getDeclaration();

      // Build import types

      const importTypes = ["url", "source", "source-data-uri", "base64", "base64-data-uri"];

      for (const type of importTypes) {
        svgDeclarations += getDeclaration(type);
      }

      // Build configuration params

      const rawParams = ["preserve-line-width", "set-current-color", "skip-transforms", "skip-awesome-svg-loader"];
      const params: string[] = [];

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

      this.emitFile({
        type: "prebuilt-chunk",
        fileName: "declarations.d.ts",
        code: svgDeclarations,
      });
    },
  };
}

function getDeclaration(query?: string) {
  return [
    `declare module "*.svg${query ? "?" + query : ""}" {`,
    `  export const src: string;`,
    `  export default src;`,
    `  export const prefix: string`,
    `}\n`,
  ].join("\n");
}
