import { FullComponent, expectCompToBeMountedWithDefaults } from "@/component/test-kit/FullComponent";
import { getContainerEl } from "@cypress/mount-utils";

it("Mounts via document.createElement()", () => {
  FullComponent.define();
  const comp = document.createElement("full-comp");
  getContainerEl().appendChild(comp);
  expectCompToBeMountedWithDefaults();
});
