import type { ConfigEnv, Plugin, UserConfig } from "vite";
import fs from "fs-extra";
import path from "path";
import { optimize } from "svgo";
import { XastElement } from "svgo/lib/types";
import * as csstree from "css-tree";
import MurmurHash3 from "imurmurhash";

export type ImportType = "url" | "source" | "source-data-uri" | "base64" | "base64-data-uri";

const IMPORT_TYPES: ImportType[] = ["url", "source", "source-data-uri", "base64", "base64-data-uri"];

/**
 * SVG loader options.
 *
 * **Paths**
 *
 * Both file name and its path relative to the project's root with leading slash will be compared.
 *
 * For example, if you have a file `/src/assets/icons/menu.svg` then following strings will be checked:
 *
 * 1. `/assets/icons/menu.svg` - note that it doesn't start with `/src`
 * 2. `menu.svg`
 *
 * To avoid transforming multiple files with the same name, always include path into each entry.
 *
 * Examples:
 *
 * ```js
 * plugins: [
 *   viteReBinSvgLoader({
 *     preserveLineWidthList: [
 *       // Recommended formats:
 *       /\/img\/icons/, // Matches all paths containing "/img/line-art/"
 *       "/assets/img/logo.svg", // Matches single file "/assets/img/logo.svg".
 *
 *       // Not recommended formats:
 *       "splash.svg", // Matches all files named "splash.svg"
 *       /\/icons\/plus\.svg/, // Matches all paths containing "/icons/plus.svg"
 *     ],
 *   }),
 * ],
 * ```
 */
export interface SvgLoaderOptions {
  /**
   * Temporary directory where SVG files will be stored in dev mode.
   *
   * @default "temp"
   */
  tempDir: string;

  /**
   * A list of files or directories to preserve line width of, i.e. to set `vector-effect="non-scaling-stroke"`.
   *
   * This option is primarily for icons and line art.
   *
   * This also can be done in an import: `import imageSrc from "./path/to/image.svg?preserve-line-width"`.
   */
  preserveLineWidthList: (string | RegExp)[];

  /**
   * A list of files or directories to replace fill, stroke and `<stop>` colors to `currentColor` of, i.e.:
   *
   * 1. `fill`, `stroke` and `stop-color` attributes and CSS identifiers will be replaced with `currentColor`.
   * 2. `none`, `transparent` or `currentColor` values will not be replaced.
   *
   * Opacity (i.e. `rgba()`) won't be preserved.
   * You have to manually set opacity by setting `fill-opacity` and `stroke-opacity` attributes.
   *
   * This is done because opacity may be handled with a stylesheet selector. This case is hard to implement, and it may
   * slow down build process. This behavior might be changed in future, but it shouldn't break your project.
   *
   * This option is primarily for outlined and filled images.
   *
   * This also can be done in an import: `import imageSrc from "./path/to/image.svg?set-current-color"`.
   */
  setCurrentColorList: (string | RegExp)[];

  /**
   * A list of files to skip while transforming.
   *
   * For example, if you add a directory to {@link preserveLineWidthList} and add a file in that directory to this list,
   * line width of added file won't be preserved.
   *
   * SVGO is still applied to the added files.
   */
  skipTransformsList: (string | RegExp)[];

  /**
   * A list of files to skip loading of. Useful for passing original files to another loader.
   *
   * This also can be done in an import: `import imageSrc from "./path/to/image.svg?skip-transforms"`.
   */
  skipFilesList: (string | RegExp)[];

  /**
   * Default import type, i.e. what you get without specifying anything in the import URL.
   *
   * This also can be done in an import:
   *
   * ```ts
   * // Source code
   * import imageSrc from "./path/to/image.svg?source";
   *
   * // URL
   * import imageUrl from "./path/to/image.svg?url";
   *
   * // Source code Data URI
   * import imageSrcDataUri from "./path/to/image.svg?source-data-uri";
   *
   * // Base64
   * import imageBase64 from "./path/to/image.svg?base-64";
   *
   * // Base64 data URI
   * import imageBase64DataUri from "./path/to/image.svg?base-64-data-uri";
   * ```
   *
   * @default "source"
   */
  defaultImport: ImportType;
}

