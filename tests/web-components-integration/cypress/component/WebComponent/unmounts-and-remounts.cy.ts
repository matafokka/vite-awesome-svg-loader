import {
  expectCompToBeMountedWithDefaults,
  FullComponent,
  expectCompToBeUnmounted,
} from "@/component/test-kit/FullComponent";
import { getContainerEl } from "@cypress/mount-utils";

it("Unmounts and remounts", () => {
  const comp = FullComponent.mount();

  // Test multiple times to ensure that subsequent remounts work
  for (let i = 0; i < 3; i++) {
    getContainerEl().appendChild(comp);
    expectCompToBeMountedWithDefaults();

    comp.remove();
    expectCompToBeUnmounted();
  }
});
