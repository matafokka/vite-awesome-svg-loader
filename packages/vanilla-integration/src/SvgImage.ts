import { onSrcUpdate, onUnmount } from "integration-utils";
import { ElementOrSelector, mount, setAttrs } from "./utils";

/**
 * Basic SVG image. Implements SVG sprites.
 *
 * Will create `<svg>` element that contains all symbols, add passed source code to it and reuse it later.
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
 * Use {@link SvgImage._updateSvgBeforeUserAttrsSet},
 * {@link SvgImage._updateSvgAfterUserAttrsSet},
 * {@link SvgImage._updateUseElBeforeUserAttrsSet},
 * {@link SvgImage._updateUseElAfterUserAttrsSet} hooks to set custom elements attributes.
 *
 * You probably don't need to override required element's attributes. If you actually need to do so, override
 * {@link SvgImage._updateSvgEl}
 *
 * @param src SVG source code
 * @param mountTo Element or selector of an element to mount image to. If not provided, image won't be mounted.
 */
export class SvgImage {
  /**
   * User-provided source code
   */
  protected _src: string | undefined;

  protected _container: Element | undefined;
  protected readonly _svgEl: SVGElement;
  protected readonly _useEl: SVGUseElement;

  /**
   * User-provided attributes
   */
  protected _svgAttrs: Record<string, any> = {};

  /**
   * User-provided attributes
   */
  protected _useElAttrs: Record<string, any> = {};

  /**
   * Last src update result
   */
  protected _updateSrcRes: ReturnType<typeof onSrcUpdate> = {};

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
  setSvgElAttrs(attrs: Record<string, any>) {
    this._svgAttrs = attrs;
    return this._updateSvgEl();
  }

  /**
   * Updates SVG element: sets SVG source code, clears previous attributes, sets new attributes
   * @returns this
   */
  protected _updateSvgEl() {
    setAttrs(this._svgEl, { alt: "" }, true);
    this._updateSvgBeforeUserAttrsSet();
    setAttrs(this._svgEl, this._svgAttrs);
    this._updateSvgAfterUserAttrsSet();

    if (this._updateSrcRes.attrs) {
      setAttrs(this._svgEl, this._updateSrcRes.attrs);
    }

    return this;
  }

  /**
   * Called before user-provided attributes are set. You can use this function to set custom SVG element attributes.
   */
  protected _updateSvgBeforeUserAttrsSet() {};

  /**
   * Called after user-provided attributes are set. You can use this function to set custom SVG element attributes.
   */
  protected _updateSvgAfterUserAttrsSet() {};

  /**
   * Sets `<use>` element attributes. It won't remove id, class and style.
   * @param attrs Attributes to set
   * @returns this
   */
  setUseElAttrs(attrs: Record<string, any>) {
    this._useElAttrs = attrs;
    return this._updateUseEl();
  }

  /**
   * Updates `<use>` element attributes
   * @returns this
   */
  protected _updateUseEl() {
    setAttrs(this._useEl, {}, true);
    this._updateUseElBeforeUserAttrsSet();
    setAttrs(this._useEl, this._useElAttrs);
    this._updateUseElAfterUserAttrsSet();

    if (this._updateSrcRes.id) {
      setAttrs(this._useEl, { href: "#" + this._updateSrcRes.id });
    }

    return this;
  }

  /**
   * Called before user-provided attributes are set. You can use this function to set custom `<use>` element attributes.
   */
  protected _updateUseElBeforeUserAttrsSet() {};

  /**
   * Called after user-provided attributes are set. You can use this function to set custom `<use>` element attributes.
   */
  protected _updateUseElAfterUserAttrsSet() {};

  /**
   * Sets SVG source code
   * @param src SVG source code
   * @returns this
   */
  setSrc(src: string) {
    this._updateSrcRes = onSrcUpdate(this._src, src);
    this._src = src;
    this._updateSvgEl();
    this._updateUseEl();
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
