import type { MaybeArray } from "@/types";

/**
 * Converts value to an array:
 *
 * 1. If value is already an array, returns it as-is.
 * 1. Otherwise wraps it in array: `[value]`
 *
 * @example
 *
 * toArray(["apples", "oranges"]); // ["apples", "oranges"]
 * toArray(["apples"]); // ["apples"]
 * toArray("apples"); // ["apples"]
 *
 * @param value Value
 * @returns Value as an array
 */
export function toArray<T>(value: MaybeArray<T>) {
  return Array.isArray(value) ? value : [value];
}

/**
 * Transforms string in `camelCase` or `PascalCase` into `kebab-case`
 * @param str String in `camelCase`
 * @returns String in `kebab-case`
 */
export function camelCaseToKebabCase(str: string) {
  let kebab = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const lowercase = char.toLowerCase();

    if (i !== 0 && char !== lowercase) {
      kebab += "-";
    }

    kebab += lowercase;
  }

  return kebab;
}
