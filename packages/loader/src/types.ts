/**
 * SVG loader options.
 *
 * **Paths**
 *
 * If an option accepts a path, both file name and the path relative to the project's root with leading slash are
 * compared against the matchers.
 *
 * For example, for a file `/src/assets/icons/menu.svg` following strings will be compared:
 *
 * 1. `/assets/icons/menu.svg` - note that it doesn't start with `/src`
 * 2. `menu.svg`
 *
 * To avoid transforming multiple files with the same name, always include path into each entry.
 *
 * Examples:
 *
 * ```ts
 * viteAwesomeSvgLoader({
 *   preserveLineWidthList: [
 *     // Recommended formats:
 *     new RegExp("\\/img\\/icons"), // Matches all paths containing "/img/line-art/"
 *     "/assets/img/logo.svg", // Matches single file "/assets/img/logo.svg"
 *
 *     // Not recommended formats:
 *     "splash.svg", // Matches all files named "splash.svg"
 *     new RegExp("\\/icons\\/plus\\.svg", // Matches all paths containing "/icons/plus.svg"
 *   ],
 * })
 * ```
 */
export interface SvgLoaderOptions {
  /**
   * Temporary directory where SVG files will be stored in dev mode.
   *
   * @default "temp"
   */
  tempDir?: string;

  /**
   * A list of files or directories to preserve line width of, i.e. to set `vector-effect="non-scaling-stroke"`.
   *
   * This option is primarily for icons and line art.
   *
   * This also can be done in an import: `import imageSrc from "./path/to/image.svg?preserve-line-width"`.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   preserveLineWidthList: [new RegExp("some\\/pattern\\/"), "some/directory", "some/file.svg"],
   * })
   */
  preserveLineWidthList?: (string | RegExp)[];

  /**
   * A list of files or directories to disable preserving line width of. Overrides {@link preserveLineWidthList}.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipPreserveLineWidthList: [new RegExp("some\\/pattern\\/"), "some/directory", "some/file.svg"],
   * })
   */
  skipPreserveLineWidthList?: (string | RegExp)[];

