import { getContainerEl } from "@cypress/mount-utils";
import { resolveCssColor } from "internal-utils";

export function expectImageToBeVisible() {
  expect(svgEl()).to.be.visible;
  expect(useEl()).to.exist;
  expect(useEl()).to.have.attr("href").that.matches(/^#.*/);
}

export function expectImageToNotExist() {
  expect(svgEl()).to.be.undefined;
}

export function svgEl() {
  return getContainerEl().getElementsByTagName("svg")[0];
}

export function useEl() {
  return svgEl().getElementsByTagName("use")[0];
}

export function href() {
  return useEl()?.getAttribute("href") ?? null;
}

export function testIconSize<T>(
  mount: () => T,
  setSize: (icon: T, size: string) => void,
  getWrapper: (icon: T) => HTMLElement,
) {
  const icon = mount();
  const sizes = ["20px", "40px", "80px"];

  for (const size of sizes) {
    setSize(icon, size);

    const sizeNum = parseInt(size);
    const { width, height } = getWrapper(icon).getBoundingClientRect();

    expect(width).to.equal(sizeNum);
    expect(height).to.equal(sizeNum);
  }
}

export function testIconColorTransition<T>(mount: () => T, setTransition: (icon: T, trans: string) => void) {
  const icon = mount();
  const transitions = ["0.2s ease-out", "2s ease-in", "4s ease-in-out"];

  for (const trans of transitions) {
    setTransition(icon, trans);

    const [timing, easing] = trans.split(" ");
    const style = getComputedStyle(useEl()!);

    expect(style.transitionProperty).to.equal("color");
    expect(style.transitionDuration).to.equal(timing);
    expect(style.transitionTimingFunction).to.equal(easing);
  }
}

export function testIconColor<T>(mount: () => T, setColor: (icon: T, color: string) => void) {
  const icon = mount();
  const colors = ["red", "green", "blue"];

  for (const color of colors) {
    setColor(icon, color);
    expect(getComputedStyle(useEl()!).color).to.equal(resolveCssColor(color));
  }
}
