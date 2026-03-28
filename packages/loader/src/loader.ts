import type { ConfigEnv, Plugin, UserConfig } from "vite";
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "path";
import { optimize } from "svgo";
import { XastChild } from "svgo/lib/types";
// TODO: Update import when SVGO 4.x.x will be released, it should export utility functions
// @ts-expect-error
import { querySelectorAll } from "svgo/lib/xast.js";
import MurmurHash3 from "imurmurhash";
import {
  ColorMap,
  ColorMapPerFiles,
  CssSelectors,
  FileMatcher,
  FileMatcherFnContext,
  FileMatchers,
  SvgLoaderOptions,
} from "./types";
import {
  escapeBackticks,
  isColorMapPerFiles,
  matchesPath,
  matchesQuery,
  matchesQueryOrPath as matchesQueryOrPathRaw,
  matchesSelectors,
  normalizeBaseDir,
  selectorsToList as selectorsToListRaw,
  toBase64,
} from "./internal/misc";
import { preserveLineWidth } from "./internal/preserveLineWidth";
import { ResolvedColorReplacements } from "./internal/types";
import { replaceColorsSvg } from "./internal/replaceColorsSvg";
import { IMPORT_TYPES } from "./internal/const";
import { toArray } from "common-utils";

/**
 * `vite-awesome-svg-loader` plugin.
 *
 * See {@link SvgLoaderOptions} for advanced configuration.
 *
 * @param options Plugin options. It is recommended to provide options instead of using queries in imports.
 */
