import musicSrc from "@/assets/music.svg?raw";
import starSrc from "@/assets/star.svg?raw";
import videoSrc from "@/assets/video.svg?raw";

import { mountIcon } from "@/component/test-kit/images";
import { href, expectImageToBeVisible, testIconColor, testIconColorTransition, testIconSize } from "vanilla-tests-core";

describe("SvgIcon", () => {
  it("can be seen", () => {
    const icon = mountIcon(musicSrc);

    expect(icon).to.be.visible;
    expectImageToBeVisible();
  });

  it("changes image when source code is changed", () => {
    const icon = mountIcon(musicSrc);

    for (const src of [starSrc, videoSrc]) {
      const oldHref = href();
      icon.src = src;
      expect(href()).to.be.a("string").that.does.not.equal(oldHref);
    }
  });

  it("changes size", () => {
    testIconSize(
      () => mountIcon(musicSrc),
      (icon, size) => (icon.size = size),
      (icon) => icon,
    );
  });

  it("changes color transition", () => {
    testIconColorTransition(
      () => mountIcon(musicSrc),
      (icon, trans) => (icon.colorTransition = trans),
    );
  });

  it("changes color", () => {
    testIconColor(
      () => {
        const icon = mountIcon(musicSrc);
        icon.colorTransition = "";
        return icon;
      },
      (icon, color) => (icon.color = color),
    );
  });
});