  /**
   * A list of CSS selectors to disable {@link preserveLineWidthList} for. Use it to leave specific elements stroke
   * width as-is.
   *
   * Can be a list of selectors or selectors-per-files specifiers.
   *
   * Unlike {@link skipSetCurrentColorSelectors} and {@link skipTransformsSelectors}, doesn't impact build performance.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipPreserveLineWidthSelectors: [
   *     // It can be a list of CSS selectors like this one. Every element in every file will be checked against it.
   *     '*[data-original-line-width="true"], *[data-original-line-width="true"] *',
   *
   *     // Or it can be configured on per-file basis:
   *     {
   *       files: [/ignore-elements\.svg/, /some-other-file\.svg/],
   *       selectors: ['*[data-original-line-width="true"], *[data-original-line-width="true"] *'],
   *     },
   *   ],
   * })
   */
  skipPreserveLineWidthSelectors?: (string | SelectorsPerFiles)[];

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
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   replaceColorsList: [
   *     // File names
   *     "some-file.svg",
   *
   *     // Regexes that are checked against whole path and file name with extension
   *     new RegExp("some\\/pattern\\/"),
   *
   *     // Map of color replacements. Key is an original color, value is its replacement. Both can be any values:
   *     // HEX, name, rgb() or arbitrary custom values. Applied to all files.
   *     {
   *       "#003147": "red",
   *       "rgb(0, 49, 71)": "#003147",
   *       "myCustomColor": "var(--some-color-var)",
   *     },
   *
   *     // Map of color replacements per files
   *     {
   *       files: ["vars.svg"], // File names or regexes, same format as above
   *
   *       // Replacements, same format as above
   *       replacements: {
   *         red: "var(--primary-color)",
   *         green: "var(--secondary-color)",
   *         blue: "var(--tertiary-color)",
   *       },
   *
   *       // Default value for colors that are not in replacements map. Set an empty string to preserve original colors.
   *       // Default value is "currentColor",
   *       default: "currentColor"
   *     },
   *   ],
   * })
   */
  replaceColorsList?: (string | RegExp | ColorMap | ColorMapPerFiles)[];

  /**
   * A list of files or directories to disable color replacements of. Overrides {@link replaceColorsList}.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipReplaceColorsList: [new RegExp("some\\/pattern\\/"), "some/directory", "some/file.svg"],
   * })
   */
  skipReplaceColorsList?: (string | RegExp)[];

  /**
   * A list of CSS selectors to disable {@link skipReplaceColorsList} for. Use it to leave specific elements colors
   * as-is.
   *
   * Can be a list of selectors or selectors-per-files specifiers.
   *
   * **You probably don't need this option.** Think about other solutions to your problem. See the demos for the tips.
   *
   * **Heavy usage may significantly slow down build time.** Limit selectors to specific files to improve performance.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipReplaceColorsSelectors: [
   *     // It can be a list of CSS selectors like this one. Every element in every file will be checked against it.
   *     '*[data-original-colors="true"], *[data-original-colors="true"] *',
   *
   *     // Or it can be configured on per-file basis:
   *     {
   *       files: [/ignore-elements\.svg/, /some-other-file\.svg/],
   *       selectors: ['*[data-original-colors="true"], *[data-original-colors="true"] *'],
   *     },
   *   ],
   * })
   */
  skipReplaceColorsSelectors?: (string | SelectorsPerFiles)[];

  /**
   * A list of files to skip while transforming. Applies to any transformation except SVGO.
   *
   * For example, if you add a directory to {@link preserveLineWidthList} and add a file in that directory to this list,
   * line width of added file won't be preserved.
   *
   * SVGO is still applied to the added files.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipTransformsList: [new RegExp("some\\/pattern\\/"), "some/directory", "some/file.svg"],
   * })
   */
  skipTransformsList?: (string | RegExp)[];

  /**
   * A list of CSS selectors to disable all transforms for. Use it to leave specific elements as-is.
   *
   * Can be a list of selectors or selectors-per-files specifiers.
   *
   * **You probably don't need this option.** Think about other solutions to your problem. See the demos for the tips.
   *
   * **Heavy usage may significantly slow down build time.** Limit selectors to specific files to improve performance.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipTransformsSelectors: [
   *     // It can be a list of CSS selectors like this one. Every element in every file will be checked against it.
   *     '*[data-no-transforms="true"], *[data-no-transforms="true"] *',
   *
   *     // Or it can be configured on per-file basis:
   *     {
   *       files: [/ignore-elements\.svg/, /some-other-file\.svg/],
   *       selectors: ['*[data-no-transforms="true"], *[data-no-transforms="true"] *'],
   *     },
   *   ],
   * })
   */
  skipTransformsSelectors?: (string | SelectorsPerFiles)[];

  /**
   * A list of files to skip loading of. Files will be passed to another loader.
   *
   * This also can be done in an import: `import imageSrc from "./path/to/image.svg?skip-transforms"`.
   *
   * @example
   *
   * viteAwesomeSvgLoader({
   *   skipFilesList: [new RegExp("some\\/pattern\\/"), "some/directory", "some/file.svg"],
   * })
   */
  skipFilesList?: (string | RegExp)[];

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
  defaultImport?: ImportType;

  // Deprecated options

  /**
   * A list of files or directories to replace fill, stroke and `<stop>` colors of with `currentColor`.
   *
   * Overrides {@link replaceColorsList}.
   *
   * @deprecated Deprecated in favor of {@link replaceColorsList}
   */
  setCurrentColorList?: (string | RegExp)[];

  /**
   * A list of files or directories to disable setting current color of. Overrides {@link setCurrentColorList} and
   * {@link replaceColorsList}.
   *
   * @deprecated Deprecated in favor of {@link replaceColorsList}
   */
  skipSetCurrentColorList?: (string | RegExp)[];

  /**
   * A list of CSS selectors to disable {@link setCurrentColorList} for.Overrides {@link setCurrentColorList},
   * {@link replaceColorsList} and {@link skipReplaceColorsSelectors}.
   *
   * @deprecated Deprecated in favor of {@link skipReplaceColorsSelectors}
   */
  skipSetCurrentColorSelectors?: (string | SelectorsPerFiles)[];

  /**
   * Should emit SVG files in [library mode](https://vite.dev/guide/build.html#library-mode) when SVGs are imported via
   * `?url` import type.
   *
   * Possible values:
   *
   * 1. `source-data-uri` - no files will be emitted, and source data URI will be exported
   * (like with `?source-data-uri` import type).
   *
   * 1. `base-64-data-uri` - no files will be emitted, and base64 data URI will be exported
   * (like with `?base-64-data-uri` import type).
   *
   *
   * 1. `emit-files` - files will be emitted, and exports like this will be produced:
   *
   *    ```ts
   *    "" + new URL("file-name-[hash].svg", import.meta.url).href
   *    ```
   *
   *    **Warning:** suitable only for internal use because:
   *
   *    1. This may cause issues when your library is consumed. Additional setup from the users will be required.
   *    1. This is not aligned with the default Vite behavior.
   *
   * @default "source-data-uri"
   */
  urlImportsInLibraryMode?: UrlImportsInLibraryMode;
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
 * const map = {
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
