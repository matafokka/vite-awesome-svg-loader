import { fileURLToPath } from "url";
import path from "path";
import fse from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, "..");
const appsDir = path.join(baseDir, "..");
const pkgDir = path.join(appsDir, "..", "packages");
const distDir = path.join(baseDir, "dist");

fse.emptyDirSync(distDir);

// Copy apps
(async () => {
  const appsContent = await fse.readdir(appsDir);

  for (const entry of appsContent) {
    (async () => {
      const entryDir = path.join(appsDir, entry);

      if (entry.endsWith("-demo") && (await fse.lstat(entryDir)).isDirectory()) {
        await fse.copy(path.join(entryDir, "dist"), path.join(distDir, entry));
      }
    })();
  }
})();

// Copy docs

(async () => {
  const pkgContent = await fse.readdir(pkgDir);

  for (const entry of pkgContent) {
    (async () => {
      const entryDir = path.join(pkgDir, entry);

      if (!(await fse.lstat(entryDir)).isDirectory()) {
        return;
      }

      const entryContent = await fse.readdir(entryDir);
      const docsDir = path.join(entryDir, "docs");

      if (!entryContent.includes("docs") || !(await fse.lstat(docsDir)).isDirectory()) {
        return;
      }

      const docsDistDir = path.join(distDir, entry + "-docs");
      await fse.copy(docsDir, docsDistDir);
    })();
  }
})();