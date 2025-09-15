import { spawn } from "node:child_process";
import prebuildDocs from "./prebuild-docs.mjs";
import { fileURLToPath } from "node:url";
import path from "path";

// Run prebuild scripts
await Promise.all([prebuildDocs()])

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Run user command

spawn('turbo', ['run', ...process.argv.slice(2)], {
  shell: true,
  stdio: "inherit",
  cwd: root,
});
