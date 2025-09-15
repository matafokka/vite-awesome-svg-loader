function getNormalizedPathName() {
  const url = window.location.pathname;
  return url.endsWith("/") ? url.substring(0, url.length - 1) : url;
}

/**
 * Runs given callback whenever current page gets loaded again
 * @param cb Callback
 */
export function onAstroSamePageLoad(cb: () => void) {
  const url = getNormalizedPathName();

  document.addEventListener("astro:page-load", () => {
    if (url === getNormalizedPathName()) {
      cb();
    }
  });
}
