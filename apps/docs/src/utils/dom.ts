/**
 * Checks if given element is a child (grand child, grand-grand child, etc) of another element.
 *
 * It'll return `false` if `child === parent`.
 *
 * @param child A child element
 * @param parent A parent element
 * @return `true`, if `child` is a child of a `parent`
 */
export function isChildOf(child: Element, parent: Element): boolean {
  let currentEl = child.parentElement;

  while (currentEl) {
    if (currentEl === parent) {
      return true;
    }

    currentEl = currentEl.parentElement;
  }

  return false;
}

/**
 * Same as {@link isChildOf} but returns true if `child === parent`
 *
 * @param child A child element
 * @param parent A parent element
 */
export function isChildOfOrEqual(child: Element, parent: Element) {
  return child === parent || isChildOf(child, parent);
}
