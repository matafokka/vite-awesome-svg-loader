import type { ConfigEnv, Plugin, UserConfig } from "vite";
import fs from "fs-extra";
import path from "path";
import { optimize } from "svgo";
import { XastChild, XastElement } from "svgo/lib/types";
// TODO: Update import when SVGO 4.x.x will be released, it should export utility functions
// @ts-expect-error
import { matches as matchesSelector, querySelectorAll } from "svgo/lib/xast.js";
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
   * A list of files or directories to disable preserving line width of. Overrides {@link preserveLineWidthList}.
   */
  skipPreserveLineWidthList: (string | RegExp)[];

  /**
   * A list of CSS selectors to disable {@link preserveLineWidthList} for. Use it to leave specific elements stroke
   * width as-is.
   *
   * Can be a list of selectors or selectors-per-files specifiers.
   *
   * Unlike {@link skipSetCurrentColorSelectors} and {@link skipTransformsSelectors}, doesn't impact build performance.
   */
  skipPreserveLineWidthSelectors: (string | SelectorsPerFiles)[];

  /**
   * A list of files or directories to replace fill, stroke and `<stop>` colors with `currentColor` (default) or other
   * colors (if {@link ColorMapPerFiles} or {@link ColorMap} is specified), i.e.:
   *
   * 1. `fill`, `stroke` and `stop-color` attributes and CSS identifiers will be replaced with `currentColor` or other
   * given color.
   * 2. `none`, `transparent` or `currentColor` values will not be replaced.
   *
   * Opacity (i.e. `rgba()`) won't be preserved.
   * You have to manually set opacity by setting `fill-opacity` and `stroke-opacity` attributes.
   *
   * This is done because opacity may be handled with a stylesheet selector. This case is hard to implement, and it may
   * slow down build process. This behavior might be changed in future, but it shouldn't break your project.
   *
   * Setting `currentColor` can be done with an import: `import imageSrc from "./path/to/image.svg?set-current-color"`.
   *
   * Replacements priority:
   *
   * 1. {@link ColorMapPerFiles}
   * 1. {@link ColorMap}
   * 1. `string | RegExp`
   */
  replaceColorsList: (string | RegExp | ColorMap | ColorMapPerFiles)[];

  /**
   * A list of files or directories to disable color replacements of. Overrides {@link replaceColorsList}.
   */
  skipReplaceColorsList: (string | RegExp)[];

  /**
   * A list of CSS selectors to disable {@link skipReplaceColorsList} for. Use it to leave specific elements colors
   * as-is.
   *
   * Can be a list of selectors or selectors-per-files specifiers.
   *
   * **You probably don't need this option.** Think of other ways to solve your problem. "Recipes" section
   * in the demos may help you.
   *
   * **Heavy usage may significantly slow down build time.** Limit selectors to specific files to improve performance.
   */
  skipReplaceColorsSelectors: (string | SelectorsPerFiles)[];

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
   * A list of CSS selectors to disable all transforms for. Use it to leave specific elements as-is.
   *
   * Can be a list of selectors or selectors-per-files specifiers.
   *
   * **You probably don't need this option.** Think of other ways to solve your problem. "Recipes" section
   * in the demos may help you.
   *
   * **Heavy usage may significantly slow down build time.** Limit selectors to specific files to improve performance.
   */
  skipTransformsSelectors: (string | SelectorsPerFiles)[];

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

  // Deprecated options

  /**
   * A list of files or directories to replace fill, stroke and `<stop>` colors of with `currentColor`.
   *
   * Overrides {@link replaceColorsList}.
   *
   * @deprecated Deprecated in favor of {@link replaceColorsList}
   */
  setCurrentColorList: (string | RegExp)[];

  /**
   * A list of files or directories to disable setting current color of. Overrides {@link setCurrentColorList} and
   * {@link replaceColorsList}.
   *
   * @deprecated Deprecated in favor of {@link replaceColorsList}
   */
  skipSetCurrentColorList: (string | RegExp)[];

  /**
   * A list of CSS selectors to disable {@link setCurrentColorList} for.Overrides {@link setCurrentColorList},
   * {@link replaceColorsList} and {@link skipReplaceColorsSelectors}.
   *
   * @deprecated Deprecated in favor of {@link skipReplaceColorsSelectors}
   */
  skipSetCurrentColorSelectors: (string | SelectorsPerFiles)[];
}

/**
 * CSS selector per file or files
 */
export interface SelectorsPerFiles {
  /**
   * List of filenames and/or paths matchers
   */
  files: (string | RegExp)[];

  /**
   * List of selectors
   */
  selectors: string[];
}

