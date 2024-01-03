import { fileURLToPath } from "url";
import path from "path";
import fse from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, "..");
const packagesDir = path.join(baseDir, "..");
const distDir = path.join(baseDir, "dist");

fse.emptyDirSync(distDir);

// Copy loader
const loaderDir = path.join(packagesDir, "loader");
fse.copy(path.join(loaderDir, "dist"), distDir);

const packagesContent = fse.readdirSync(packagesDir);

const IGNORE_DIRS_LIST = {
  "ui": true,
  "types": true,
  "vite-awesome-svg-loader": true, // Don't copy build script
  "loader": true, // This is copied separately
};

for (const entry of packagesContent) {
  (async () => {
    const entryDir = path.join(packagesDir, entry);

    if (!IGNORE_DIRS_LIST[entry] && (await fse.lstat(entryDir)).isDirectory()) {
      await fse.copy(path.join(entryDir, "dist"), path.join(distDir, entry));
    }
  })();
}

// Build package.json

(async () => {
  const loaderPackageStr = (await fse.readFile(path.join(loaderDir, "package.json"))).toString();
  const loaderPackageJson = JSON.parse(loaderPackageStr);
  let packageJsonStr = (await fse.readFile(path.join(baseDir, "package.json"))).toString();

  packageJsonStr = packageJsonStr.replaceAll("dist/", "");
  const packageJson = JSON.parse(packageJsonStr);

  packageJson.dependencies = loaderPackageJson.dependencies;
  packageJson.devDependencies = loaderPackageJson.devDependencies;
  delete packageJson.private;
  delete packageJson.scripts;

  await fse.writeFile(path.join(distDir, "package.json"), JSON.stringify(packageJson, undefined, 2));
})();

// Copy README.md

(async () => {
  let content = (await fse.readFile(path.join(packagesDir, "..", "README.md"))).toString();

  // Resolve relative URL
  content = content.replaceAll(
    /(\]\((?!(http:\/\/)|(https:\/\/)))/g,
    "](https://github.com/matafokka/vite-awesome-svg-loader/tree/main/",
  );

  await fse.writeFile(path.join(distDir, "README.md"), content);
})();
