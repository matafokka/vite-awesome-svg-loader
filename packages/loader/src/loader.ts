import type { ConfigEnv, Plugin, UserConfig } from "vite";
import fs from "fs-extra";
import path from "path";
import { optimize } from "svgo";
import { XastChild } from "svgo/lib/types";
// TODO: Update import when SVGO 4.x.x will be released, it should export utility functions
// @ts-expect-error
import { querySelectorAll } from "svgo/lib/xast.js";
import MurmurHash3 from "imurmurhash";
import { ColorMap, ColorMapPerFiles, ImportType, SvgLoaderOptions } from "./types";
import {
  escapeBackticks,
  matchesPath,
  matchesQuery,
  matchesQueryOrList,
  matchesSelectors,
  normalizeBaseDir,
  selectorsToList,
  toBase64,
} from "./internal/misc";
import { preserveLineWidth } from "./internal/preserveLineWidth";
import { ResolvedColorReplacements } from "./internal/types";
import { replaceColorsSvg } from "./internal/replaceColorsSvg";
import { IMPORT_TYPES } from "./internal/const";

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
 * 1. Can replace colors with `currentColor` (or custom color via config):
 * `import imageSrc from "./path/to/image.svg?set-current-color"`.
 * See also: {@link SvgLoaderOptions.replaceColorsList}.
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
                      isFillSetOnRoot = replaceColorsSvg(node, isFillSetOnRoot, colorReplacements, nodesWithOrigColors);
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
