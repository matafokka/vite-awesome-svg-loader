const docsBaseUrl = process.env.DOCS_BASE_URL || "/";

/**
 * Generates meta tag: `<meta property="..." content="..." />`
 * @param {string} property Property name
 * @param {string} content Property content (value)
 * @returns Meta element
 */
export function headMetaWithProperty(property, content) {
  return {
    /** @type {'meta'} */
    tag: "meta",
    attrs: { property, content },
  };
}

/**
 * Generates meta tag: `<meta name="..." content="..." />`
 * @param {string} name Property name
 * @param {string} content Property content (value)
 * @returns Meta element
 */
export function headMetaWithName(name, content) {
  return {
    /** @type {'meta'} */
    tag: "meta",
    attrs: { name, content },
  };
}

/**
 * {@link headMetaWithName} but for a list of entries
 * @param  {...[string, string]} entries `[name, content]` pairs
 */
export function headMetaWithNameList(...entries) {
  return entries.map((entry) => headMetaWithName(...entry));
}

export function headOgImage() {
  return [
    ["image", (process.env.HOST || "/") + docsBaseUrl.substring(1) + "splash.png"],
    ["image:type", "image/png"],
    ["image:width", "1200"],
    ["image:height", "600"],
    ["image:alt", "Logo and name of the library"],
  ].flatMap(([name, value]) => [headMetaWithProperty(`og:${name}`, value), headMetaWithName(`twitter:${name}`, value)]);
}

export function headFavicon() {
  return ["png", "ico"].map((ext) => ({
    /** @type {"link"} */
    tag: "link",
    attrs: {
      rel: "icon",
      href: `${docsBaseUrl}favicon.${ext}`,
      sizes: "192x192",
    },
  }));
}
