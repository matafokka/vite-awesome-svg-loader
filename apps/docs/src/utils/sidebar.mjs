/**
 * Counts aliases
 *
 * @type {Map<string, number>}
 */
const sidebarAliases = new Map();

/**
 * Creates a shortcut sidebar item.
 *
 * Starlight highlights the first item that matches given slug. This function circumvents this behavior by adding
 * a query parameter, so the item won't be highlighted.
 *
 * @param {string} label Link title
 * @param {string} slug Link slug
 * @returns Sidebar item
 */
export function sidebarShortcut(label, slug) {
  const count = sidebarAliases.get(slug) || 0;
  sidebarAliases.set(slug, count);

  return {
    label,
    link: `${slug}?sidebar-alias=${count}`,
    attrs: { "data-sidebar-alias": "" },
  };
}
