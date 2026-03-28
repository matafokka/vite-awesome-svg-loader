import styles from "@/assets/styles.scss?inline";

import { onSrcUpdate, onUnmount } from "integration-utils";
import { createStyle, setAttr, setAttrs } from "common-utils";
import { WebComponent, WebComponentDefinitionOptions } from "@/WebComponent";
import type { CustomElement } from "typed-custom-elements";

type SrcUpdateSvgAttr = keyof NonNullable<ReturnType<typeof onSrcUpdate>["attrs"]>;

/**
 * Attributes that shouldn't be changed by the user
 */
const PROTECTED_SVG_ATTRS: Record<string, true | undefined> = {
  viewBox: true,
  width: true,
  height: true,
} satisfies Record<SrcUpdateSvgAttr, true>;

const EMPTY_SVG = `<svg viewBox="0 0 0 0" width="0" height="0"></svg>`;

/**
 * Basic SVG image. Implements SVG sprites. Adds `<svg>` element with the symbols to the `<body>`.
 *
 * Pass SVG source code to the `src` property, so the image will be rendered.
 *
 * Every attribute that starts with `svg-` string will be passed down to the `<svg>` element.
 *
 * Every attribute that starts with `use-` string will be passed down to the `<use>` element.
 *
 * @example
 *
 * // Import SVG source code:
 * import imgSrc from "@/assets/image.svg?src";
 *
 * // Import web component:
 * import { SvgImage } from "vite-awesome-svg-loader/web-components-integration";
 *
 * // Define a custom element:
 * SvgImage.define();
 *
 * // Create image:
 * const img = new SvgImage();
 * // or:
 * const img = document.createElement("svg-image");
 *
 * // Assign SVG source code to the image:
 * img.src = imgSrc;
 *
 * // Add image to the DOM:
 * document.body.appendChild(img);
 *
 * // Set attributes to <svg> element:
 * img.setAttribute("svg-preserveAspectRatio", "xMaxYMin"); // Will set preserveAspectRatio="xMaxYMin"
 *
 * // Set attributes to <use> element:
 * img.setAttribute("use-data-test", "use-el"); // will set data-test="use-el"
 */
export class SvgImage extends WebComponent implements CustomElement {
  static readonly props = [
    // Web components may be used in unpredicted contexts, so it's safer to differ from the other integrations
    // and render empty SVG when there's no source code
    { name: "src", default: EMPTY_SVG },
  ];

  /** SVG source code */
  declare src: string;

  /**
   * Last src update result
   */
  protected _updateSrcRes: ReturnType<typeof onSrcUpdate> = {};

  private readonly _svgEl: SVGElement;
  private readonly _useEl: SVGUseElement;

  /**
   * `<use>` element
   */
  get useEl() {
    return this._useEl;
  }

  /**
   * `<svg>` element
   */
  get svgEl() {
    return this._svgEl;
  }

  constructor() {
    super();
    this._svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._useEl = document.createElementNS("http://www.w3.org/2000/svg", "use");
    this._svgEl.appendChild(this.useEl);
  }

  connectedCallback(): void {
    super.connectedCallback();
    createStyle(this.getStyleId(), styles.replaceAll("svg-image", this.localName));

    if (!this.childElementCount) {
      this.appendChild(this._svgEl);
    }
  }

  disconnectedCallback() {
    onUnmount(this._updateSrcRes.id);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (PROTECTED_SVG_ATTRS[name]) {
      return;
    }

    if (name === "src") {
      this._handleSrcUpdate(oldValue, newValue);
      return;
    }

    if (name.startsWith("use-")) {
      this._handleUseAttrUpdate(name.substring(4), newValue);
      return;
    }

    if (name.startsWith("svg-")) {
      this._handleSvgAttrUpdate(name.substring(4), newValue);
    }
  }

  /** @returns ID of a `<style>` element that styles this component */
  getStyleId() {
    return "svg-image-web-component__" + this.localName;
  }

  private _handleSrcUpdate(oldSrc: string | null, src: string | null) {
    this._updateSrcRes = onSrcUpdate(oldSrc ?? undefined, src || EMPTY_SVG);

    if (this._updateSrcRes.id) {
      setAttr(this.useEl, "href", "#" + this._updateSrcRes.id);
    }

    if (this._updateSrcRes.attrs) {
      setAttrs(this.svgEl, this._updateSrcRes.attrs);
    }
  }

  private _handleSvgAttrUpdate(name: string, value: string | null) {
    if (!PROTECTED_SVG_ATTRS[name]) {
      setAttr(this._svgEl, name, value);
    }
  }

  private _handleUseAttrUpdate(name: string, value: string | null) {
    if (name !== "href") {
      setAttr(this.useEl, name, value);
    }
  }

  static define(options: WebComponentDefinitionOptions = {}) {
    const tag = options.tag || "svg-image";
    super.define({ ...options, tag });
  }
}
