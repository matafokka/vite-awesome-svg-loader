import loadingIcon from "@/assets/icons/hourglass.svg";
import errorIcon from "@/assets/icons/broken-image.svg";
import { SvgIcon, WebComponentDefinitionOptions } from "vite-awesome-svg-loader/web-components-integration";
import { CustomElement } from "typed-custom-elements";

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

// Extend SvgIcon.
//
// Avoid nesting web components because each web component is an actual DOM element. Nesting defeats
// the whole purpose of using SVG symbols to reduce the amount of DOM nodes and improve rendering performance.
//
// If you want composition, consider creating your own wrapper or using a specialized library/framework for creating
// components.

export class NamedIcon extends SvgIcon implements CustomElement {
  // Create public "name" property
  static props = ["name"];

  /** Icon name */
  declare name?: string; // Declare "name" property, so it will be typed

  // We do not override "src" property because:
  //
  // 1. Parent's behavior depends on it.
  // 2. Inheritance pattern prevents us from removing a property. What if child removes it, but grandchild decides to
  // return it back? This is too cumbersome to manage.
  //
  // Instead, we gracefully handle outer "src" changes by clearing "name" property.

  /** An internal locking mechanism that prevents infinite recursion when handling source code changes */
  private srcChangedBy: "src" | "name" | undefined;

  // React to "name" and "src" changes

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    super.attributeChangedCallback(name, oldValue, newValue); // Parent method must be called

    switch (name) {
      case "name":
        this.onNameChange(oldValue, newValue);
        break;
      case "src":
        this.onSrcChange(oldValue, newValue);
        break;
    }
  }

  // Load icon whenever name is changed by the user

  private async onNameChange(oldName: string | null, name: string | null) {
    // Do not react, if current change has been caused by "src" change
    if (this.srcChangedBy === "src") {
      return;
    }

    // Prevent infinite recursion when setting src
    const setSrc = (code: string) => {
      this.srcChangedBy = "name";
      this.src = code;
      this.srcChangedBy = undefined;
    };

    // Don't render anything, if there's no icon name
    if (!name) {
      setSrc("");
      return;
    }

    // Set loading icon if icon has been hidden due to missing source code
    if (!oldName && !this.src) {
      setSrc(loadingIcon);
    }

    let code: string;

    try {
      code = (await icons[name]()).default; // Fetch SVG source code
    } catch (e) {
      console.error(e);
      code = errorIcon; // Provide a fallback for when icon could not be loaded
    }

    // Verify that name hasn't been changed. If it didn't, set its source code. Otherwise other setName()
    // call will handle the changes.
    if (name === this.name) {
      setSrc(code);
    }
  }

  // Clear icon name whenever "src" is changed by the user

  private onSrcChange(src: string | null, oldSrc: string | null) {
    // Do not react, if:
    // - Component just mounted (let onNameChange() take over).
    // - Current change has been caused by "name" change.

    if (src === oldSrc || this.srcChangedBy === "name") {
      return;
    }

    // Clear name when source code has been changed outside of onNameChange()
    this.srcChangedBy = "src";
    this.name = undefined;
    this.srcChangedBy = undefined;
  }

  // Change default tag to "named-icon"
  static define(options: WebComponentDefinitionOptions = {}) {
    super.define({ ...options, tag: options.tag || "named-icon" });
  }
}

// Add DOM type definitions. These definitions will be picked up automatically when NamedIcon will be imported at least
// once.

declare global {
  interface HTMLElementTagNameMap {
    "named-icon": NamedIcon;
  }
}
