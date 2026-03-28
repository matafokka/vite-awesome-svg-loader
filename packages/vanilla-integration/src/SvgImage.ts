import { onSrcUpdate, onUnmount } from "integration-utils";
import { clearAttrs, ElementOrSelector, mount, setAttrs, SettableAttributeValue } from "common-utils";

/**
 * Basic SVG image. Implements SVG sprites. Adds `<svg>` element with the symbols to the `<body>`.
 *
 * ### Basic usage
 *
 * ```ts
 * import imageSrc from "./path/to/image.svg";
 * import anotherImageSrc from "./path/to/another/image.svg";
 * import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";
 *
 * const container = document.createElement("div"); // Where to mount SVG
 * const image = new SvgImage(imageSrc, container); // Create image and mount it to the container
 * image.setSvgElAttrs({ id: "my-svg-symbol" }); // Change <svg> element attributes
 * image.setUseElAttrs({ className: "my-svg-symbol-use-el" }); // Change <use> element attributes
 * image.setSrc(anotherImageSrc); // Change SVG source code
 * console.log(image.getSrc()); // Get and print image source code
 * console.log(image.getContainer()); // Get and print image container
 * console.log(image.getSvgEl()); // Get and print image <svg> element
 * console.log(image.getUseEl()); // Get and print image <use> element
 * image.unmount(); // Remove image from the container
 *
 * // All operations are chainable, so you can do this:
 *
 * const image2 = new SvgImage(imageSrc)
 *   .mount(container)
 *   .setSvgElAttrs({ id: "my-svg-symbol" })
 *   .setUseElAttrs({ className: "my-svg-symbol-use-el" });
 * ```
 *
 * ### Internal API
 *
 * You can use this API to extend `SvgImage`.
 *
 * Use `constructor()` and {@link SvgImage#mount} to change component markup.
 *
 * You probably don't need to override required elements' attributes. If you actually need to do so, override
 * {@link SvgImage._setRequiredSvgElAttrs} and {@link SvgImage._setRequiredUseElAttrs}.
 */
export class SvgImage {
  /**
   * User-provided source code
   */
  protected _src: string | undefined;

  /**
   * Element containing this {@link SvgImage} (element passed to {@link mount})
   */
  protected _container: Element | undefined;

  /**
   * `<svg>` element
   */
  protected readonly _svgEl: SVGElement;

  /**
   * `<use>` element
   */
  protected readonly _useEl: SVGUseElement;

  /**
   * Last {@link onSrcUpdate} call result
   */
  protected _updateSrcRes: ReturnType<typeof onSrcUpdate> = {};

  /**
   * @param src SVG source code
   * @param mountTo Element or selector of an element to mount image to. If not provided, image won't be mounted.
   */
  constructor(src: string, mountTo?: ElementOrSelector) {
    this._svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._useEl = document.createElementNS("http://www.w3.org/2000/svg", "use");
    this._svgEl.appendChild(this._useEl);

    this.setSrc(src);

    if (mountTo) {
      this.mount(mountTo);
    }
  }

  /**
   * Mounts image to the given element
   * @param to Element or selector of an element to mount image to
   * @returns this
   */
  mount(to: ElementOrSelector) {
    this._container = mount(this._svgEl, to);
    return this;
  }

  /**
   * Removes image from the container
   * @returns this
   */
  unmount() {
    this._svgEl.parentElement?.removeChild(this._svgEl);
    this._container = undefined;
    onUnmount(this._updateSrcRes.id);
    return this;
  }

  /**
   * Sets `<svg>` element attributes. It won't remove id, class and style.
   * @param attrs Attributes to set
   * @returns this
   */
  setSvgElAttrs(attrs: Record<string, SettableAttributeValue>) {
    clearAttrs(this._svgEl);
    setAttrs(this._svgEl, attrs);
    this._setRequiredSvgElAttrs();
    return this;
  }

  /**
   * Sets required attributes to the `<svg>` element
   * @returns this
   */
  protected _setRequiredSvgElAttrs() {
    if (this._updateSrcRes.attrs) {
      setAttrs(this._svgEl, this._updateSrcRes.attrs);
    }

    return this;
  }

  /**
   * Sets `<use>` element attributes. It won't remove `id`, `class` and `style`.
   * @param attrs Attributes to set
   * @returns this
   */
  setUseElAttrs(attrs: Record<string, SettableAttributeValue>) {
    clearAttrs(this._useEl);
    setAttrs(this._useEl, attrs);
    this._setRequiredUseElAttrs();
    return this;
  }

  /**
   * Sets required attributes to the `<use>` element
   * @returns this
   */
  protected _setRequiredUseElAttrs() {
    if (this._updateSrcRes.id) {
      setAttrs(this._useEl, { href: "#" + this._updateSrcRes.id });
    }

    return this;
  }

  /**
   * Sets SVG source code
   * @param src SVG source code
   * @returns this
   */
  setSrc(src: string) {
    this._updateSrcRes = onSrcUpdate(this._src, src);
    this._src = src;
    this._setRequiredSvgElAttrs();
    this._setRequiredUseElAttrs();
    return this;
  }

  /**
   * @returns SVG source code
   */
  getSrc() {
    return this._src;
  }

  /**
   * @returns A container of this image, or `undefined`, if image is not mounted
   */
  getContainer() {
    return this._container;
  }

  /**
   * Returns `<svg>` element.
   *
   * To assign attributes, use {@link setSvgElAttrs} instead.
   *
   * @returns `<svg>` element
   */
  getSvgEl() {
    return this._svgEl;
  }

  /**
   * Returns `<use>` element.
   *
   * To assign attributes, use {@link setSvgElAttrs} instead.
   *
   * @returns `<use>` element
   */
  getUseEl() {
    return this._useEl;
  }
}
