import { fileURLToPath } from "url";
import path from "path";
import fse from "fs-extra";
import docsPackageJson from "../apps/docs/package.json" with { type: "json" };

// Problem:
//   Turborepo provides no way to build arbitrary projects via wildcards or regexes before another project is built.
//   See related issue: https://github.com/vercel/turborepo/issues/1771
//
// Solution:
//   Before running Turborepo, update package.json with the required dependencies.
//
// This script solves the listed problem.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoBaseDir = path.join(__dirname, "..");
const demosDir = path.join(repoBaseDir, "demos");

export default async function main() {
  console.log("Updating docs package.json...");
  const frameworks = fse.readdirSync(demosDir);
  const promises = [];

  for (const framework of frameworks) {
    promises.push(processFramework(framework));
  }

  await Promise.all(promises);

  const packageJsonPath = path.join(repoBaseDir, "apps", "docs", "package.json");
  await fse.writeFile(packageJsonPath, JSON.stringify(docsPackageJson, undefined, 2));
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

  docsPackageJson.dependencies[demoName] = "*";
}
