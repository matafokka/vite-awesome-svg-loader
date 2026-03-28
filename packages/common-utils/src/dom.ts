/**
 * HTML element or selector that will be passed to `document.querySelector()`
 */
export type ElementOrSelector = Element | string;

/**
 *
 */
export type SettableAttributeValue = string | null | undefined;

/**
 * Appends given element to the given container
 * @param el Element to append
 * @param to Container
 * @returns Container
 */
export function mount(el: Element, to: ElementOrSelector) {
  const container = typeof to === "string" ? document.querySelector(to) : to;

  if (!container) {
    console.error(`No elements found for selector "${to}"`);
    return;
  }

  container.appendChild(el);
  return container;
}

/**
 * Sets attributes of an element. Ignores `id`, `class` and `style` attributes.
 *
 * @param el Element to set attributes of
 * @param attrs Attributes object
 * @param clear If `true`, all element attributes will be cleared
 */
export function setAttrs(el: Element, attrs: Record<string, SettableAttributeValue>) {
  for (const attr in attrs) {
    setAttr(el, attr, attrs[attr]);
  }
}

/**
 * Clears attributes of an element.
 *
 * @param el Element whose attributes must be cleared
 */
export function clearAttrs(el: Element) {
  // Copy attrs because el.removeAttribute() will break iteration order
  const attrs: string[] = [];

  for (const attr of el.attributes) {
    attrs.push(attr.name);
  }

  for (const attr of attrs) {
    el.removeAttribute(attr);
  }
}

/**
 * Sets an attribute of an element
 *
 * @param el Element
 * @param name Attribute name
 * @param value Attribute value
 */
export function setAttr(el: Element, name: string, value: SettableAttributeValue) {
  if (typeof value === "string") {
    el.setAttribute(name, value);
  } else {
    el.removeAttribute(name);
  }
}

/**
 * Creates and appends to the `<head>` a unique style element. Behavior:
 *
 * 1. If there's no element with the given ID, will create a style element.
 * 1. If existing element **is** a style, won't do anything.
 * 1. If existing element **is not** a style, it will be replaced with a style element
 *
 * @param id Style ID
 * @param css CSS styles
 * @returns Created style element
 */
export function createStyle(id: string, css: string) {
  let el = document.getElementById(id);

  if (el) {
    if (el instanceof HTMLStyleElement) {
      return el;
    }

    el.remove();
  }

  el = document.createElement("style");
  el.innerHTML = css;
  el.id = id;
  document.head.appendChild(el);

  return el;
}
