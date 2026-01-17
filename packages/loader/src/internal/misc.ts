import { XastChild } from "svgo/lib/types";
// TODO: Update import when SVGO 4.x.x will be released, it should export utility functions
// @ts-expect-error
import { matches as matchesSelectorRaw } from "svgo/lib/xast.js";
import type { ColorMapPerFiles, CssSelectors, FileMatcherFnContext, FileMatchers } from "../types";
import path from "path";
import { ResolvedColorReplacements } from "./types";
import { toArray } from "utils";

export function normalizeBaseDir(dir: string) {
  dir = dir.replaceAll("\\", "/");

  if (dir.endsWith("/")) {
    dir = dir.substring(0, dir.length - 1);
  }

  return dir;
}

export function toBase64(str: string) {
  const binString = String.fromCodePoint(...new TextEncoder().encode(str));
  return btoa(binString);
}

/**
 * Escapes backticks in a string with a slash: \\\`
 */
export function escapeBackticks(str: string) {
  return str.replaceAll("`", "\\`");
}

export interface MatchesQueryOrListOptions extends MatchesPathOptions {
  queryValue?: string;
}

/**
 * Checks if given relative path or filename matches query value or a list of matchers
 * @param relPathWithSlash Relative path with leading slash
 * @param queryValue Value of a query param to check. If value exists and not equals to `false` (case-insensitive),
 * function returns `true`.
 * @param matchers List of matchers to check path and filename against
 */
export function matchesQueryOrPath(options: MatchesQueryOrListOptions) {
  return matchesQuery(options.queryValue) || matchesPath(options);
}

export function matchesQuery(queryValue: string | undefined) {
  return !!queryValue && queryValue.toLowerCase() !== "false";
}

export interface MatchesPathOptions extends FileMatcherFnContext {
  matchers: FileMatchers;
}

/**
 * Checks if given relative path or filename matches a list of matchers
 * @param relPathWithSlash Relative path with leading slash
 * @param matchers List of matchers to check path and filename against
 */
export function matchesPath(options: MatchesPathOptions) {
  const filename = path.basename(options.relativePath);
  const toMatch = [filename, options.relativePath];
  const matchers = toArray(options.matchers)

  if (!matchers.length) {
    return false
  }

  return matchers.some((matcher) => {
    switch (typeof matcher) {
      case "string":
        return toMatch.some((v) => v === matcher);

      case "function":
        return matcher({ fullPath: options.fullPath, relativePath: options.relativePath });
    }

    return toMatch.some((v) => matcher.test(v));
  });
}

/**
 * Normalizes selector string. For now, removes unneccesarry whitespace.
 */
function normalizeSelector(selector: string) {
  return selector.replaceAll(/\s+/g, " ").trim();
}

export interface SelectorsToListOptions extends FileMatcherFnContext {
  selectors: CssSelectors;
}

/**
 * Converts CSS selectors to a list and normalizes each selector
 * @param relPathWithSlash Relative path with leading slash
 * @param selectors Selectors
 */
export function selectorsToList(options: SelectorsToListOptions) {
  const selectors = toArray(options.selectors);
  const resolvedSelectors: string[] = [];

  for (const selector of selectors) {
    if (typeof selector === "string") {
      resolvedSelectors.push(normalizeSelector(selector));
      continue;
    }

    if (matchesPath({ ...options, matchers: selector.files })) {
      for (const selectorStr of selector.selectors) {
        resolvedSelectors.push(normalizeSelector(selectorStr));
      }
    }
  }

  return resolvedSelectors;
}

/**
 * Checks if a node matches a selector
 */
export const matchesSelector: (node: XastChild, selector: string) => boolean = matchesSelectorRaw;

/**
 * Checks if a node matches at least one CSS selector in a list
 */
export function matchesSelectors(node: XastChild, selectors: string[]) {
  for (const selector of selectors) {
    if (matchesSelector(node, selector)) {
      return true;
    }
  }

  return false;
}

export function replaceColor(color: string | undefined, replacements: ResolvedColorReplacements) {
  if (!color) {
    return replacements.default || "";
  }

  return replacements.replacements[color.toLowerCase()] || replacements.default || color;
}

export function isColorMapPerFiles(value: unknown): value is ColorMapPerFiles {
  return Array.isArray((value as any)?.files);
}
