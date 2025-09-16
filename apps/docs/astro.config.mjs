// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import { createStarlightTypeDocPlugin } from "starlight-typedoc";
import { defaultHandlers } from "mdast-util-to-hast";
import { prefixUrl } from "./src/utils/prefixUrl.mjs";

const [loaderTypeDoc, loaderTypeDocGroup] = createStarlightTypeDocPlugin();
const [vanillaTypeDoc, vanillaTypeDocGroup] = createStarlightTypeDocPlugin();

let baseUrl = process.env.DOCS_BASE_URL;

if (baseUrl && !baseUrl?.endsWith("/")) {
  baseUrl += "/";
}

const frameworks = ["React", "Vue"];

// https://astro.build/config
export default defineConfig({
  base: baseUrl,
  integrations: [
    starlight({
      title: "Vite Awesome SVG Loader",
      customCss: ["./src/styles/global.scss"],
      favicon: "/favicon.svg",

      head: ["png", "ico"].map((ext) => {
        return {
          tag: "link",
          attrs: {
            rel: "icon",
            href: `/favicon.${ext}`,
            sizes: "192x192",
          },
        };
      }),

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

        { label: "Configuration options", link: "/configuration" },

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
      ],

      plugins: [
        loaderTypeDoc({
          output: "loader-api-reference",
          entryPoints: ["../../packages/loader/src/index.ts"],
          tsconfig: "../../packages/loader/tsconfig.json",
          sidebar: { label: "Loader API reference", collapsed: true },
          pagination: true,
        }),

        vanillaTypeDoc({
          output: "vanilla-js/api-reference",
          entryPoints: ["../../packages/vanilla-integration/src/index.ts"],
          tsconfig: "../../packages/vanilla-integration/tsconfig.json",
          sidebar: { label: "API reference", collapsed: true },
          pagination: true,
        }),
      ],
    }),
    vue(),
    react(),
  ],
  redirects: {
    "/configuration": (baseUrl || "/") + "loader-api-reference/interfaces/svgloaderoptions/",
  },
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