const DEFAULT_OPTIONS: SvgLoaderOptions = {
  tempDir: ".temp",
  preserveLineWidthList: [],
  setCurrentColorList: [],
  skipTransformsList: [],
  skipFilesList: [],
  defaultImport: "source",
};

function normalizeBaseDir(dir: string) {
  dir = dir.replaceAll("\\", "/");

  if (dir.endsWith("/")) {
    dir = dir.substring(0, dir.length - 1);
  }

  return dir;
}

/**
 * A Vite plugin that:
 *
 * 1. Can import SVGs (see also: {@link SvgLoaderOptions.defaultImport}) as:
 *    1. Source code (default import type): `import imageSrc from "./path/to/image.svg"`.
 *    1. URL: `import imageUrl from "./path/to/image.svg?url"`.
 *    1. Source code data URI: `import imageSrcDataUri from "./path/to/image.svg?source-data-uri"`.
 *    1. Source code Base64: `import imageBase64 from "./path/to/image.svg?base64"`.
 *    1. Source code Base64 data URI: `import imageBase64DataUri from "./path/to/image.svg?base64-data-uri"`.
 * 1. Can preserve line width (make icons and line art have same line width when scaling): `import imageSrc from "./path/to/image.svg?preserve-line-width"`. See also: {@link SvgLoaderOptions.preserveLineWidthList}.
 * 1. Can replace colors with `currentColor`: `import imageSrc from "./path/to/image.svg?set-current-color"`. See also: {@link SvgLoaderOptions.setCurrentColorList}.
 * 1. Will minimize your SVGs using [SVGO](https://github.com/svg/svgo).
 *
 * Parameters can be chained with an `&` symbol like in a normal URL:
 *
 * ```ts
 * // Import image as URL and preserve its line width
 * import imageUrl from "./path/to/image.svg?url&preserve-line-width";
 *
 * // Import image as Base64 Data URI, preserve line width and set currentColor
 * import imageBase64 from "./path/to/image.svg?base64-data-uri&preserve-line-width&set-current-color";
 * ```
 *
 * You can explicitly disable any parameter by setting it to `false` (case-insensitive):
 *
 * ```ts
 * import imageUrl from "./path/to/image.svg?url&preserve-line-width=false";
 * ```
 *
 * Transforms can be skipped altogether (but not SVGO):
 *
 * ```ts
 * import imageSrc from "./path/to/image.svg?skip-transforms";
 * ```
 *
 * Loading can be skipped altogether. In this case, another loader (if added to the Vite config) will be used.
 *
 * ```ts
 * import image from "./path/to/image.svg?skip-awesome-svg-loader";
 * ```
 *
 * You can set filenames and regexes in {@link SvgLoaderOptions}, so you don't have to write such long urls for every import.
 *
 * @param options Plugin options
 */
