import type { MaybeArray } from "types/utility";

/**
 * `vite-awesome-svg-loader` options
 */
export interface SvgLoaderOptions {
  /**
   * Temporary directory where SVG files will be stored in dev mode.
   *
   * @default "temp"
   */
  tempDir?: string;

  /**
   * Files where line width should be preserved by adding `vector-effect="non-scaling-stroke"`.
   *
   * See {@link FileMatchers} for the available formats.
   *
   * **Alternative**: Use import query: `import image from "./image.svg?preserve-line-width"`.
   */
  preserveLineWidthList?: FileMatchers;

  /**
   * Files where line width should **NOT** be preserved.
   *
   * Takes precedence over {@link preserveLineWidthList} and import queries
   * (`import image from "./image.svg?preserve-line-width"`).
   *
   * See {@link FileMatchers} for the available formats.
   */
  skipPreserveLineWidthList?: FileMatchers;

  /**
   * CSS selectors where line width should **NOT** be preserved. Use this to keep specific elements' stroke widths
   * unchanged.
   *
   * See {@link CssSelectors} for the available formats and more configuration options.
   *
   * **Note:** Unlike {@link skipSetCurrentColorSelectors} and {@link skipTransformsSelectors}, doesn't impact build
   * performance.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipPreserveLineWidthSelectors: [
   *     // Global selector:
   *     '*[data-original-line-width="true"], *[data-original-line-width="true"] *',
   *
   *     // File-scoped selector:
   *     {
   *       files: [new RegExp("\\/some\\-file\\.svg"), new RegExp("\\/other\\-file\\.svg")],
   *       selectors: ['*[data-original-line-width="true"], *[data-original-line-width="true"] *'],
   *     },
   *   ],
   * })
   */
  skipPreserveLineWidthSelectors?: CssSelectors;

  /**
   * Files where fill, stroke and `<stop>` colors should be replaced with `currentColor` (default) or custom colors.
   *
   * **What's replaced:**
   *
   * 1. `fill`, `stroke` and `stop-color` attributes.
   * 1. CSS identifiers.
   *
   * **What's untouched:**
   *
   * 1. `none`, `transparent`, and `currentColor` values.
   *
   * **Available formats** in application priority (from highest to lowest):
   *
   * 1. {@link ColorMapPerFiles} - a color to replacement map scoped to the files (see {@link FileMatchers})
   * specified in {@link ColorMapPerFile.files} property.
   *
   * 1. {@link ColorMap} - a color to replacement map applied to all files.
   *
   * 1. {@link FileMatcher} - files where all colors should be replaced with `currentColor`.
   *
   * If multiple entries match the same file, replacements are merged by following rules:
   *
   * 1. If two entries replace the same color or have {@link ColorMapPerFiles.default} set, the entry with highest
   * priority wins.
   *
   * 1. If, in previous case, both entries have the same priority, the entry with the lowest index in the original array
   * wins.
   *
   * **Caveats:**
   *
   * Opacity set by initial colors, i.e. `rgba()` is lost when color is replaced. This is so because opacity retention
   * would:
   *
   * 1. Still bring confusion because one may rightfully expect that color replacement will completely replace colors
   * and not correct them.
   *
   * 1. Slow down build process.
   *
   * 1. Impose high maintenance complexity.
   *
   * **Notes:**
   *
   * Setting `currentColor` can be done with an import: `import imageSrc from "./path/to/image.svg?set-current-color"`.
   *
   * Setting custom color is not possible with import queries.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   replaceColorsList: [
   *     // FileMatcher: files where all colors should be replaced with `currentColor`
   *     "some-file.svg",
   *     new RegExp("\\/some\\/directory\\/"),
   *     (ctx) => ctx.relativePath.includes("/some/directory/") || ctx.fullPath.endsWith("-image.svg"),
   *
   *     // ColorMap: map of color replacements.
   *     // Key is an original color, value is its replacement.
   *     {
   *       "#003147": "red",
   *       "rgb(0, 49, 71)": "#003147",
   *       "myCustomColor": "var(--some-color-var)",
   *     },
   *
   *     // ColorMapPerFiles: a color to replacement map scoped to the specified files
   *     {
   *       // File matchers
   *       files: ["vars.svg"],
   *
   *       // Replacements
   *       replacements: {
   *         red: "var(--primary-color)",
   *         green: "var(--secondary-color)",
   *         blue: "var(--tertiary-color)",
   *       },
   *
   *       // A default color for unspecified colors
   *       default: "red",
   *     },
   *   ],
   * })
   */
  replaceColorsList?: MaybeArray<FileMatcher | ColorMap | ColorMapPerFiles>;

  /**
   * Files where colors should **NOT** be replaced.
   *
   * Takes precedence over {@link replaceColorsList} and import queries
   * (`import image from "./image.svg?set-current-color"`).
   *
   * See {@link FileMatchers} for the available formats.
   */
  skipReplaceColorsList?: FileMatchers;

