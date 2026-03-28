import { FullComponent, setTestProps, testPropsShouldBeSet } from "@/component/test-kit/FullComponent";
import { getContainerEl } from "@cypress/mount-utils";

it("upgrades when data is set before upgrade", () => {
  const comp = document.createElement("full-comp");
  setTestProps(comp);

  FullComponent.define();
  getContainerEl().appendChild(comp);

  testPropsShouldBeSet();
});
