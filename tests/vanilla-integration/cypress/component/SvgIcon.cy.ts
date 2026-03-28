import musicSrc from "@/assets/music.svg?raw";
import { testSvgImage } from "@/component/SvgImage.cy";

import { testIconColor, testIconColorTransition, testIconSize } from "vanilla-tests-core";
import { getContainerEl } from "@cypress/mount-utils";
import { SvgIcon } from "vite-awesome-svg-loader/vanilla-integration";

describe("SvgIcon", () => {
  testSvgImage(SvgIcon);

  it("setWrapperAttrs", () => {
    const icon = new SvgIcon(musicSrc, getContainerEl());
    icon.setWrapperAttrs({ "data-test": "test" });

    expect(icon.getWrapper()).to.have.attr("data-test", "test");

    icon.setWrapperAttrs({ "data-test2": "test" });
    expect(icon.getWrapper()).to.have.attr("data-test2", "test");
    expect(icon.getWrapper()).to.not.have.attr("data-test");
  });

  it("setSize", () => {
    testIconSize(
      () => new SvgIcon(musicSrc, getContainerEl()),
      (icon, size) => icon.setSize(size),
      (icon) => icon.getWrapper(),
    );
  });

  it("setColorTransition", () => {
    testIconColorTransition(
      () => new SvgIcon(musicSrc, getContainerEl()),
      (icon, trans) => icon.setColorTransition(trans),
    );
  });

  it("setColor", () => {
    testIconColor(
      () => new SvgIcon(musicSrc, getContainerEl()).setColorTransition("none"),
      (icon, color) => icon.setColor(color),
    );
  });
});
