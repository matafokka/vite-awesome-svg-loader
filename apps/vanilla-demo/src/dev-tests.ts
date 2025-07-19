import origMusicIconSrc from "@/assets/import-demo/icons/music.svg";
import origStarIconSrc from "@/assets/import-demo/icons/star.svg";
import { SvgIcon, SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

function createImage(container: Element) {
  const img = new SvgImage(origMusicIconSrc, container);
  img.getSvgEl().classList.add("image");
  return img;
}

function createIcon(container: Element) {
  return new SvgIcon(origMusicIconSrc, container).setSize("var(--image-size)");
}

const devTestsContainer = document.getElementById("dev-tests")!;

if (import.meta.env.DEV) {
  devTestsContainer.style.display = "";

  //----------//
  // SvgImage //
  //----------//

  // SvgImage.setSrc() works
  createImage(document.getElementById("replace-src")!).setSrc(origStarIconSrc);

  // Set attributes works

  const attrs: Record<string, string> = {
    "aria-role": "presentation",
    "tabindex": "-1",
    "data-attr": "value",
  };

  createImage(document.getElementById("attrs-work")!).setSvgElAttrs(attrs).setUseElAttrs(attrs);

  // Attributes resetting works

  const attrs2 = {
    "data-attr-2": "value",
  };

  createImage(document.getElementById("attrs-resetting-work")!)
    .setSvgElAttrs(attrs)
    .setUseElAttrs(attrs)
    .setSvgElAttrs(attrs2)
    .setUseElAttrs(attrs2);

  // Unmounting and remounting works
  const unmountingWorksContainer = document.getElementById("unmounting-works")!;
  createImage(unmountingWorksContainer).unmount().mount("#remounting-works");

  // Remounting works without prior unmounting
  createImage(unmountingWorksContainer).mount("#remounting-works-2");

  //---------//
  // SvgIcon //
  //---------//

  // Unmounting and remounting works
  const iconUnmountingWorksContainer = document.getElementById("icon-unmounting-works")!;
  createIcon(iconUnmountingWorksContainer).unmount().mount("#icon-remounting-works");

  // Remounting works without prior unmounting
  createIcon(iconUnmountingWorksContainer).mount("#icon-remounting-works-2");

  // SvgIcon.setWrapperAttrs() works

  createIcon(document.getElementById("set-wrapper-attrs-works")!).setWrapperAttrs({
    class: "shouldn't be set",
    style: "shouldn't be set",
    ...attrs,
  });

  // SvgIcon.setWrapperAttrs() resetting works
  createIcon(document.getElementById("reset-wrapper-attrs-works")!).setWrapperAttrs(attrs).setWrapperAttrs(attrs2);
} else {
  devTestsContainer?.parentElement?.removeChild(devTestsContainer);
}
