import { Plugin } from "vite";

export interface ViteAstroEntryGeneratorOptions {
  /**
   * Relative path from dist directory to script file
   *
   * @default "./app.js"
   */
  relPathToScript?: string;

  /**
   * Generated Astro file name
   *
   * @default "App.astro"
   */
  astroFileName?: string;

  /**
   * Wrap generated script with an element. Possible values:
   *
   * 1. `false` - don't wrap.
   * 1. string - ID of a wrapping div. This will generated:
   *    ```html
   *    <div id="your_id">
   *      <script></script>
   *    </div>
   *    ```
   * 1. Function - receives a script, returns final HTML
   *
   * @default "app"
   */
  wrapScriptWith?: false | string | ((script: string) => string);
}

/**
 * This plugin generates an Astro component that loads a script on the client side.
 * @param options Options
 */
export function viteAstroEntryGenerator(options: ViteAstroEntryGeneratorOptions = {}): Plugin {
  const { relPathToScript = "./app.js", astroFileName = "App.astro", wrapScriptWith = "app" } = options;

  const wrap = (script: string) => {
    if (!wrapScriptWith) {
      return script;
    }

    if (typeof wrapScriptWith === "string") {
      return `<div id="${wrapScriptWith}">${script}</div>`;
    }

    return wrapScriptWith(script);
  };

  const script = `
    <script>
      import { main } from "${relPathToScript}";
      import { onAstroSamePageLoad } from "utils";

      onAstroSamePageLoad(main);
    </script>
  `;

  return {
    name: "vite-astro-entry-generator",
    enforce: "pre",
    buildEnd() {
      this.emitFile({
        type: "asset",
        name: astroFileName,
        source: `
---
---

${wrap(script)}
`,
      });
    },
  };
}
