export type ElementOrSelector = Element | string;

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

const IGNORE_ATTRS: Record<string, true> = {
  id: true,
  class: true,
  style: true,
};

/**
 * Sets attributes of an element
 * @param el Element to set attributes of
 * @param attrs Attributes object
 * @param clear If `true`, all element attributes will be cleared
 */
export function setAttrs(el: Element, attrs: Record<string, any>, clear = false) {
  if (clear) {
    // Copy attrs because el.removeAttribute() will break iteration order
    const attrsCopy: string[] = [];

    for (const attr of el.attributes) {
      if (!IGNORE_ATTRS[attr.name]) {
        attrsCopy.push(attr.name);
      }
    }

    for (const attr of attrsCopy) {
      el.removeAttribute(attr);
    }
  }

  for (const attr in attrs) {
    el.setAttribute(attr, attrs[attr]);
  }
}

/**
 * Sets style properties, works with CSS variables
 * @param el Element to set property of
 * @param prop Property to set, for example: `minHeight`, `--my-var`
 * @param value Value of a property
 */
export function setStyleProperty(el: HTMLElement, prop: string, value: string | undefined) {
  if (value) {
    if (el.style[prop as any] !== undefined) {
      el.style[prop as any] = value;
    } else {
      el.style.setProperty(prop, value);
    }
  } else {
    if (el.style[prop as any] !== undefined) {
      el.style[prop as any] = "";
    } else {
      el.style.removeProperty(prop);
    }
  }
}