export function viteAwesomeSvgLoader(options: SvgLoaderOptions = {}): Plugin {
  const { urlImportsInLibraryMode = "source-data-uri" } = options;
  let tempDir = options.tempDir || ".temp";

  if (tempDir.startsWith("/") || tempDir.startsWith("./") || tempDir.indexOf(":/") !== -1) {
    throw new Error(
      '"tempDir" option must be in format "path/to/temp/dir",' +
        'i.e. it shouldn\'t be an absolute path, or start with "./".' +
        "It'll be resolved to the project's root by the plugin.",
    );
  }

  if (tempDir.endsWith("/")) {
    tempDir = tempDir.substring(0, tempDir.length - 1);
  }

  tempDir = "/" + tempDir;

  let isBuildMode = false;
  let isLibraryMode = false;
  let root = "";
  let base = "";

  const replaceColorsList = toArray(options.replaceColorsList || []);

  // Prioritize replacements like so:
  const replacementsWithFiles: ColorMapPerFiles[] = []; // ColorMapPerFiles
  const filesWithCurrentColor: ColorMapPerFiles[] = []; // FileMatcher

  // ColorMap
  const allFilesReplacements: ColorMapPerFiles = {
    files: /.*/,
    replacements: {},
    default: "",
  };

  let hasAllFilesReplacements = false;

  const isFileMatcher = (value: Exclude<(typeof replaceColorsList)[0], ColorMapPerFiles>): value is FileMatcher => {
    switch (typeof value) {
      case "string":
      case "function":
        return true;
    }

    return value instanceof RegExp;
  };

  // Normalize list and apply prioritization
  for (const replacements of replaceColorsList) {
    if (isColorMapPerFiles(replacements)) {
      replacementsWithFiles.push(replacements);
      continue;
    }

    if (isFileMatcher(replacements)) {
      filesWithCurrentColor.push({
        files: replacements,
        replacements: {},
        default: "currentColor",
      });

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
      isLibraryMode = !!config.build.lib;
      root = normalizeBaseDir(config.root);
      base = normalizeBaseDir(config.base);
    },

    configureServer(server) {
      server.httpServer?.on("close", async () => {
        if (!isBuildMode) {
          await rm(root + tempDir, { force: true, recursive: true });
        }
      });
    },

    async load(id: string) {
      const ext = ".svg";
      const indexOfSvg = id.indexOf(ext);

      if (indexOfSvg === -1) {
        return null;
      }

      // Normalize file path. Vite seems to always pass absolute path, but let's be safe.

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

      // Create wrappers around matching functions for convenience

      const fileMatcherCtx: FileMatcherFnContext = {
        fullPath: (root.endsWith("/") ? root.substring(root.length) : root) + relPathWithSlash,
        relativePath: relPathWithSlash,
      };

      const matchesQueryOrPath = (options: { matchers: FileMatchers | undefined; param?: string }) =>
        matchesQueryOrPathRaw({
          ...fileMatcherCtx,
          matchers: options.matchers || [],
          queryValue: query[options.param!],
        });

      const selectorsToList = (selectors: CssSelectors | undefined) =>
        selectorsToListRaw({ ...fileMatcherCtx, selectors: selectors || [] });

      // Skip specified files

      if (matchesQueryOrPath({ param: "skip-awesome-svg-loader", matchers: options.skipFilesList })) {
        return null;
      }

      // Resolve transform configuration

      const shouldSkipTransforms = matchesQueryOrPath({
        param: "skip-transforms",
        matchers: options.skipTransformsList,
      });

      const shouldPreserveLineWidth =
        !shouldSkipTransforms &&
        matchesQueryOrPath({ param: "preserve-line-width", matchers: options.preserveLineWidthList }) &&
        !matchesQueryOrPath({ matchers: options.skipPreserveLineWidthList });

      const skipPreserveLineWidthSelectors = shouldPreserveLineWidth
        ? selectorsToList(options.skipPreserveLineWidthSelectors)
        : [];

      let shouldReplaceColors = false;

      const colorReplacements: ResolvedColorReplacements = {
        replacements: {},
        // @ts-ignore
        default: undefined,
      };

      if (!shouldSkipTransforms && !matchesQueryOrPath({ matchers: options.skipReplaceColorsList })) {
        if (matchesQuery(query["set-current-color"])) {
          colorReplacements.default = "currentColor";
          shouldReplaceColors = true;
        } else {
          for (const entry of replaceColorsListNormalized) {
            if (!matchesPath({ ...fileMatcherCtx, matchers: entry.files })) {
              continue;
            }

            shouldReplaceColors = true;

            if (colorReplacements.default === undefined && entry.default !== undefined) {
              colorReplacements.default = entry.default;
            }

            for (const color in entry.replacements) {
              colorReplacements.replacements[color] ||= entry.replacements[color];
            }
          }
        }
      }

      colorReplacements.default ??= "currentColor";

      const skipReplaceColorsSelectors = shouldReplaceColors ? selectorsToList(options.skipReplaceColorsSelectors) : [];
      const skipTransformsSelectors = shouldSkipTransforms ? [] : selectorsToList(options.skipTransformsSelectors);

      // Hash path and transform parameters to guarantee same output for duplicate parameters. All parameters
      // should be accounted and normalized (i.e. stuff like whitespace in CSS selectors shouldn't affect output).
      //
      // We don't want to cache the results because there may be a lot of files. Limited cache also won't help because
      // duplicates won't likely follow one after another.

      const hashParts: string[] = [relPathWithSlash];

      for (const arr of [skipPreserveLineWidthSelectors, skipReplaceColorsSelectors, skipTransformsSelectors]) {
        hashParts.push(arr.join(","));
      }

      for (const param of [shouldSkipTransforms, shouldPreserveLineWidth, shouldReplaceColors]) {
        hashParts.push(param ? "1" : "0");
      }

      if (shouldReplaceColors) {
        hashParts.push(JSON.stringify(colorReplacements));
      }

      const hash = new MurmurHash3(hashParts.join("__")).result();

      // Create unique asset file name
      const fileNameNoExt = path.basename(relPathWithSlash).split(".")[0];
      const assetFileNameNoExt = `${fileNameNoExt}-${hash}`;
      const assetFileName = assetFileNameNoExt + ".svg";
      const assetRelPath = path.dirname(relPathWithSlash) + "/" + assetFileName;

      const fullPath = root + relPathWithSlash;
      let code = (await readFile(fullPath)).toString();
      let isFillSetOnRoot = false;

      const nodesWithOrigColors: XastChild[] = [];
      const classesAndIdsPrefix = assetFileNameNoExt + "__";
      let didTransform = false; // Detect additional passes, see multipass option

      code = optimize(code, {
        multipass: true,
        plugins: [
          {
            name: "prefixIds",
            params: {
              prefixIds: true,
              prefixClassNames: true,
              prefix: classesAndIdsPrefix,
              delim: "",
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

      let importType = options.defaultImport || "source";

      for (const type of IMPORT_TYPES) {
        if (query[type]) {
          importType = type;
        }
      }

      if (isLibraryMode && importType === "url" && urlImportsInLibraryMode !== "emit-files") {
        importType = urlImportsInLibraryMode;
      }

      /**
       * Returns exports string
       * @param src Source code enclosed with quotes. Single quotes, double quotes and backticks are fine
       * as long as they're escaped in the actual source code.)
       * @returns Exports string
       */
      const getExports = (src: string) => {
        return [
          `export const src = ${src};`,
          `export const prefix = "${classesAndIdsPrefix}"`,
          `export default src`,
        ].join("\n");
      };

      switch (importType) {
        case "source":
          return getExports("`" + escapeBackticks(code) + "`");
        case "source-data-uri":
          return getExports("`data:image/svg+xml," + encodeURIComponent(code) + "`");
        case "base64":
          return getExports("`" + escapeBackticks(toBase64(code)) + "`");
        case "base64-data-uri":
          return getExports("`data:image/svg+xml;base64," + encodeURIComponent(toBase64(code)) + "`");
      }

      if (!isBuildMode) {
        const assetUrl = tempDir + assetRelPath;
        await writeFile(root + assetUrl, code);
        return getExports(`"${base + assetUrl}"`);
      }

      const assetId = this.emitFile({
        type: "asset",
        name: assetFileName,
        source: code,
      });

      return getExports(`"__VITE_ASSET__${assetId}__"`);
    },
  };
}
