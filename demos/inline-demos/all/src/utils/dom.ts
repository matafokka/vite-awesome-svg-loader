import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

/**
 * Creates HTML element
 * @param tag Tag
 * @param className Class
 * @returns HTML element
 */
export function createEl<T extends keyof HTMLElementTagNameMap>(tag: T, className?: string) {
  const el = document.createElement<T>(tag);
  el.className = className || "";
  return el;
}

/**
 * Creates `HTMLImageElement`
 * @param url Image URL
 * @returns Image element
 */
export function createImage(url: string) {
  const img = createEl("img", "image");
  img.src = url;
  img.alt = "";
  return img;
}

export function setSrcOnCheckboxChange(img: SvgImage, checkboxId: string, checkedSrc: string, uncheckedSrc: string) {
  document
    .getElementById(checkboxId)!
    .addEventListener("change", (e: any) => img.setSrc(e.checked ? checkedSrc : uncheckedSrc));
}
