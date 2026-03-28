import { SvgImage } from "@/SvgImage";
import { WebComponent, WebComponentDefinitionOptions } from "@/WebComponent";
import { initSvgIcons, SVG_ICON_DEFAULT_COLOR_TRANSITION } from "integration-utils";

const CSS_PROPS: Record<string, true | undefined> = { "size": true, "color": true, "color-transition": true };

/**
 * Basic SVG icon.
 *
 * If you plan to define {@link SvgImage} under a non-default tag, define it before creating SVG icons. Otherwise,
 * an error will be thrown.
 *
 * @example
 *
 * // Import SVG source code:
 * import imgSrc from "@/assets/image.svg?src";
 *
 * // Import web component:
 * import { SvgIcon } from "vite-awesome-svg-loader/web-components-integration";
 *
 * // Define a custom element:
 * SvgIcon.define();
 *
 * // Create icon:
 * const icon = new SvgIcon();
 * // or:
 * const icon = document.createElement("svg-icon");
 *
 * // Assign SVG source code to the image:
 * icon.src = imgSrc;
 *
 * // Stylize icon:
 * icon.color = "red";
 * icon.size = "24px";
 * icon.colorTransition = "0.2s ease-out";
 *
 * // Add image to the DOM:
 * document.body.appendChild(icon);
 */
export class SvgIcon extends WebComponent {
  static DEFAULT_COLOR_TRANSITION = SVG_ICON_DEFAULT_COLOR_TRANSITION;

  static readonly props = ["src", "size", "color", { name: "colorTransition", default: this.DEFAULT_COLOR_TRANSITION }];

  /**
   * Image source code
   */
  declare src?: string;

  /**
   * Icon size. Empty string unsets size.
   */
  declare size?: string;

  /**
   * Icon color. Empty string unsets color.
   */
  declare color?: string;

  /**
   * Icon color transition. Empty string unsets transition.
   *
   * To set default value, use {@link DEFAULT_COLOR_TRANSITION}.
   */
  declare colorTransition: string;

  /**
   * Wrapped `SvgImage` element
   */
  private _svgImage: InstanceType<typeof SvgImage>;

  constructor() {
    super();
    initSvgIcons();
    SvgImage.define({ noRedefinitionError: true });
    this._svgImage = new SvgImage();
    this._svgImage.setAttribute("svg-aria-hidden", "true");
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (!this.childElementCount) {
      this.classList.add("vite-awesome-svg-loader-icon");
      this.appendChild(this._svgImage);
    }
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === "src") {
      this._svgImage.src = newValue || "";
    } else if (CSS_PROPS[name]) {
      this.style.setProperty("--" + name, newValue || "");
    }
  }

  static define(options: WebComponentDefinitionOptions = {}) {
    super.define({ ...options, tag: options.tag || "svg-icon" });
  }
}
