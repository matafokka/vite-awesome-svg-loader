import { FullComponent, expectCompToBeMountedWithDefaults } from "@/component/test-kit/FullComponent";
import { getContainerEl } from "@cypress/mount-utils";

it("Mounts via constructor", () => {
  FullComponent.define();
  const comp = new FullComponent();
  getContainerEl().appendChild(comp);
  expectCompToBeMountedWithDefaults();
});
