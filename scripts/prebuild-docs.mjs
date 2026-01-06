import { fileURLToPath } from "url";
import path from "path";
import { readdir, lstat, writeFile, readFile } from "node:fs/promises";
import allDemosPackageJson from "../demos/all/package.json" with { type: "json" };

// Problem:
//   Turborepo provides no way to build arbitrary projects via wildcards or regexes before another project is built.
//   See related issue: https://github.com/vercel/turborepo/issues/1771
//
// Solution:
//   Create a meta-package that depends on all demos. Before running Turborepo, update meta-package's package.json
//   with the required dependencies.
//
// This script solves the listed problem.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoBaseDir = path.join(__dirname, "..");
const demosDir = path.join(repoBaseDir, "demos");

const DEMOS_TO_IGNORE = { all: true };

export default async function main() {
  console.log(`Updating "all-demos" package...`);

  const frameworks = await readdir(demosDir);
  const promises = [];

  for (const framework of frameworks) {
    if (DEMOS_TO_IGNORE[framework]) {
      continue;
    }

    promises.push(processFramework(framework));
  }

  await Promise.all(promises);
  await writeFile(path.join(demosDir, "all", "package.json"), JSON.stringify(allDemosPackageJson, undefined, 2));
  console.log(`"all-demos" package updated`);
}

/** @param {string} framework */
async function processFramework(framework) {
  const frameworkDir = path.join(demosDir, framework);

  if (!(await lstat(frameworkDir)).isDirectory()) {
    return;
  }

  const demos = await readdir(frameworkDir);
  const promises = [];

  for (const demo of demos) {
    promises.push(processDemo(path.join(frameworkDir, demo)));
  }

  await Promise.all(promises);
}

/** @param {string} demoPath */
async function processDemo(demoPath) {
  if (!(await lstat(demoPath)).isDirectory()) {
    return;
  }

  const packageJsonPath = path.join(demoPath, "package.json");

  if (!(await lstat(packageJsonPath)).isFile()) {
    return;
  }

  const demoPackageJson = JSON.parse((await readFile(packageJsonPath)).toString());
  const demoName = demoPackageJson.name;

  if (typeof demoName !== "string") {
    throw new Error(`"${demoPath}" lacks "name" property`);
  }

  allDemosPackageJson.dependencies[demoName] = "*";
}
