import { fileURLToPath } from "url";
import path from "path";
import fse from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.join(__dirname, "styles.css");
const cssDist = path.join(__dirname, "..", "dist", "styles.css");
fse.copyFileSync(cssPath, cssDist);