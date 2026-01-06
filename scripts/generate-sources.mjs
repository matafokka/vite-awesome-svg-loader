import prebuildDocs from "./prebuild-docs.mjs";
import generateLoaderPackage from "./generate-loader-package.mjs";

// This scripts generates all required source files, i.e. basically prepares the project

export async function generateSources() {
  await Promise.all([prebuildDocs(), generateLoaderPackage()]);
}
