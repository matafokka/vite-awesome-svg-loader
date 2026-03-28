// This file adds opt-in type-checking support for integration's additions to the DOM

declare global {
  interface HTMLElementTagNameMap {
    "svg-image": import("./SvgImage").SvgImage;
    "svg-icon": import("./SvgIcon").SvgIcon;
  }
}

export {};
