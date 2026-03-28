import musicSrc from "@/assets/music.svg?raw";
import starSrc from "@/assets/star.svg?raw";
import videoSrc from "@/assets/video.svg?raw";

import { expectImageToBeVisible, expectImageToNotExist, href, svgEl, useEl } from "vanilla-tests-core";
import { getContainerEl } from "@cypress/mount-utils";
import { SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

describe("SvgImage", () => {
  testSvgImage(SvgImage);
});

export function testSvgImage(SvgImageClass: typeof SvgImage) {
  it("mounts, unmounts, remounts", () => {
    const img = new SvgImageClass(musicSrc, getContainerEl());
    expectImageToBeVisible();

    img.unmount();
    expectImageToNotExist();

    img.mount(getContainerEl());
    expectImageToBeVisible();
  });

  it("setSvgElAttrs", () => {
    const img = new SvgImageClass(musicSrc, getContainerEl());
    const viewBox = img.getSvgEl().getAttribute("viewBox")!;

    img.setSvgElAttrs({ "data-test": "test", "viewBox": "99 99 99 99" });
    expectImageToBeVisible();

    expect(svgEl()).to.have.attr("data-test", "test");
    expect(svgEl()).to.have.attr("viewBox", viewBox);

    img.setSvgElAttrs({ "data-test2": "test" });
    expect(svgEl()).to.have.attr("data-test2", "test");
    expect(svgEl()).to.not.have.attr("data-test");
  });

  it("setUseElAttrs", () => {
    const img = new SvgImageClass(musicSrc, getContainerEl());
    const oldHref = href()!;

    img.setUseElAttrs({ "data-test": "test", "href": "a" });
    expectImageToBeVisible();

    expect(useEl()).to.have.attr("data-test", "test");
    expect(useEl()).to.have.attr("href", oldHref);

    img.setUseElAttrs({ "data-test2": "test" });
    expect(useEl()).to.not.have.attr("data-test");
  });

  it("setSrc", () => {
    const img = new SvgImageClass(musicSrc, getContainerEl());

    for (const src of [starSrc, videoSrc]) {
      const oldHref = href();
      img.setSrc(src);
      expect(img.getSrc()).to.equal(src);
      expect(href()).to.be.a("string").that.does.not.equal(oldHref);
    }
  });
}