/**
 * Maps original SVG colors (case-insensitive) to their replacements
 */
export type ColorMap = Record<string, string>;

/**
 * Maps original SVG colors (case-insensitive) to their replacements. Can be applied to specific files via {@link files} property.
 *
 * @example
 *
 * {
 *   // Optional list of files to apply replacements to.
 *   files: ["my-file.svg", /icon\-*.\.svg/],
 *
 *   // Will replace all colors with "red" value with "var(--primary-color)".
 *   // It'll replace only "red". HEX ("#ff0000"), RGB ("rgb(255, 0, 0)") and other values won't be replaced.
 *   "red": "var(--primary-color)",
 *
 *   // Same as above: this HEX value (case-insensitive) will be replaced with "var(--secondary-color)".
 *   // Just "blue" or any other values with the same resulting color won't be replaced.
 *   "#0000ff": "var(--secondary-color)",
 *
 *   // Again, only this value (case-insensitive) will be replaced with "var(--tertiary-color)". Any other value will be
 *   // left as-is.
 *   "rgb(0, 255, 0)": "var(--tertiary-color)",
 * }
 */
export interface ColorMapPerFiles {
  /**
   * A list of files to apply replacements to. If omitted, replacements will be applied to all files
   */
  files: (string | RegExp)[];

  /**
   * Maps original SVG colors (case-insensitive) to their replacements
   */
  replacements: ColorMap;

  /**
   * Replacement for other colors. Set to empty string to leave colors as-is.
   *
   * @default "currentColor"
   */
  default?: string;
}

type ResolvedColorReplacements = Required<Omit<ColorMapPerFiles, "files">>;

