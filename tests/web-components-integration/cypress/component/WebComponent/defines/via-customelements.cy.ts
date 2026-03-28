import { expectCompToBeMountedWithDefaults, FullComponent } from "@/component/test-kit/FullComponent";
import { getContainerEl } from "@cypress/mount-utils";

it(`Defines via "customElements.define()"`, () => {
  customElements.define("full-comp", FullComponent);
  const comp = new FullComponent();
  getContainerEl().appendChild(comp);
  expectCompToBeMountedWithDefaults();
});