export function viteAwesomeSvgLoader(options: Partial<SvgLoaderOptions> = {}): Plugin {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  mergedOptions.tempDir = mergedOptions.tempDir.replaceAll("\\", "/");

  if (
    mergedOptions.tempDir.startsWith("/") ||
    mergedOptions.tempDir.startsWith("./") ||
    mergedOptions.tempDir.indexOf(":/") !== -1
  ) {
    throw new Error(
      '"tempDir" option must be in format "path/to/temp/dir",' +
        'i.e. it shouldn\'t be an absolute path, or start with "./".' +
        "It'll be resolved to the project's root by the plugin.",
    );
  }

  if (mergedOptions.tempDir.endsWith("/")) {
    mergedOptions.tempDir = mergedOptions.tempDir.substring(0, mergedOptions.tempDir.length - 1);
  }

  mergedOptions.tempDir = "/" + mergedOptions.tempDir;

  let isBuildMode = false;
  let root = "";
  let base = "";
  let oldViteRoot = "";

  return {
    name: "vite-awesome-svg-loader",
    enforce: "pre",

    config(config: UserConfig, { command }: ConfigEnv) {
      isBuildMode = command === "build";
    },

    configResolved(config) {
      root = normalizeBaseDir(config.root);
      base = normalizeBaseDir(config.base);
      oldViteRoot = root[1] === ":" ? root.substring(2) : root;
    },

    configureServer(server) {
      server.httpServer?.on("close", () => {
        if (!isBuildMode) {
          fs.removeSync(root + mergedOptions.tempDir);
        }
      });
    },

    resolveId(source, importer) {
      if (source.indexOf(".svg") === -1) {
        return null;
      }

      // Resolve ID to an absolute path

      // Vite 2.0.0-ish compatibility. It can pass following strings:
      // 1. /@fs/<rest of the path from root>
      // 1. /<fs root, i.e. slash or Windows drive letter (C:, D:, etc)>/<rest of the path>
      // 1. /<relative path>
      // Newer versions pass either absolute path (with a drive letter on Windows) or relative path.

      if (source.startsWith(oldViteRoot)) {
        return root + source.substring(oldViteRoot.length);
      }

      if (!source.startsWith(".")) {
        return source;
      }

      if (!importer) {
        return null;
      }

      // When dynamic imports are used, Vite doesn't pass absolute path for some reason
      return path.join(path.dirname(importer), source);
    },

    load(id: string) {
      const ext = ".svg";
      const indexOfSvg = id.indexOf(ext);

      if (indexOfSvg === -1) {
        return null;
      }

      let relPathWithSlash = id.substring(0, indexOfSvg + ext.length).replaceAll("\\", "/");

      if (relPathWithSlash.startsWith(root)) {
        relPathWithSlash = relPathWithSlash.substring(root.length);
      }

      if (!relPathWithSlash.startsWith("/")) {
        relPathWithSlash = "/" + relPathWithSlash;
      }

      const queryStr = id.split("?", 2)[1] || "";
      const queryKVPairs = queryStr.split("&");

      const query: Record<string, string | undefined> = {};

      for (const pair of queryKVPairs) {
        const [key, value] = pair.split("=");
        query[key.toLocaleLowerCase()] = value || "1";
      }

      if (shouldDoThing(relPathWithSlash, query["skip-awesome-svg-loader"], mergedOptions.skipFilesList)) {
        return null;
      }

      const shouldSkipTransforms = shouldDoThing(
        relPathWithSlash,
        query["skip-transforms"],
        mergedOptions.skipTransformsList,
      );

      const shouldPreserveLineWidth =
        !shouldSkipTransforms &&
        shouldDoThing(relPathWithSlash, query["preserve-line-width"], mergedOptions.preserveLineWidthList);

      const shouldSetCurrentColor =
        !shouldSkipTransforms &&
        shouldDoThing(relPathWithSlash, query["set-current-color"], mergedOptions.setCurrentColorList);

      // Make a short sorted string from params to guarantee unique file name for the same file
      let joinedParamsStr = "";
      for (const param of [shouldSkipTransforms, shouldPreserveLineWidth, shouldSetCurrentColor]) {
        joinedParamsStr += param ? "1" : "0";
      }

      // Create unique asset file name
      const fileNameNoExt = path.basename(relPathWithSlash).split(".")[0];
      const assetFileNameNoExt = `${fileNameNoExt}-${joinedParamsStr}-${new MurmurHash3(relPathWithSlash).result()}`;
      const assetFileName = assetFileNameNoExt + ".svg";
      const assetRelPath = path.dirname(relPathWithSlash) + "/" + assetFileName;

      const fullPath = root + relPathWithSlash;
      let code = fs.readFileSync(fullPath).toString();

      code = optimize(code, {
        multipass: true,
        plugins: [
          {
            name: "prefixIds",
            params: {
              prefixIds: true,
              prefixClassNames: true,
              prefix: assetFileNameNoExt,
            },
          },
          {
            name: "awesome-svg-loader",
            fn: () => {
              return {
                element: {
                  enter: (node) => {
                    if (shouldPreserveLineWidth) {
                      preserveLineWidth(node, fullPath);
                    }

                    if (shouldSetCurrentColor) {
                      setCurrentColor(node);
                    }
                  },
                },
              };
            },
          },
        ],
      }).data;

      let importType = mergedOptions.defaultImport;

      for (const type of IMPORT_TYPES) {
        if (query[type]) {
          importType = type;
        }
      }

      switch (importType) {
        case "source":
          return "export default `" + code.replaceAll("`", "\\`") + "`;";
        case "source-data-uri":
          return "export default `data:image/svg+xml," + encodeURIComponent(code.replaceAll("`", "\\`")) + "`;";
        case "base64":
          return "export default `" + toBase64(code).replaceAll("`", "\\`") + "`;";
        case "base64-data-uri":
          return (
            "export default `data:image/svg+xml;base64," +
            encodeURIComponent(toBase64(code)).replaceAll("`", "\\`") +
            "`;"
          );
      }

      if (!isBuildMode) {
        const assetUrl = mergedOptions.tempDir + assetRelPath;
        fs.outputFileSync(root + assetUrl, code);

        return `export default "${base + assetUrl}"`;
      }

      const assetId = this.emitFile({
        type: "asset",
        name: assetFileName,
        source: code,
      });

      return `export default "__VITE_ASSET__${assetId}__";`;
    },
  };
}