const DEFAULT_OPTIONS: SvgLoaderOptions = {
  tempDir: ".temp",
  preserveLineWidthList: [],
  skipPreserveLineWidthList: [],
  skipPreserveLineWidthSelectors: [],
  setCurrentColorList: [],
  skipSetCurrentColorList: [],
  skipSetCurrentColorSelectors: [],
  replaceColorsList: [],
  skipReplaceColorsList: [],
  skipReplaceColorsSelectors: [],
  skipTransformsList: [],
  skipTransformsSelectors: [],
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
 * 1. Can preserve line width (make icons and line art have same line width when scaling):
 * `import imageSrc from "./path/to/image.svg?preserve-line-width"`.
 * See also: {@link SvgLoaderOptions.preserveLineWidthList}.
 * 1. Can replace colors with `currentColor`: `import imageSrc from "./path/to/image.svg?set-current-color"`.
 * See also: {@link SvgLoaderOptions.setCurrentColorList}.
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
 * You can explicitly disable any parameter by setting it to `false` (case-insensitive, takes precedence over config):
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
 * You can set filenames and regexes in {@link SvgLoaderOptions}, so you don't have to write such long urls for every
 * import.
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

  const replaceColorsList = options.setCurrentColorList || mergedOptions.replaceColorsList;

  // Prioritize replacements like so:
  const replacementsWithFiles: ColorMapPerFiles[] = []; // ColorMapPerFiles
  const filesWithCurrentColor: ColorMapPerFiles[] = []; // string | RegExp

  // ColorMap
  const allFilesReplacements: ColorMapPerFiles = {
    files: [/.*/],
    replacements: {},
    default: "",
  };

  let hasAllFilesReplacements = false;

  // Normalize list and apply prioritization
  for (const replacements of replaceColorsList) {
    if (typeof replacements === "string" || replacements instanceof RegExp) {
      filesWithCurrentColor.push({
        files: [replacements],
        replacements: {},
        default: "currentColor",
      });

      continue;
    }

    if (replacements.files instanceof Array) {
      replacementsWithFiles.push(replacements as ColorMapPerFiles);
      continue;
    }

    for (const color in replacements) {
      hasAllFilesReplacements = true;
      allFilesReplacements.replacements[color] = (replacements as ColorMap)[color];
    }
  }

  const replaceColorsListNormalized: ColorMapPerFiles[] = [...replacementsWithFiles, ...filesWithCurrentColor];

  if (hasAllFilesReplacements) {
    replaceColorsListNormalized.push(allFilesReplacements);
  }

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

      // Normalize file path

      let relPathWithSlash = id.substring(0, indexOfSvg + ext.length).replaceAll("\\", "/");

      if (relPathWithSlash.startsWith(root)) {
        relPathWithSlash = relPathWithSlash.substring(root.length);
      }

      if (!relPathWithSlash.startsWith("/")) {
        relPathWithSlash = "/" + relPathWithSlash;
      }

      // Parse query

      const queryStr = id.split("?", 2)[1] || "";
      const queryKVPairs = queryStr.split("&");

      const query: Record<string, string | undefined> = {};

      for (const pair of queryKVPairs) {
        const [key, value] = pair.split("=");
        query[key.toLowerCase()] = value || "1";
      }

      if (matchesQueryOrList(relPathWithSlash, query["skip-awesome-svg-loader"], mergedOptions.skipFilesList)) {
        return null;
      }

      // Resolve transform configuration

      const shouldSkipTransforms = matchesQueryOrList(
        relPathWithSlash,
        query["skip-transforms"],
        mergedOptions.skipTransformsList,
      );

      const shouldPreserveLineWidth =
        !shouldSkipTransforms &&
        matchesQueryOrList(relPathWithSlash, query["preserve-line-width"], mergedOptions.preserveLineWidthList) &&
        !matchesQueryOrList(relPathWithSlash, undefined, mergedOptions.skipPreserveLineWidthList);

      const skipPreserveLineWidthSelectors = selectorsToList(
        relPathWithSlash,
        mergedOptions.skipPreserveLineWidthSelectors,
        !shouldPreserveLineWidth,
      );

      let shouldReplaceColors = false;

      const colorReplacements: ResolvedColorReplacements = {
        replacements: {},
        // @ts-ignore
        default: undefined,
      };

      if (
        !shouldSkipTransforms &&
        !matchesQueryOrList(
          relPathWithSlash,
          undefined,
          options.skipSetCurrentColorList || mergedOptions.skipReplaceColorsList,
        )
      ) {
        if (matchesQuery(query["set-current-color"])) {
          colorReplacements.default = "currentColor";
          shouldReplaceColors = true;
        } else {
          for (const replacements of replaceColorsListNormalized) {
            if (!matchesPath(relPathWithSlash, replacements.files)) {
              continue;
            }

            shouldReplaceColors = true;

            if (colorReplacements.default === undefined && replacements.default !== undefined) {
              colorReplacements.default = replacements.default;
            }

            for (const color in replacements.replacements) {
              colorReplacements.replacements[color] ||= replacements.replacements[color];
            }
          }
        }
      }

      colorReplacements.default ??= "currentColor";

      const skipReplaceColorsSelectors = selectorsToList(
        relPathWithSlash,
        options.skipSetCurrentColorSelectors || mergedOptions.skipReplaceColorsSelectors,
        !shouldReplaceColors,
      );

      const skipTransformsSelectors = selectorsToList(
        relPathWithSlash,
        mergedOptions.skipTransformsSelectors,
        shouldSkipTransforms,
      );

      // Hash path and transform parameters to guarantee same output for duplicate parameters.
      // We don't want to cache the results because there may be a lot of files. Limited cache also won't help because
      // duplicates won't likely follow one after another.

      let hash = relPathWithSlash + "-";

      for (const param of [shouldSkipTransforms, shouldPreserveLineWidth, shouldReplaceColors]) {
        hash += param ? "1" : "0";
      }

      if (shouldReplaceColors) {
        hash += JSON.stringify(colorReplacements);
      }

      hash = new MurmurHash3(hash).result();

      // Create unique asset file name
      const fileNameNoExt = path.basename(relPathWithSlash).split(".")[0];
      const assetFileNameNoExt = `${fileNameNoExt}-${hash}`;
      const assetFileName = assetFileNameNoExt + ".svg";
      const assetRelPath = path.dirname(relPathWithSlash) + "/" + assetFileName;

      const fullPath = root + relPathWithSlash;
      let code = fs.readFileSync(fullPath).toString();
      let isFillSetOnRoot = false;

      const nodesWithOrigColors: XastChild[] = [];
      let didTransform = false; // Detect additional passes, see multipass option

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
              if (didTransform) {
                return null;
              }

              didTransform = true;

              return {
                root: {
                  enter: (root) => {
                    for (const selectors of [skipReplaceColorsSelectors, skipTransformsSelectors]) {
                      for (const selector of selectors) {
                        nodesWithOrigColors.push(...querySelectorAll(root, selector));
                      }
                    }
                  },
                },
                element: {
                  enter: (node) => {
                    if (matchesSelectors(node, skipTransformsSelectors)) {
                      return;
                    }

                    if (shouldPreserveLineWidth && !matchesSelectors(node, skipPreserveLineWidthSelectors)) {
                      preserveLineWidth(node, fullPath);
                    }

                    if (shouldReplaceColors && !matchesSelectors(node, skipReplaceColorsSelectors)) {
                      isFillSetOnRoot = replaceColors(node, isFillSetOnRoot, colorReplacements, nodesWithOrigColors);
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
          return "export default `" + escapeBackticks(code) + "`;";
        case "source-data-uri":
          return "export default `data:image/svg+xml," + encodeURIComponent(code) + "`;";
        case "base64":
          return "export default `" + escapeBackticks(toBase64(code)) + "`;";
        case "base64-data-uri":
          return "export default `data:image/svg+xml;base64," + encodeURIComponent(toBase64(code)) + "`;";
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

/**
 * Escapes backticks in a string with a slash: \\\`
 */
function escapeBackticks(str: string) {
  return str.replaceAll("`", "\\`");
}

/**
 * Checks if given relative path or filename matches query value or a list of matchers
 * @param relPathWithSlash Relative path with leading slash
 * @param queryValue Value of a query param to check. If value exists and not equals to `false` (case-insensitive),
 * function returns `true`.
 * @param matchers List of matchers to check path and filename against
 */
function matchesQueryOrList(relPathWithSlash: string, queryValue: string | undefined, matchers: (string | RegExp)[]) {
  return matchesQuery(queryValue) || matchesPath(relPathWithSlash, matchers);
}

function matchesQuery(queryValue: string | undefined) {
  return !!queryValue && queryValue.toLowerCase() !== "false";
}

/**
 * Checks if given relative path or filename matches a list of matchers
 * @param relPathWithSlash Relative path with leading slash
 * @param matchers List of matchers to check path and filename against
 */
function matchesPath(relPathWithSlash: string, matchers: (string | RegExp)[]) {
  const filename = path.basename(relPathWithSlash);
  const toMatch = [filename, relPathWithSlash];

  for (const matcher of matchers) {
    const isRegex = matcher instanceof RegExp;

    for (const entry of toMatch) {
      if (isRegex) {
        return !!matcher.exec(entry);
      }

      return entry === matcher;
    }
  }

  return false;
}

/**
 * Converts CSS selectors to a list
 * @param relPathWithSlash Relative path with leading slash
 * @param selectors Selectors
 */
function selectorsToList(
  relPathWithSlash: string,
  selectors: (string | SelectorsPerFiles)[],
  returnEmptyList?: boolean,
) {
  const resolvedSelectors: string[] = [];

  if (returnEmptyList) {
    return resolvedSelectors;
  }

  for (const selector of selectors) {
    if (typeof selector === "string") {
      resolvedSelectors.push(selector);
      continue;
    }

    if (matchesPath(relPathWithSlash, selector.files)) {
      resolvedSelectors.push(...selector.selectors);
    }
  }

  return resolvedSelectors;
}

/**
 * Checks if a node matches at least one CSS selector in a list
 */
function matchesSelectors(node: XastChild, selectors: string[]) {
  for (const selector of selectors) {
    if (matchesSelector(node, selector)) {
      return true;
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

/**
 * A list of elements which should have `fill` property to be forcefully replaced.
 *
 * Fill color of these elements defaults to black, if `fill` property is not defined.
 */
const ELEMENTS_TO_FORCE_SET_FILL_OF: Record<string, true> = {
  circle: true,
  ellipse: true,
  path: true,
  polygon: true,
  polyline: true,
  rect: true,
  text: true,
  textPath: true,
  tref: true,
  tspan: true,
};

const COLOR_ATTRS_TO_REPLACE: Record<string, true> = {
  // Fill is done separately
  "stroke": true,
  "stop-color": true,
};

const IGNORE_COLORS: Record<string, true> = {
  none: true,
  transparent: true,
  currentColor: true,
};

function replaceColor(color: string | undefined, replacements: ResolvedColorReplacements) {
  if (!color) {
    return "";
  }

  return replacements.replacements[color.toLowerCase()] || replacements.default || color;
}

/**
 * Sets current color of a given node
 * @returns New value of `isFillSetOnRoot`.
 */
function replaceColors(
  node: XastElement,
  isFillSetOnRoot: boolean,
  replacements: ResolvedColorReplacements,
  nodesWithOrigColors: XastChild[],
) {
  if (node.name === "style") {
    const firstChild: any = node.children[0];
    const newCss = replaceColorsCss(firstChild?.value, replacements, nodesWithOrigColors, false);

    if (newCss) {
      firstChild.value = newCss;
    }
  } else {
    const newCss = replaceColorsCss(node.attributes.style, replacements, nodesWithOrigColors, true);

    if (newCss) {
      node.attributes.style = newCss;
    }
  }

  const isRoot = node.name === "svg";
  const fillAttr = node.attributes.fill;

  // If fill is set on <svg>, it'll override default fill of all underlying elements. If that's the case,
  // we shouldn't forcefully replace fill color of elements that are filled by default but don't have a color set
  if (isRoot && fillAttr) {
    isFillSetOnRoot = true;
  }

  // Forcefully replace fill color unless we have what's described above
  if (
    ((isRoot && isFillSetOnRoot) || (!isRoot && !isFillSetOnRoot && ELEMENTS_TO_FORCE_SET_FILL_OF[node.name])) &&
    !IGNORE_COLORS[fillAttr]
  ) {
    node.attributes.fill = replaceColor(fillAttr, replacements);
  }

  // Replace rest of the colors
  for (const attr in COLOR_ATTRS_TO_REPLACE) {
    const attrsColor = node.attributes[attr];

    if (attrsColor && !IGNORE_COLORS[attrsColor]) {
      node.attributes[attr] = replaceColor(attrsColor, replacements);
    }
  }

  return isFillSetOnRoot;
}

function replaceColorsCss(
  css: any,
  replacements: ResolvedColorReplacements,
  nodesWithOrigColors: XastChild[],
  isInline = false,
) {
  if (!css || typeof css !== "string") {
    return "";
  }

  let context = "stylesheet";

  if (isInline) {
    css = `{${css}}`;
    context = "block";
  }

  // For original colors preservation
  const shouldPreserveColors = !isInline && nodesWithOrigColors.length;
  let origColorSelectors: string[] = [];
  let currentColorSelectors: string[] = [];
  let didSplitSelectors = false;

  const ast = csstree.parse(css, { context });

  csstree.walk(ast, {
    // Ignore because of broken types in csstree:
    // @ts-ignore
    visit: shouldPreserveColors ? undefined : "Declaration",

    enter: function (node) {
      // Skip rules with original colors
      if ((node as any).__SKIP_SVG_LOADER__ || (this.rule as any)?.__SKIP_SVG_LOADER__) {
        return;
      }

      // If need to preserve colors
      if (shouldPreserveColors) {
        // Reset lists if it's new rule
        if (node.type === "SelectorList") {
          origColorSelectors = [];
          currentColorSelectors = [];
          didSplitSelectors = false;
          return;
        }

        // Classify selectors
        if (node.type === "Selector") {
          const selector = csstree.generate(node);
          let isOrigColor = false;

          for (const svgNode of nodesWithOrigColors) {
            if (matchesSelector(svgNode, selector)) {
              isOrigColor = true;
              (node as any).__ORIG_COLOR__ = true;
              break;
            }
          }

          (isOrigColor ? origColorSelectors : currentColorSelectors).push(selector);
          return;
        }
      }

      // Check if there's a declaration with a color, and if this color should be replaced

      if (node.type !== "Declaration" || !COLOR_ATTRS_TO_REPLACE[node.property]) {
        return;
      }

      // @ts-ignore
      const identifier = node.value?.children?.first;
      const color = identifier?.value || identifier?.name;

      if (!color || IGNORE_COLORS[color]) {
        return;
      }

      // Create new rule with original colors and remove such selectors from the current rule.
      // We'll replace color in the current rule.

      if (shouldPreserveColors && !didSplitSelectors && this.rule?.prelude.type === "SelectorList") {
        // Split selectors and create a new rule

        const origColorsRule = csstree.clone(this.rule) as csstree.Rule;
        (origColorsRule as any).__SKIP_SVG_LOADER__ = true;
        const origColorsSelectors = new csstree.List<csstree.CssNode>();
        const selectors = this.rule.prelude.children;

        selectors.forEach((node, listItem) => {
          if ((node as any).__ORIG_COLOR__) {
            selectors.remove(listItem);
            origColorsSelectors.push(node);
          }
        });

        (origColorsRule.prelude as csstree.SelectorList).children = origColorsSelectors;

        // Parent can be either at-rule or stylesheet
        const parent = this.atrule?.block?.children || this.stylesheet?.children;

        // Find current rule in parent. FFS, why there's no indices?
        let insertBefore: csstree.ListItem<csstree.CssNode> | undefined;

        parent?.some((rule, listItem) => {
          if (rule === this.rule) {
            insertBefore = listItem;
            return true;
          }

          return false;
        });

        insertBefore ? parent?.insertData(origColorsRule, insertBefore) : parent?.push(origColorsRule);
        didSplitSelectors = true;
      }

      // Replace color

      node.value = csstree.parse(replaceColor(csstree.generate(node.value), replacements), {
        context: "value",
      }) as csstree.Value;
    } satisfies csstree.EnterOrLeaveFn,
  });

  return csstree.generate(ast);
}
