import { getContainerEl } from "@cypress/mount-utils";
import { SvgImage, SvgIcon, WebComponent } from "vite-awesome-svg-loader/web-components-integration";

export interface Image extends WebComponent {
  src?: string;
}

export interface ImageConstructor<T extends Image> {
  new (): T;
  define(): void;
}

function createMountFn<T extends Image>(comp: ImageConstructor<T>) {
  return (src?: string) => {
    const root = getContainerEl();
    comp.define();
    const instance = new comp();

    if (src) {
      instance.src = src;
    }

    root.appendChild(instance);
    return instance;
  };
}

export const mountImage = createMountFn(SvgImage);
export const mountIcon = createMountFn(SvgIcon);
