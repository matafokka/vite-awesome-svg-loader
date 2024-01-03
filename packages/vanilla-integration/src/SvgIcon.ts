import { onUnmount } from "integration-utils";
import { SvgImage } from "./SvgImage";
import { ElementOrSelector, mount, setAttrs, setStyleProperty } from "./utils";

const DEFAULT_COLOR_TRANSITION = "0.3s linear";

/**
 * Basic SVG icon, extends {@link SvgImage}.
 *
 * Usage:
 *
 * ```ts
 * import iconSrc from "./path/to/icon.svg";
 *
 * const icon = new SvgIcon(iconSrc, ".my-container") // Create and mount icon
 *   .setContainerAttrs({ title: "My icon" }) // Set container attributes
 *   .setColor("red") // Set icon color to red
 *   .setColorTransition("0.2s ease-out"); // Change icon color transition
 * ```
 *
 * ### Internal API
 *
 * You can use this API to extend `SvgIcon`. This API is the same as in {@link SvgImage}, but with additional methods.
 *
 * Use {@link SvgIcon._updateWrapperBeforeUserAttrsSet}, {@link SvgIcon._updateWrapperAfterUserAttrsSet} to set custom
 * wrapper (`<span>`) attributes.
 *
 * {@link SvgIcon._updateSvgBeforeUserAttrsSet} should call `super._updateSvgBeforeUserAttrsSet()`.
 */
export class SvgIcon extends SvgImage {
  protected _span: HTMLSpanElement;
  protected _size: string | undefined;
  protected _color: string | undefined;
  protected _colorTransition: string | undefined;

  constructor(src: string, mountTo?: ElementOrSelector) {
    super(src);
    this._span = document.createElement("span");
    this._setWrapperClass();
    this._span.appendChild(this._svgEl);
    this.setColorTransition();

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

  protected _updateSvgBeforeUserAttrsSet(): void {
    setAttrs(this._svgEl, { "aria-hidden": "true" });
  }

  /**
   * Sets wrapper (`<span>`) element attributes.
   *
   * **Warning**: you can't change class, size, color and color transition using this method
   *
   * @param attrs Attributes to set
   * @returns this
   */
  setWrapperAttrs(attrs: Record<string, any>) {
    setAttrs(this._span, {}, true);

    this._updateWrapperBeforeUserAttrsSet();
    setAttrs(this._span, attrs);
    this._updateWrapperAfterUserAttrsSet();

    this.setSize(this._size);
    this.setColor(this._color);
    this.setColorTransition(this._colorTransition);
    this._setWrapperClass();
    return this;
  }

  /**
   * Called before user-provided attributes are set. You can use this function to set custom wrapper (`<span>`) attributes.
   */
  protected _updateWrapperBeforeUserAttrsSet() {};

  /**
   * Called after user-provided attributes are set. You can use this function to set custom wrapper (`<span>`) attributes.
   */
  protected _updateWrapperAfterUserAttrsSet() {};

  protected _setWrapperClass() {
    this._span.classList.add("awesome-svg-loader-icon", "icon");
  }

  /**
   * @returns Wrapper (`<span>`) element
   */
  getWrapper() {
    return this._span;
  }

  /**
   * Sets icon size. Empty string or `undefined` unsets size.
   * @param size Size to set, for example: `"24px"`, `"1rem"`
   * @returns this
   */
  setSize(size: string | undefined) {
    this._size = size;

    for (const prop of ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight"]) {
      setStyleProperty(this._span, prop, this._size);
    }

    return this;
  }

  /**
   * @returns Current icon size or empty string, if size is unset
   */
  getSize() {
    return this._size || "";
  }

  /**
   * Sets icon color. Empty string or `undefined` unsets color.
   * @param color  Color to set, for example: `"red"`, `"var(--icon-color)"`.
   * @returns this
   */
  setColor(color: string | undefined) {
    this._color = color;
    setStyleProperty(this._span, "--icon-color", color);
    return this;
  }

  /**
   * @returns Current icon color or empty string, if color is unset
   */
  getColor() {
    return this._color || "";
  }

  /**
   * Sets icon color transition. This transition is applied when icon color is changed.
   * @param transition Transition to set, for example: `"0.3s linear"`, `"var(--icon-transition)"`
   * @returns this
   */
  setColorTransition(transition = DEFAULT_COLOR_TRANSITION) {
    this._colorTransition = transition;
    setStyleProperty(this._span, "--icon-transition", transition);
    return this;
  }

  /**
   * @returns Current icon color transition or empty string, if transition is unset
   */
  getColorTransition() {
    return this._colorTransition || "";
  }
}
