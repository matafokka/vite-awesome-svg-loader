import { fileURLToPath } from "url";
import path from "path";
import { readdir, rm, mkdir, lstat, writeFile } from "node:fs/promises";
import metaPackageJson from "../packages/vite-awesome-svg-loader/package.json" with { type: "json" };

// This script generates entries (re-exports) and package.json subpath exports in vite-awesome-package-loader package

export default async function main() {
  console.log(`Generating "vite-awesome-svg-loader" source code...`);

  // Reset package.json

  metaPackageJson.dependencies = {};
  metaPackageJson.exports = {};
  metaPackageJson.typesVersions = { "*": {} };

  // Paths

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const packagesDir = path.join(__dirname, "..", "packages");
  const metaPackageDir = path.join(packagesDir, "vite-awesome-svg-loader");
  const metaPackageEntriesDir = path.join(metaPackageDir, "src", "generated");

  // Preparations

  const emptySrcDirPromise = rm(metaPackageEntriesDir, { force: true, recursive: true }).then(() =>
    mkdir(metaPackageEntriesDir, { recursive: true }),
  );

  const [packagesContent] = await Promise.all([readdir(packagesDir), emptySrcDirPromise]);

  // Get packages directories

  const packagesMeta = await (async () => {
    const LOADER_MATCHER = /^loader$/;
    const TO_BUNDLE = [LOADER_MATCHER, /-integration$/, /integration-utils/, /common-utils/];

    const packagesDirsPromises = packagesContent.map(async (pkg) => {
      const matcher = TO_BUNDLE.find((regex) => pkg.match(regex));
      const pkgDir = path.join(packagesDir, pkg);

      if (!(await lstat(pkgDir)).isDirectory()) {
        return;
      }

      return { pkg, pkgDir, isEntry: !!matcher, isLoader: matcher === LOADER_MATCHER };
    });

    return (await Promise.all(packagesDirsPromises)).filter((v) => !!v);
  })();

  // Non-blocking file writing promises

  /** @type {Promise<any>[]} */
  const writeFilePromises = [];

  // Register bundled packages

  /**
   * Maps entry points to paths
   *
   * @type {Record<string, string>}
   */
  const bundlerEntries = {};
  const addBundlerEntry = (pkg) => void (bundlerEntries[pkg] = `src/generated/${pkg}.ts`);

  let internalPackagesMatchers = "";
  const addInternalPackage = (pkg) => void (internalPackagesMatchers += `\n  "${pkg}",`);

  for (const { pkg, isEntry, isLoader } of packagesMeta) {
    if (pkg !== "vite-awesome-svg-loader") {
      addInternalPackage(pkg);
    }

    if (!isEntry) {
      continue;
    }

    const subpath = isLoader ? "." : `./${pkg}`;
    const types = `./dist/${pkg}/index.d.ts`;

    metaPackageJson.exports[subpath] = {
      import: {
        types: types,
        default: `./dist/${pkg}/index.js`,
      },

      require: {
        types: types,
        default: `./dist/${pkg}/index.cjs`,
      },
    };

    metaPackageJson.typesVersions["*"][subpath] = [types];
    metaPackageJson.dependencies[pkg] = "*";
    addBundlerEntry(pkg);

    writeFilePromises.push(writeFile(path.join(metaPackageEntriesDir, `${pkg}.ts`), `export * from "${pkg}"`));
  }

  // Register global definitions

  const GLOBAL_DTS = ["web-components-integration/dom"];

  for (const pkg of GLOBAL_DTS) {
    const subpathExport = `./${pkg}`;
    const types = `./dist/${pkg}.d.ts`;

    metaPackageJson.exports[subpathExport] = {
      import: { types: types, default: types },
      require: { types: types, default: types },
    };

    metaPackageJson.typesVersions["*"][subpathExport] = [types];
  }

  // Write new package.json

  const updatePackageJsonPromise = writeFile(
    path.join(metaPackageDir, "package.json"),
    JSON.stringify(metaPackageJson, undefined, 2),
  );

  // Write constants for bundler config

  const config = [
    `export const ENTRIES: Record<string, string> = ${JSON.stringify(bundlerEntries, undefined, 2)}`,
    ``,
    `export const INTERNAL_PACKAGES = [${internalPackagesMatchers}\n]`,
  ].join("\n");

  const writeBundlerCfgPromise = writeFile(path.join(metaPackageEntriesDir, "cfg.ts"), config);

  // Await all created promises

  await Promise.all([...writeFilePromises, updatePackageJsonPromise, writeBundlerCfgPromise]);

  console.log(`"vite-awesome-svg-loader" source code generated`);
}
