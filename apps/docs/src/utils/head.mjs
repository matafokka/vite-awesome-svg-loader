const docsBaseUrl = process.env.DOCS_BASE_URL || "/";

/**
 * Generates meta tag: `<meta property="..." content="..." />`
 * @param {string} property Property name
 * @param {string} content Property content (value)
 * @returns Meta element
 */
export function headMetaWithContent(property, content) {
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
  const url = (process.env.HOST || "/") + docsBaseUrl.substring(1) + "splash.png";

  /** @type {ReturnType<typeof headMetaWithContent>[]} */
  const meta = [];

  for (const graph of ["og", "twitter"]) {
    const prefix = graph + ":image";
    /** @type {typeof headMetaWithContent} */
    const headMetaWithPrefix = (param, content) => headMetaWithContent(prefix + ":" + param, content);

    meta.push(
      headMetaWithContent(prefix, url),
      headMetaWithPrefix("type", "image/png"),
      headMetaWithPrefix("width", "1200"),
      headMetaWithPrefix("height", "600"),
    );
  }

  return meta;
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
