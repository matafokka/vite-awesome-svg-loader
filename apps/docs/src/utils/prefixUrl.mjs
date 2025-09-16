/**
 *
 * @param {string} base Base URL
 * @param {string} url Raw URL
 */
export function prefixUrl(base, url) {
  if (!base.endsWith("/")) {
    base += "/";
  }

  if (url.startsWith("/") && !url.startsWith(base)) {
    return base + url.substring(1);
  }

  return url;
}
