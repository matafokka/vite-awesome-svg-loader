import musicSrc from "@/assets/music.svg?raw";
import starSrc from "@/assets/star.svg?raw";
import videoSrc from "@/assets/video.svg?raw";

import { mountImage } from "@/component/test-kit/images";
import { href, expectImageToBeVisible, svgEl, useEl } from "vanilla-tests-core";

describe("SvgImage", () => {
  it("can be seen", () => {
    mountImage(musicSrc);
    expectImageToBeVisible();
  });

  it("changes image when source code changes", () => {
    const img = mountImage(musicSrc);

    for (const src of [starSrc, videoSrc]) {
      const oldHref = href();
      img.src = src;
      expect(href()).to.be.a("string").that.does.not.equal(oldHref);
    }
  });

  it("renders empty SVG when there's no source code", () => {
    mountImage();

    expect(svgEl()).to.be.visible;
    expect(svgEl()).to.have.attr("viewBox", "0 0 0 0");
  });

  it("forwards attributes", async () => {
    const img = mountImage(musicSrc);

    img.setAttribute("data-img", "img");
    img.setAttribute("svg-data-test", "svg");
    img.setAttribute("use-data-test", "use");

    expect(svgEl()).to.have.attr("data-test", "svg");
    expect(useEl()).to.have.attr("data-test", "use");

    expect(svgEl()).to.not.have.attr("data-img");
    expect(useEl()).to.not.have.attr("data-img");
  });

  it('doesn\'t forward "use-href" attribute', () => {
    const img = mountImage(musicSrc);
    const oldHref = href();
    img.setAttribute("use-href", "test");
    expect(href()).to.equal(oldHref);
  });
});
