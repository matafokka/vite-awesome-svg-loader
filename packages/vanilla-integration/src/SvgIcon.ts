import { initSvgIcons, onUnmount, SVG_ICON_DEFAULT_COLOR_TRANSITION } from "integration-utils";
import { SvgImage } from "./SvgImage";
import { clearAttrs, ElementOrSelector, mount, setAttr, setAttrs, SettableAttributeValue } from "common-utils";

/**
 * Basic SVG icon, extends {@link SvgImage}.
 *
 * @example
 *
 * import iconSrc from "./path/to/icon.svg";
 * import { SvgIcon } from "vite-awesome-svg-loader/vanilla-integration";
 *
 * const icon = new SvgIcon(iconSrc, ".my-container") // Create and mount icon
 *   .setContainerAttrs({ title: "My icon" }) // Set container attributes
 *   .setColor("red") // Set icon color to red
 *   .setColorTransition("0.2s ease-out"); // Change icon color transition
 */
export class SvgIcon extends SvgImage {
  /**
   * `<span>` element that wraps {@link _svgEl}
   */
  protected _span: HTMLSpanElement;

  /**
   * Icon size
   */
  protected _size = "";

  /**
   * Icon color
   */
  protected _color = "";

  /**
   * Icon color transition
   */
  protected _colorTransition = "";

  /**
   * @param src SVG source code
   * @param mountTo Element or selector of an element to mount image to. If not provided, image won't be mounted.
   */
  constructor(src: string, mountTo?: ElementOrSelector) {
    super(src);
    initSvgIcons();
    this._span = document.createElement("span");
    this._setWrapperClass();
    this._span.appendChild(this._svgEl);
    this.setColorTransition("");

    if (mountTo) {
      this.mount(mountTo);
    }
  }

  mount(to: ElementOrSelector): this {
    this._container = mount(this._span, to);
    return this;
  }

  unmount(): this {
    this._span.parentElement?.removeChild(this._span);
    this._container = undefined;
    onUnmount(this._updateSrcRes.id);
    return this;
  }

  protected _setRequiredSvgElAttrs() {
    super._setRequiredSvgElAttrs();
    setAttr(this._svgEl, "aria-hidden", "true");
    return this;
  }

  /**
   * Sets wrapper (`<span>`) element attributes.
   *
   * **Warning**: you can't change `class`, size, color and color transition using this method
   *
   * @param attrs Attributes to set
   * @returns this
   */
  setWrapperAttrs(attrs: Record<string, SettableAttributeValue>) {
    clearAttrs(this._span);
    setAttrs(this._span, attrs);
    this.setSize(this._size);
    this.setColor(this._color);
    this.setColorTransition(this._colorTransition);
    this._setWrapperClass();
    return this;
  }

  /**
   * Sets wrapper's ({@link _span}) `class` property to match stylesheet
   */
  protected _setWrapperClass() {
    this._span.classList.add("vite-awesome-svg-loader-icon");
  }

  /**
   * @returns Wrapper (`<span>`) element
   */
  getWrapper() {
    return this._span;
  }

  /**
   * Sets icon size.
   *
   * @param size Size to set, for example: `"24px"`, `"1rem"`. An empty string or `undefined` unsets size.
   * @returns this
   */
  setSize(size: string | undefined) {
    size ||= "";
    this._span.style.setProperty("--size", size);
    this._size = size;
    return this;
  }

  /**
   * @returns Current icon size or empty string, if size is unset
   */
  getSize() {
    return this._size;
  }

  /**
   * Sets icon color
   *
   * @param color  Color to set, for example: `"red"`, `"var(--icon-color)"`. An empty string or `undefined` unsets
   * color.
   * @returns this
   */
  setColor(color: string | undefined) {
    color ||= "";
    this._span.style.setProperty("--color", color);
    this._color = color;
    return this;
  }

  /**
   * @returns Current icon color or empty string, if color is unset
   */
  getColor() {
    return this._color;
  }

  /**
   * Sets icon color transition. This transition is applied when icon color is changed.
   *
   * @param transition Transition to set, for example: `"0.2s ease-out"`, `"var(--icon-transition)"`
   * An empty string or `undefined` sets default transition. `"none"` disables transition.
   * @returns this
   */
  setColorTransition(transition: string | undefined) {
    transition ||= SVG_ICON_DEFAULT_COLOR_TRANSITION;
    this._span.style.setProperty("--color-transition", transition);
    this._colorTransition = transition;
    return this;
  }

  /**
   * @returns Current icon color transition or empty string, if transition is unset
   */
  getColorTransition() {
    return this._colorTransition;
  }
}
