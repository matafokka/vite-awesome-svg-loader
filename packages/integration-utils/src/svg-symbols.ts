import debounce from "debounce";
import MurmurHash3 from "imurmurhash";

/**
 * ID of an SVG element that contains all symbols
 */
export const SVG_ID = "svg-symbols";

/**
 * Prepended to the symbol ID
 */
export const SYMBOL_ID_PREFIX = "svg-";

/**
 * Attribute of a symbol element that contains count of elements that uses that symbol
 */
export const USAGES_COUNT_ATTR = "data-count";

type MaybeSymbol = SVGSymbolElement | null | undefined;

/**
 * Should be called whenever image source is updated, and component is mounted.
 *
 * @param prevSrc Previous symbol source code, i.e. value of `import "./my/image.svg"`. If there's no previous source, pass `undefined`.
 * @param src Symbol source code, i.e. value of `import "./my/image.svg"`
 * @returns Attributes that should be bound to the `<svg>` tag. These attributes should override attributes bound by the user.
 */
export function onSrcUpdate(prevSrc: string | undefined, src: string) {
  if (typeof window === "undefined" || prevSrc === src) {
    return {};
  }

  // Get or create SVG symbols container

  let svgEl = document.getElementById(SVG_ID) as SVGSVGElement | null;

  if (!svgEl) {
    svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.id = SVG_ID;
    svgEl.setAttribute("aria-hidden", "true");
    // display: none messes with some of the icons
    svgEl.setAttribute("style", "position:fixed;top:-99999px;left:-99999px;z-index:0;opacity:0;");
    document.body.appendChild(svgEl);
  }

  // Reduce usages count of previous symbol

  if (prevSrc) {
    const id = SYMBOL_ID_PREFIX + new MurmurHash3(prevSrc).result();
    reduceSymbolUsages(document.getElementById(id) as any);
  }

  const id = SYMBOL_ID_PREFIX + new MurmurHash3(src).result(); // Use hash of the source code as an ID

  // Check if symbol already exists. If so, increment its usages count.

  const existingSymbol = document.getElementById(id) as SVGSymbolElement | null;

  if (existingSymbol) {
    existingSymbol.setAttribute(USAGES_COUNT_ATTR, getSymbolUsagesCount(existingSymbol) + 1 + "");
    return { id, attrs: getSvgAttrs(existingSymbol) };
  }

  // Create new symbol

  const svg = new DOMParser().parseFromString(src, "application/xml").firstElementChild;

  if (svg?.querySelector("parsererror")) {
    console.error("Provided source code is not a valid SVG: " + src);
    return { id };
  }

  if (!svg) {
    console.error("Missing child in SVG: " + src);
    return { id };
  }

  const symbol = document.createElementNS("http://www.w3.org/2000/svg", "symbol");

  for (let i = 0; i < svg.attributes.length; i++) {
    const attr = svg.attributes[i];
    symbol.setAttribute(attr.name, attr.value);
  }

  symbol.id = id;
  symbol.setAttribute(USAGES_COUNT_ATTR, "1");

  while (svg.children.length) {
    symbol.appendChild(svg.children[0]);
  }

  svgEl.appendChild(symbol);
  return { id, attrs: getSvgAttrs(symbol) };
}

/**
 * Should be called whenever component is unmounted
 * @param symbolOrId Symbol or ID of a symbol. If nullish value is provided, won't do anything.
 */
export function onUnmount(symbolOrId: SVGSymbolElement | string | null | undefined) {
  if (!symbolOrId || typeof window === "undefined") {
    return;
  }

  reduceSymbolUsages(typeof symbolOrId === "string" ? (document.getElementById(symbolOrId) as any) : symbolOrId);
}

function reduceSymbolUsages(symbol: SVGSymbolElement | null | undefined) {
  if (!symbol) {
    return;
  }

  const newCount = getSymbolUsagesCount(symbol, 1) - 1;
  symbol.setAttribute(USAGES_COUNT_ATTR, newCount + "");

  if (newCount <= 0) {
    symbolsToRemove.push(symbol);
    scheduleSymbolsRemoval();
  }
}

const symbolsToRemove: SVGSymbolElement[] = [];

const scheduleSymbolsRemoval = debounce(() => {
  for (let i = symbolsToRemove.length - 1; i >= 0; i--) {
    const symbol = symbolsToRemove[i];

    if (symbol.parentElement && getSymbolUsagesCount(symbol) <= 0) {
      symbol.parentElement.removeChild(symbol);
    }

    symbolsToRemove.pop();
  }
}, 5000);

function getSymbolUsagesCount(symbol: MaybeSymbol, nanReplacement = 0) {
  if (!symbol) {
    return nanReplacement;
  }

  const count = parseInt(symbol.getAttribute(USAGES_COUNT_ATTR) || "1");
  return isNaN(count) ? nanReplacement : count;
}

function getSvgAttrs(symbol: SVGSymbolElement) {
  let viewBox = symbol.getAttribute("viewBox") || "";

  if (!viewBox) {
    for (const attr of ["x", "y", "width", "height"]) {
      const value = symbol.getAttribute(attr);
      viewBox += (value || "0") + " ";
    }
  }

  return {
    viewBox,
    width: "100%",
    height: "100%",
  };
}