  /**
   * CSS selectors where colors should **NOT** be replaced. Use it to leave specific elements colors unchanged.
   *
   * See {@link CssSelectors} for the available formats and more configuration options.
   *
   * **Warning**: Heavy usage can significantly slow down build performance.
   *
   * Limit selectors to specific files to improve performance.
   *
   * Oe better, consider alternative approaches such as using color maps. See {@link replaceColorsList},
   * {@link ColorMap}, and {@link ColorMapPerFiles}) for the details.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipReplaceColorsSelectors: [
   *     // Global selector:
   *     '*[data-original-colors="true"], *[data-original-colors="true"] *',
   *
   *     // File-scoped selector:
   *     {
   *       files: [new RegExp("\\/some\\-file\\.svg"), new RegExp("\\/other\\-file\\.svg")],
   *       selectors: ['*[data-original-colors="true"], *[data-original-colors="true"] *'],
   *     },
   *   ],
   * })
   */
  skipReplaceColorsSelectors?: CssSelectors;

  /**
   * Files to **NOT** transform (except SVGO).
   *
   * See {@link FileMatchers} for the available formats.
   *
   * Takes precedence over {@link replaceColorsList}, {@link preserveLineWidthList}, and import queries
   * (`import image from "./image.svg?set-current-color&preserve-line-width"`).
   *
   * **Alternative**: Use import query: `import image from "./image.svg?skip-transforms"`.
   */
  skipTransformsList?: FileMatchers;

  /**
   * CSS selectors which should **NOT** be transformed. Use this to leave specific elements untouched.
   *
   * See {@link CssSelectors} for the available formats and more configuration options.
   *
   * **Warning**: Heavy usage can significantly slow down build performance.
   *
   * Limit selectors to specific files to improve performance.
   *
   * Or better, consider following approach:
   *
   * 1. To avoid color replacement, consider alternative approaches such as using color maps.
   * See {@link replaceColorsList}, {@link ColorMap}, and {@link ColorMapPerFiles}) for the details.
   *
   * 1. To avoid line width preservation, just use {@link skipPreserveLineWidthSelectors}.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipTransformsSelectors: [
   *     // Global selector:
   *     '*[data-no-transforms="true"], *[data-no-transforms="true"] *',
   *
   *     // File-scoped selector:
   *     {
   *       files: [new RegExp("\\/some\\-file\\.svg"), new RegExp("\\/other\\-file\\.svg")],
   *       selectors: ['*[data-no-transforms="true"], *[data-no-transforms="true"] *'],
   *     },
   *   ],
   * })
   */
  skipTransformsSelectors?: CssSelectors;

  /**
   * Files to bypass. They will be passed to another loader.
   *
   * See {@link FileMatchers} for the available formats.
   */
  skipFilesList?: FileMatchers;

  /**
   * Default import type when no import query is specified. Available values:
   *
   * 1. `source` - SVG source code (default).
   * 1. `url` - URL pointing to the file.
   * 1. `source-data-uri` - SVG source code encoded in data URI.
   * 1. `base64` - SVG source code encoded in base-64.
   * 1. `base64-data-uri`: SVG source code encoded in base-64 data URI.
   *
   * @default "source"
   */
  defaultImport?: ImportType;

  // Deprecated options

  /**
   * @deprecated Use {@link replaceColorsList}
   */
  setCurrentColorList?: FileMatchers;

  /**
   * @deprecated Use {@link replaceColorsList}
   */
  skipSetCurrentColorList?: FileMatchers;

  /**
   * @deprecated Use {@link skipReplaceColorsSelectors}
   */
  skipSetCurrentColorSelectors?: CssSelectors;

  /**
   * Behavior for `?url` imports in [library mode](https://vite.dev/guide/build.html#library-mode). Possible values:
   *
   * 1. `source-data-uri` - source data URI will be exported, no files will be emitted.
   *
   * 1. `base-64-data-uri` - base64 data URI will be exported, no files will be emitted.
   *
   * 1. `emit-files` - files will be emitted, following exports will be produced:
   *
   *    ```ts
   *    "" + new URL("file-name-[hash].svg", import.meta.url).href
   *    ```
   *
   *    **Warning:** May cause issues when your library is consumed. Requires additional configuration from the users.
   *    **Warning:** This behavior is not aligned with the default Vite behavior.
   *
   * @default "source-data-uri"
   */
  urlImportsInLibraryMode?: UrlImportsInLibraryMode;
}

