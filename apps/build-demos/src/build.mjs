import { fileURLToPath } from "url";
import path from "path";
import fse from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, "..");
const appsDir = path.join(baseDir, "..");
const distDir = path.join(baseDir, "dist");

fse.emptyDirSync(distDir);

const appsContent = fse.readdirSync(appsDir);

for (const entry of appsContent) {
  (async () => {
    const entryDir = path.join(appsDir, entry);

    if (entry.endsWith("-demo") && (await fse.lstat(entryDir)).isDirectory()) {
      await fse.copy(path.join(entryDir, "dist"), path.join(distDir, entry));
    }
  })();
}
