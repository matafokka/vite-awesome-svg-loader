import loadingIcon from "@/assets/icons/hourglass.svg";
import errorIcon from "@/assets/icons/broken-image.svg";
import { ElementOrSelector, SvgIcon } from "vite-awesome-svg-loader/vanilla-integration";

// See: https://vitejs.dev/guide/features#glob-import
const rawIcons: any = import.meta.glob("/src/assets/icons/*.svg", {
  // Put URL here or setup your imports via vite-awesome-svg-loader configuration
  query: "?preserve-line-width&set-current-color",
});

// Transform keys from paths to file-based icon names

const icons: any = {};

for (const path in rawIcons) {
  let name = path.split("/").pop() || "";
  name = name.substring(0, name.lastIndexOf("."));
  icons[name] = rawIcons[path];
}

export class NamedIcon extends SvgIcon {
  protected name = "";

  constructor(name: string, mountTo?: ElementOrSelector) {
    super(loadingIcon, mountTo);
    this.setName(name);
  }

  async setName(name: string) {
    this.name = name;
    let code = errorIcon;

    try {
      code = (await icons[name]()).default; // Fetch SVG source code
    } catch (e) {
      console.error(e);
      code = errorIcon; // Provide a fallback for when icon could not be loaded
    }

    // Verify that name hasn't changed. If it didn't, set its source code. Otherwise other setName()
    // call will handle the changes.
    if (name === this.name) {
      this.setSrc(code);
    }
  }

  getName() {
    return this.name;
  }
}
