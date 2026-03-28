import { Plugin } from "vite";
import { ENTRIES, INTERNAL_PACKAGES } from "./generated/cfg";
import { basename, join, relative, sep } from "node:path";
import { readdir, lstat, readFile, mkdir, writeFile } from "node:fs/promises";
import * as ts from "typescript";

/**
 * This plugin copies type definitions from packages' `dist` directories to the loader's `dist` directory.
 *
 * All internal packages imports are resolved to the relative paths. Only actually used packages are bundled.
 *
 * This plugin exists because no tool would correctly bundle types for multiple entry points. Test results:
 *
 * 1. unplugin-dts - generates duplicate definitions.
 *
 * 1. API Extractor and any other tool or plugin based on it - only one entry point is supported. Duplicate definitions
 * are generated if multiple entry points are supplied.
 *
 * 1. tsdown - very buggy typings generation, non-deterministic resolution algorithm.
 *
 * 1. rslib - honestly, don't remember the details, but it surely failed to do its job.
 *
 * Because we maintain a standard package abd bundle structure, we can just use this simple resolver and transformer.
 */
export function viteCopyDts(): Plugin {
  let root!: string;

  return {
    enforce: "post",
    name: "vite-copy-dts",

    configResolved(config) {
      root = config.root;
    },

    async writeBundle() {
      await new Processor(root).process();
    },
  };
}

class Processor {
  private processedPackages = new Set<string>();

  constructor(private root: string) {}

  async process() {
    // Start by processing the packages that will be the entry points. The rest will be processed when discovered.
    await Promise.all(Object.keys(ENTRIES).map(this.processPackage.bind(this)));

    // From here on out we will parallelize operations on arrays like we just did. And we'll await subsequent parallel
    // operations thus creating a tree of awaited promises.
    //
    // This should be actually parallel because all of our operations are io-related.
  }

  private async processPackage(name: string) {
    if (this.processedPackages.has(name)) {
      return;
    }

    this.processedPackages.add(name);
    const distDir = join(this.root, "..", name, "dist");
    await this.processDir(distDir, distDir);
  }

  private async processDir(pkgBundleDir: string, path: string) {
    const content = await readdir(path);

    const promises = content.map(async (entry) => {
      const entryPath = join(path, entry);

      if ((await lstat(entryPath)).isDirectory()) {
        await this.processDir(pkgBundleDir, entryPath);
      } else {
        await this.processFile(pkgBundleDir, entryPath);
      }
    });

    await Promise.all(promises);
  }

  private async processFile(pkgBundleDir: string, path: string) {
    if ([".d.ts", ".d.mts", ".d.cts"].every((ext) => !path.endsWith(ext))) {
      return;
    }

    const pkgPathParts = pkgBundleDir.split(sep);
    const pkgName = pkgPathParts[pkgPathParts.length - 2];
    const relPath = relative(pkgBundleDir, path);

    const relImport = relPath
      .split(sep)
      .map(() => "..")
      .join("/");

    const promises: Promise<any>[] = [];

    // We're using TS tools because they're already bundled. These tools are pretty awkward to work with.
    // If we'll need something more complicated, we should switch to a simpler parser.

    const sourceFile = ts.createSourceFile(
      basename(path),
      (await readFile(path)).toString(),
      ts.ScriptTarget.Latest,
      true,
    );

    const resolveInternalModules: ts.TransformerFactory<ts.Node> = (context) => {
      const visit: ts.Visitor<ts.Node, ts.Node> = (node) => {
        const next = () => ts.visitEachChild(node, visit, context);

        if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) {
          return next();
        }

        const importStr = node.moduleSpecifier.text;
        const pkg = INTERNAL_PACKAGES.find((pkg) => importStr.startsWith(pkg))?.split("/")[0];

        if (!pkg) {
          return next();
        }

        promises.push(this.processPackage(pkg)); // See? Now we process discovered package!

        return ts.factory.updateImportDeclaration(
          node,
          node.modifiers,
          node.importClause,
          ts.factory.createStringLiteral(`${relImport}/${pkg}/index`),
          node.attributes,
        );
      };

      return (rootNode) => ts.visitNode(rootNode, visit);
    };

    const transformResult = ts.transform(sourceFile, [resolveInternalModules]);
    const transformedSourceFile = transformResult.transformed[0] as ts.SourceFile;
    transformResult.dispose();
    let code = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed }).printFile(transformedSourceFile);

    // Add declarations import to the loader's entry point
    if (pkgName === "loader" && relPath === "index.d.ts") {
      code += `\nimport "./declarations";`;
    }

    const writeRes = async () => {
      const path = join(this.root, "dist", pkgName, relPath);
      const pathParts = path.split(sep);
      pathParts.pop();
      await mkdir(pathParts.join(sep), { recursive: true });
      await writeFile(path, code);
    };

    promises.push(writeRes());
    await Promise.all(promises);
  }
}
