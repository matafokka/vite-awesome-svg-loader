// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import { createStarlightTypeDocPlugin } from "starlight-typedoc";
import { defaultHandlers } from "mdast-util-to-hast";
import { prefixUrl } from "./src/utils/prefixUrl.mjs";
import { headFavicon, headOgImage, headMetaWithNameList } from "./src/utils/head.mjs";
import { sidebarShortcut } from "./src/utils/sidebar.mjs";

// Meta

const title = "Vite Awesome SVG Loader";

const description = [
  "vite-awesome-svg-loader documentation website. This loader:",
  "imports SVGs as source code, base64 and data URI;",
  "preserves stroke width;",
  "replaces colors with currentColor or custom colors;",
  "optimizes SVGs with SVGO;",
  "creates SVG sprites.",
].join(" ");

// Typedoc

const [loaderTypeDoc, loaderTypeDocGroup] = createStarlightTypeDocPlugin();
const [vanillaTypeDoc, vanillaTypeDocGroup] = createStarlightTypeDocPlugin();
const [webComponentsTypeDoc, webComponentsTypeDocGroup] = createStarlightTypeDocPlugin();
const [integrationUtilsTypeDoc, integrationUtilsTypeDocGroup] = createStarlightTypeDocPlugin();

/** @type {Partial<import('starlight-typedoc').StarlightTypeDocOptions>} */
const typeDocOptions = {
  pagination: true,
  typeDoc: {
    excludeProtected: false,
    entryFileName: "index",
    sort: ["kind", "instance-first", "visibility", "alphabetical-ignoring-documents"],
  },
};

export default defineConfig({
  base: process.env.DOCS_BASE_URL,
  site: process.env.HOST,

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
        Head: "./src/components/Head.astro",
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

        sidebarShortcut("Configuration options", "loader-api-reference/interfaces/svgloaderoptions"),

        loaderTypeDocGroup,

        ...["React", "Vue"].map((framework) => {
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
          label: "Web components (custom elements)",
          collapsed: true,
          items: [
            "web-components/general-guide",

            sidebarShortcut(
              "Creating and extending web components",
              "web-components/api-reference/classes/webcomponent",
            ),

            {
              label: "Demos and examples",
              autogenerate: { directory: "web-components/demos" },
            },

            webComponentsTypeDocGroup,
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

        webComponentsTypeDoc({
          ...typeDocOptions,
          typeDoc: {
            ...typeDocOptions.typeDoc,
            excludeExternals: true,
          },
          output: "web-components/api-reference",
          entryPoints: ["../../packages/web-components-integration/src/index.ts"],
          tsconfig: "../../packages/web-components-integration/tsconfig.json",
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

          if (process.env.DOCS_BASE_URL && node.url) {
            node.url = prefixUrl(process.env.DOCS_BASE_URL, node.url);
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
      assetsInlineLimit: () => false,
    },
  },
});
