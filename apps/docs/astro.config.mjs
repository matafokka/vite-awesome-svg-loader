// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import { createStarlightTypeDocPlugin } from "starlight-typedoc";
import { defaultHandlers } from "mdast-util-to-hast";
import { prefixUrl } from "./src/utils/prefixUrl.mjs";
import packageJson from "../../packages/vite-awesome-svg-loader/package.json";

const [loaderTypeDoc, loaderTypeDocGroup] = createStarlightTypeDocPlugin();
const [vanillaTypeDoc, vanillaTypeDocGroup] = createStarlightTypeDocPlugin();
const [integrationUtilsTypeDoc, integrationUtilsTypeDocGroup] = createStarlightTypeDocPlugin();

let baseUrl = process.env.DOCS_BASE_URL;

if (baseUrl) {
  baseUrl = addTrailingSlash(baseUrl);
}

// TODO: Replace with env variable? Astro config should also use that variable.
const host = addTrailingSlash(packageJson.homepage || "/");
const title = "Vite Awesome SVG Loader";

const description = [
  "Vite Awesome SVG Loader documentation website. This loader:",
  "imports SVGs as source code, base64 and data URI;",
  "preserves stroke width;",
  "replaces colors with currentColor or custom colors;",
  "optimizes SVGs with SVGO;",
  "creates SVG sprites.",
].join(" ");

const frameworks = ["React", "Vue"];

/** @type {Partial<import('starlight-typedoc').StarlightTypeDocOptions>} */
const typeDocOptions = {
  pagination: true,
  typeDoc: {
    excludeProtected: false,
    entryFileName: "index",
  },
};

export default defineConfig({
  base: baseUrl,
  site: host,

  integrations: [
    starlight({
      title,
      description,
      customCss: ["./src/styles/index.scss"],
      favicon: "/favicon.svg",

      head: [
        ...headFavicon(),
        ...headOgImage(),
        ...headMetaWithNameList(
          ["robots", "all"],
          ["twitter:card", "summary"],
          ["twitter:title", title],
          ["twitter:description", description],
        ),
      ],

      logo: {
        src: "./src/assets/logo.svg",
        alt: "Home",
        replacesTitle: true,
      },

      social: [{ icon: "github", label: "GitHub", href: "https://github.com/matafokka/vite-awesome-svg-loader" }],

      expressiveCode: {
        useThemedScrollbars: false,
        themes: ["one-dark-pro", "one-light"],
      },

      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
      },

      sidebar: [
        "",

        {
          label: "Guides",
          autogenerate: { directory: "/guides" },
        },
        {
          label: "Additional information",
          autogenerate: { directory: "additional-information" },
        },

        // No idea how this works, but appending trailing slash makes it point to the actual page and not make this item
        // "main". The final result doesn't require redirects, page doesn't flash, it works like a charm.
        { label: "Configuration options", slug: "loader-api-reference/interfaces/svgloaderoptions/" },

        loaderTypeDocGroup,

        ...frameworks.map((framework) => {
          return {
            label: framework,
            collapsed: true,
            autogenerate: { directory: framework.toLowerCase().replaceAll(" ", "-") },
          };
        }),

        {
          label: "Vanilla JS",
          collapsed: true,
          items: [
            "vanilla-js/quick-start",

            {
              label: "Demos and examples",
              autogenerate: { directory: "vanilla-js/demos" },
            },

            vanillaTypeDocGroup,
          ],
        },

        {
          label: "Other frameworks",
          collapsed: true,
          items: ["other-frameworks/quick-start", integrationUtilsTypeDocGroup],
        },
      ],

      plugins: [
        loaderTypeDoc({
          ...typeDocOptions,
          output: "loader-api-reference",
          entryPoints: ["../../packages/loader/src/index.ts"],
          tsconfig: "../../packages/loader/tsconfig.json",
          sidebar: { label: "Loader API reference", collapsed: true },
        }),

        vanillaTypeDoc({
          ...typeDocOptions,
          output: "vanilla-js/api-reference",
          entryPoints: ["../../packages/vanilla-integration/src/index.ts"],
          tsconfig: "../../packages/vanilla-integration/tsconfig.json",
          sidebar: { label: "API reference", collapsed: true },
        }),

        integrationUtilsTypeDoc({
          ...typeDocOptions,
          output: "other-frameworks/api-reference",
          entryPoints: ["../../packages/integration-utils/src/index.ts"],
          tsconfig: "../../packages/integration-utils/tsconfig.json",
          sidebar: { label: "API reference", collapsed: true },
        }),
      ],
    }),
    vue(),
    react(),
  ],
  markdown: {
    remarkRehype: {
      handlers: {
        link: (state, node) => {
          // Add base URL to markdown links

          if (baseUrl && node.url) {
            node.url = prefixUrl(baseUrl, node.url);
          }

          const htmlLink = defaultHandlers.link(state, node);

          // Make external links open in a new tab

          if (node.url && (node.url.startsWith("http://") || node.url.startsWith("https://"))) {
            htmlLink.properties.target = "_blank";
          }

          return htmlLink;
        },
      },
    },
  },
  vite: {
    build: {
      assetsInlineLimit: 1,
    },
  },
});

/**
 * Generates meta tag: `<meta property="..." content="..." />`
 * @param {string} property Property name
 * @param {string} content Property content (value)
 * @returns Meta element
 */
function headMetaWithContent(property, content) {
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
function headMetaWithName(name, content) {
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
function headMetaWithNameList(...entries) {
  return entries.map((entry) => headMetaWithName(...entry));
}

function headOgImage() {
  const url = host + "splash.png";

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

function headFavicon() {
  return ["png", "ico"].map((ext) => ({
    /** @type {"link"} */
    tag: "link",
    attrs: {
      rel: "icon",
      href: `/favicon.${ext}`,
      sizes: "192x192",
    },
  }));
}

/**
 * @param {string} str String to add slash to
 */
function addTrailingSlash(str) {
  return str.endsWith("/") ? str : str + "/";
}