function toBase64(str: string) {
  const binString = String.fromCodePoint(...new TextEncoder().encode(str));
  return btoa(binString);
}

function shouldDoThing(relPathWithSlash: string, queryValue: string | undefined, list: (string | RegExp)[]) {
  if ((queryValue || "false").toLocaleLowerCase() !== "false") {
    return true;
  }

  const filename = path.basename(relPathWithSlash);

  for (const entry of list) {
    for (const name of [filename, relPathWithSlash]) {
      if (name === entry || (entry instanceof RegExp && entry.exec(name))) {
        return true;
      }
    }
  }

  return false;
}

const TAGS_TO_PRESERVE_LINE_WIDTH_OF: Record<string, true> = {
  circle: true,
  ellipse: true,
  foreignObject: true,
  image: true,
  line: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  text: true,
  textPath: true,
  tspan: true,
  use: true,
};

function preserveLineWidth(node: XastElement, path: string) {
  if (!TAGS_TO_PRESERVE_LINE_WIDTH_OF[node.name]) {
    return;
  }

  const vectorEffectAttr = node.attributes["vector-effect"];

  if (vectorEffectAttr && vectorEffectAttr !== "non-scaling-stroke") {
    console.warn(
      `"${path}": Element "${node.name}" already contains "vector-effect" property. Please remove it, ` +
        "so it can scale correctly. This element will not be transformed.",
    );
  } else {
    node.attributes["vector-effect"] = "non-scaling-stroke";
  }
}

const COLOR_ATTRS_TO_REPLACE: Record<string, true> = {
  "fill": true,
  "stroke": true,
  "stop-color": true,
};

const IGNORE_COLORS: Record<string, true> = {
  none: true,
  transparent: true,
  currentColor: true,
};

function setCurrentColor(node: XastElement) {
  if (node.name === "style") {
    // @ts-ignore
    const newCss = setCurrentColorCss(node.children[0]?.value, false);

    if (newCss) {
      // @ts-ignore
      node.children[0].value = newCss;
    }
  } else {
    const newCss = setCurrentColorCss(node.attributes.style, true);

    if (newCss) {
      node.attributes.style = newCss;
    }
  }

  for (const color in COLOR_ATTRS_TO_REPLACE) {
    const attrsColor = node.attributes[color];

    if (attrsColor && !IGNORE_COLORS[attrsColor]) {
      node.attributes[color] = "currentColor";
    }
  }
}

function setCurrentColorCss(css: any, isInline = false) {
  if (!css || typeof css !== "string") {
    return "";
  }

  let context = "stylesheet";

  if (isInline) {
    css = `{${css}}`;
    context = "block";
  }

  const ast = csstree.parse(css, { context });

  csstree.walk(ast, {
    visit: "Declaration",
    enter: (node) => {
      if (!COLOR_ATTRS_TO_REPLACE[node.property]) {
        return;
      }

      // @ts-ignore
      const identifier = node.value?.children?.first;
      const color = identifier?.value || identifier?.name;

      if (color && !IGNORE_COLORS[color]) {
        node.value = csstree.parse("currentColor", { context: "value" }) as csstree.Value;
      }
    },
  });

  return csstree.generate(ast);
}