/**
 * A single instance or an array of file matchers in following formats:
 *
 * 1. **File name**: `image.svg`.
 *
 * 1. **Path to a file** from the project's root: `/src/assets/image.svg`.
 *
 * 1. **RegExp**: tested against file name (`image.svg`) and relative path (`/src/assets/image.svg`).
 *
 * 1. **Function** ({@link FileMatcherFn}) that accepts information about a file and returns `true`, if line width
 * should be preserved.
 *
 * All paths use forward slash (`/`) as a separator. Relative paths start with `/`.
 *
 * **Recommendation:** Include path information and use clean project structure to avoid unintentional matches.
 *
 * @example
 *
 * const matchers: FileMatchers = [
 *   // Any file named "image.svg"
 *   "image.svg",
 *
 *   // Specific file
 *   "/src/assets/image.svg",
 *
 *   // Any path containing "/some/directory/"
 *   new RegExp("\\/some\\/directory\\/"),
 *
 *   // Any file ending with "-image.svg"
 *   new RegExp("\\-image\\.svg$"),
 *
 *   // Any path containing "/some/directory/" or any file ending with "-image.svg"
 *   (ctx) => ctx.relativePath.includes("/some/directory/") || ctx.fullPath.endsWith("-image.svg"),
 * ];
 */
export type FileMatchers = MaybeArray<FileMatcher>;

/**
 * Everything a file can be matched against
 */
export type FileMatcher = string | RegExp | FileMatcherFn;

/**
 * Custom file matcher
 *
 * @param ctx Matching context (information about a file)
 * @returns `true`, if file matches
 */
export type FileMatcherFn = (ctx: FileMatcherFnContext) => boolean;

/**
 * Information about a file to be matched against a custom rule
 */
export interface FileMatcherFnContext {
  /**
   * Full path to the file. Uses forward slash (`/`) as a separator.
   */
  fullPath: string;

  /**
   * Path to the file from the project's root. Uses forward slash (`/`) as a separator. Starts with a slash.
   */
  relativePath: string;
}

/**
 * SVG import type, see {@link SvgLoaderOptions.defaultImport}
 */
export type ImportType = "url" | "source" | "source-data-uri" | "base64" | "base64-data-uri";

/**
 * See {@link SvgLoaderOptions.urlImportsInLibraryMode}
 */
export type UrlImportsInLibraryMode = "emit-files" | "source-data-uri" | "base64-data-uri";

/**
 * A single instance or an array of CSS selectors ({@link CssSelector}).
 *
 * @example
 *
 * const selectors: CssSelectors = [
 *   // Global selector: applies to all files
 *   ".box > path",
 *
 *   // File-scoped: single selector in single file
 *   { selectors: ".box > path", files: "/assets/my-file.svg" },
 *
 *   // File-scoped: multiple selectors, multiple file matchers
 *   {
 *     files: ["/assets/my-file.svg", new RegExp("\\/some\\/directory\\/")],
 *     selectors: [".box > path", ".stripe.red"],
 *   }
 * ];
 */
export type CssSelectors = MaybeArray<CssSelector>;

/**
 * CSS selectors in following formats:
 *
 * 1. **String** - a selector that will be applied to all files.
 * 1. **Object** ({@link SelectorsPerFiles}) - selectors applied only to the specified files.
 */
export type CssSelector = string | SelectorsPerFiles;

/**
 * One or more selectors applied to one or more specified files
 */
export interface SelectorsPerFiles {
  /**
   * Files to which CSS selectors should be applied. See {@link FileMatchers} for the available formats.
   */
  files: FileMatchers;

  /**
   * A single instance or an array of CSS selectors
   */
  selectors: MaybeArray<string>;
}

/**
 * Maps original SVG colors (case-insensitive) to their replacements (any values: HEX, name, rgb() or even arbitrary
 * strings).
 *
 * Only specified keys will be replaced. Any other value even with the same color (i.e. `#00f` instead of "blue")
 * won't be affected.
 */
export type ColorMap = Record<string, string>;

/**
 * Maps original SVG colors (case-insensitive) to their replacements per specified files.
 *
 * @example
 *
 * const map = {
 *   // Files where colors should be replaced
 *   files: ["my-file.svg", /icon\-*.\.svg/],
 *
 *   // Color replacements
 *   replacements: {
 *     // Will replace all colors with "red" value with "var(--primary-color)".
 *     // It'll replace only "red" value. HEX ("#ff0000"), RGB ("rgb(255, 0, 0)") and other values won't be affected.
 *     "red": "var(--primary-color)",
 *
 *     // Same as above: this HEX value (case-insensitive) will be replaced with "var(--secondary-color)".
 *     // Any other value with the same color (such as "blue" or "hsl(240deg 100% 50%)") won't be affected.
 *     "#0000ff": "var(--secondary-color)",
 *
 *     // Again, only this value (case-insensitive) will be replaced with "var(--tertiary-color)".
 *     // Any other value won't be affected.
 *     "rgb(0, 255, 0)": "var(--tertiary-color)",
 *   },
 *
 *   // A default color for unspecified colors.
 *   // If not specified, "currentColor" is used.
 *   // If an empty string specified, other colors won't be affected.
 *   default: "red",
 * }
 */
export interface ColorMapPerFiles {
  /**
   * Files where colors should be replaced. See {@link FileMatchers} for the available formats.
   */
  files: FileMatchers;

  /**
   * Color replacements. See {@link ColorMap} for the details.
   */
  replacements: ColorMap;

  /**
   * Replacement for other colors. Set to empty string to leave colors untouched.
   *
   * @default "currentColor"
   */
  default?: string;
}
