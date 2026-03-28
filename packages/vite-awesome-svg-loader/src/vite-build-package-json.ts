import { Plugin } from "vite";
import packageJsonRaw from "../package.json" with { type: "json" };
import loaderPackageJson from "../../loader/package.json" with { type: "json" };
import rootPackageJson from "../../../package.json" with { type: "json" };
import { INTERNAL_PACKAGES } from "./generated/cfg";

const packageJson = packageJsonRaw as any;
packageJson.dependencies = { ...loaderPackageJson.dependencies, ...rootPackageJson.dependencies };
packageJson.peerDependencies = rootPackageJson.peerDependencies;
packageJson.peerDependenciesMeta = rootPackageJson.peerDependenciesMeta;

(["devDependencies", "private", "scripts"] satisfies (keyof typeof packageJsonRaw)[]).forEach(
  (key) => delete packageJson[key],
);

INTERNAL_PACKAGES.forEach((pkg) => delete packageJson.dependencies[pkg]);

const packageJsonStr = JSON.stringify(packageJson, undefined, 2).replaceAll("dist/", "");

export function viteBuildPackageJson(): Plugin {
  return {
    name: "vite-build-package-json",

    generateBundle() {
      this.emitFile({
        type: "prebuilt-chunk",
        fileName: "package.json",
        code: packageJsonStr,
      });
    },
  };
}
