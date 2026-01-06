import { fileURLToPath } from "url";
import path from "path";
import { readdir, rm, mkdir, lstat, writeFile } from "node:fs/promises";
import metaPackageJson from "../packages/vite-awesome-svg-loader/package.json" with { type: "json" };

// This script generates entries (re-exports) and package.json subpath exports in vite-awesome-package-loader package

export default async function main() {
  console.log(`Generating "vite-awesome-svg-loader" source code...`);

  // Reset package.json

  metaPackageJson.dependencies = {};

  metaPackageJson.exports = {
    "./integration-utils/styles.css": {
      import: "./dist/integration-utils-styles.css",
      require: "./dist/integration-utils-styles.css",
    },
  };

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
    const TO_BUNDLE = [LOADER_MATCHER, /-integration$/, /integration-utils/];

    const packagesDirsPromises = packagesContent.map(async (pkg) => {
      const matcher = TO_BUNDLE.find((regex) => pkg.match(regex));
      const pkgDir = path.join(packagesDir, pkg);

      if (!(await lstat(pkgDir)).isDirectory()) {
        return;
      }

      return { pkg, pkgDir, shouldBundle: !!matcher, isLoader: matcher === LOADER_MATCHER };
    });

    return (await Promise.all(packagesDirsPromises)).filter((v) => !!v);
  })();

  /**
   * @typedef {typeof packagesMeta[0]} PackageMeta
   */

  /** @type {Record<string, PackageMeta>} */
  const packagesIndex = {};

  for (const meta of packagesMeta) {
    packagesIndex[meta.pkg] = meta;
  }

  // Register bundled packages

  /**
   * Maps entry points to paths
   *
   * @type {Record<string, string>}
   */
  const viteConfigEntries = {};

  /** @type {Promise<any>[]} */
  const entriesPromises = [];

  for (const { pkg, shouldBundle, isLoader } of packagesMeta) {
    if (!shouldBundle) {
      continue;
    }

    const subpath = isLoader ? "." : `./${pkg}`;
    const mtsTypes = `./dist/${pkg}.d.ts`;
    const ctsTypes = `./dist/${pkg}.d.cts`;

    metaPackageJson.exports[subpath] = {
      import: {
        types: mtsTypes,
        default: `./dist/${pkg}.js`,
      },

      require: {
        types: ctsTypes,
        default: `./dist/${pkg}.cjs`,
      },
    };

    metaPackageJson.typesVersions["*"][subpath] = [mtsTypes, ctsTypes];
    metaPackageJson.dependencies[pkg] = "*";
    viteConfigEntries[pkg] = `src/generated/${pkg}.ts`;

    entriesPromises.push(writeFile(path.join(metaPackageEntriesDir, `${pkg}.ts`), `export * from "${pkg}"`));
  }

  // Write new package.json

  const updatePackageJsonPromise = writeFile(
    path.join(metaPackageDir, "package.json"),
    JSON.stringify(metaPackageJson, undefined, 2),
  );

  // Write constants for Vite config

  const config = `export const ENTRIES: Record<string, string> = ${JSON.stringify(viteConfigEntries, undefined, 2)}`;
  const writeViteCfgPromise = writeFile(path.join(metaPackageEntriesDir, "cfg.ts"), config);

  // Await all created promises

  await Promise.all([...entriesPromises, updatePackageJsonPromise, writeViteCfgPromise]);

  console.log(`"vite-awesome-svg-loader" source code generated`);
}
