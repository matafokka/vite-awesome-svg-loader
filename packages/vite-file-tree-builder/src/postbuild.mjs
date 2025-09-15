import { fileURLToPath } from "url";
import fse from "fs-extra";
import path from "path";

// Copy declarations.d.ts to dist

const __dirname = path.dirname(fileURLToPath(import.meta.url));
fse.copyFile(path.join(__dirname, "declarations.d.ts"), path.join(__dirname, "..", "dist", "declarations.d.ts"));
