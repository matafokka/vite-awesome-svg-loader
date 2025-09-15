import { Plugin } from "vite";
import { DemoExportFsData, FileTreeNode } from "types/demos";
import path from "path";
import fse from "fs-extra";

export interface ViteFileTreeBuilderOptions {
  /**
   * A list of files to ignore. They will be matched against paths from project's root in following format:
   * `/path/to/some/file/or/directory`.
   *
   * All common patterns are already included.
   */
  ignoreList?: RegExp[];
}

const DEFAULT_IGNORE_LIST: RegExp[] = [
  /^\/.temp/,
  /^\/dist$/,
  /node_modules/,
  /\/vite\.config\.lib\.ts$/,
  /\/lib\.ts$/,
  /package\/.json/,
  /\.turbo/,
  /\.md$/,
  /\.mdx$/,
  /\.ico$/,
];

/**
 * A plugin that builds a project's file tree
 * @param options Options
 */
export function viteFileTreeBuilder(options: ViteFileTreeBuilderOptions = {}): Plugin {
  const ignoreList = [...DEFAULT_IGNORE_LIST, ...(options.ignoreList || [])];
  let root = "";
  let exportStr = "";

  const processFiles = async (files: string[], pathToDir: string, subtree: FileTreeNode[]) => {
    const promises: Promise<any>[] = [];

    const processFile = async (name: string) => {
      const fullPath = `${pathToDir}/${name}`;

      if (ignoreList.some((pattern) => fullPath.match(pattern))) {
        return;
      }

      const node: FileTreeNode = {
        name,
        fullPath,
        content: "",
      };

      const fsPath = path.join(root, ...fullPath.split("/"));

      if ((await fse.lstat(fsPath)).isFile()) {
        node.content = (await fse.readFile(fsPath)).toString();
        subtree.push(node);
        return;
      }

      node.content = [];
      await processFiles(await fse.readdir(fsPath), fullPath, node.content);

      if (node.content.length) {
        subtree.push(node);
      }
    };

    for (const name of files) {
      promises.push(processFile(name));
    }

    await Promise.all(promises);

    subtree.sort((a, b) => {
      const isAFile = typeof a.content === "string";
      const isBFile = typeof b.content === "string";

      if (isAFile && !isBFile) {
        return 1;
      }

      if (!isAFile && isBFile) {
        return -1;
      }

      return a.name < b.name ? -1 : 1;
    });
  };

  return {
    name: "vite-file-tree-builder",
    enforce: "pre",

    async configResolved(config) {
      root = config.root;
      const fsData: DemoExportFsData = { name: "", fileTree: [] };

      // Read demo name

      let normalizedRoot = root.replaceAll("\\", "/")

      if (normalizedRoot.endsWith("/")) {
        normalizedRoot = normalizedRoot.substring(0, normalizedRoot.length - 1)
      }

      fsData.name = normalizedRoot.split("/").pop() || "";

      // Build file tree

      const rootContent = await fse.readdir(root);
      await processFiles(rootContent, "", fsData.fileTree);

      // Get export

      exportStr = `export default ${JSON.stringify(fsData)}`;
    },

    resolveId(source) {
      return source === "demo-fs-data" ? source : null;
    },

    async load(id) {
      return id === "demo-fs-data" ? exportStr : null;
    },
  };
}
