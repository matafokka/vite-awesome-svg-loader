import { fileURLToPath } from "url";
import path from "path";
import fse from "fs-extra";
import allDemosPackageJson from "../demos/all/package.json" with { type: "json" };

// Problem:
//   Turborepo provides no way to build arbitrary projects via wildcards or regexes before another project is built.
//   See related issue: https://github.com/vercel/turborepo/issues/1771
//
// Solution:
//   Create a "metapackage" for the demo that depends on all demos. Before running Turborepo, update metapackage's
//   package.json with the required dependencies.
//
// This script solves the listed problem.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoBaseDir = path.join(__dirname, "..");
const demosDir = path.join(repoBaseDir, "demos");

const DEMOS_TO_IGNORE = { all: true }

export default async function main() {
  const packageJsonPath = path.join(demosDir, "all", "package.json");

  console.log(`Updating "${packageJsonPath}"...`);

  const frameworks = fse.readdirSync(demosDir);
  const promises = [];

  for (const framework of frameworks) {
    if (DEMOS_TO_IGNORE[framework]) {
      continue
    }

    promises.push(processFramework(framework));
  }

  await Promise.all(promises);
  await fse.writeFile(packageJsonPath, JSON.stringify(allDemosPackageJson, undefined, 2));
}

/** @param {string} framework */
async function processFramework(framework) {
  const frameworkDir = path.join(demosDir, framework);

  if (!(await fse.lstat(frameworkDir)).isDirectory()) {
    return;
  }

  const demos = await fse.readdir(frameworkDir);
  const promises = [];

  for (const demo of demos) {
    promises.push(processDemo(path.join(frameworkDir, demo)));
  }

  await Promise.all(promises);
}

/** @param {string} demoPath */
async function processDemo(demoPath) {
  if (!(await fse.lstat(demoPath)).isDirectory()) {
    return;
  }

  const packageJsonPath = path.join(demoPath, "package.json");

  if (!(await fse.lstat(packageJsonPath)).isFile()) {
    return;
  }

  const demoPackageJson = JSON.parse((await fse.readFile(packageJsonPath)).toString());
  const demoName = demoPackageJson.name;

  if (typeof demoName !== "string") {
    throw new Error(`"${demoPath}" lacks "name" property`);
  }

  allDemosPackageJson.dependencies[demoName] = "*";
}
