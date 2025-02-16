import { XastChild } from "svgo/lib/types";
// TODO: Update import when SVGO 4.x.x will be released, it should export utility functions
// @ts-expect-error
import { matches as matchesSelectorRaw } from "svgo/lib/xast.js";
import type { SelectorsPerFiles } from "../types";
import path from "path";
import { ResolvedColorReplacements } from "./types";

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

/**
 * Checks if given relative path or filename matches query value or a list of matchers
 * @param relPathWithSlash Relative path with leading slash
 * @param queryValue Value of a query param to check. If value exists and not equals to `false` (case-insensitive),
 * function returns `true`.
 * @param matchers List of matchers to check path and filename against
 */
export function matchesQueryOrList(
  relPathWithSlash: string,
  queryValue: string | undefined,
  matchers: (string | RegExp)[],
) {
  return matchesQuery(queryValue) || matchesPath(relPathWithSlash, matchers);
}

export function matchesQuery(queryValue: string | undefined) {
  return !!queryValue && queryValue.toLowerCase() !== "false";
}

/**
 * Checks if given relative path or filename matches a list of matchers
 * @param relPathWithSlash Relative path with leading slash
 * @param matchers List of matchers to check path and filename against
 */
export function matchesPath(relPathWithSlash: string, matchers: (string | RegExp)[]) {
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
export function selectorsToList(
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
    return "";
  }

  return replacements.replacements[color.toLowerCase()] || replacements.default || color;
}