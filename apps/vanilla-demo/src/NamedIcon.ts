import { ElementOrSelector, SvgIcon } from "vite-awesome-svg-loader/vanilla-integration";

// See: https://vitejs.dev/guide/features#glob-import
// I wasn't able to use dynamic imports for this
const icons: any = import.meta.glob("/src/assets/import-demo/icons/*.svg", {
  // Put URL here or setup your imports via vite-awesome-svg-loader configuration
  as: "preserve-line-width&set-current-color",
});

// Provide a fallback while loading.
// If you don't want a fallback, create an async factory and use top-level await in your main script.

const loadingFallback = `
<svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="10" style="font: 12px sans-serif;">Loading</text>
</svg>
`

// Create a NamedIcon class that extends SvgIcon

export class NamedIcon extends SvgIcon {
  protected name = "";

  constructor(name: string, mountTo?: ElementOrSelector) {
    super(loadingFallback, mountTo);
    this.setName(name);
  }

  async setName(name: string) {
    this.name = name;

    // Fetch SVG source code.
    // This may throw an error because icon might not be found, or user has been disconnected.
    // You may need to handle this case, for example, don't show an image.
    // Also, while loading, you may want to use some kind of animation.
    const code = (await icons[`/src/assets/import-demo/icons/${name}.svg`]()).default;

    // Verify that name hasn't changed. If it did, set its source code. Otherwise other onNameChange()
    // call will handle the changes.
    if (name === this.name) {
      this.setSrc(code);
    }
  }

  getName() {
    return this.name;
  }
}