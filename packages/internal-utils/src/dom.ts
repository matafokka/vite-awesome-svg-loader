/**
 * Resolves a color into a computed CSS `color` property value. Useful for comparisons with `element.style.color`.
 *
 * - Works only in DOM-enabled environments.
 * - Resolves only globally-defined colors (default colors, variables set on `:root` or `body`).
 * - Very slow operation.
 * - **Not for use in the library code.**
 *
 * @param color Color
 * @returns Computed color
 */
export function resolveCssColor(color: string) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  div.style.color = color;
  const res = getComputedStyle(div).color;
  div.remove();
  return res;
}
