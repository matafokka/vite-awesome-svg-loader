import { FullComponent, setTestProps, testPropsShouldBeSet } from "@/component/test-kit/FullComponent";
import { getContainerEl } from "@cypress/mount-utils";

it("upgrades when data is set after upgrade", () => {
  const comp = document.createElement("full-comp");
  FullComponent.define();

  getContainerEl().appendChild(comp);
  customElements.upgrade(comp);

  setTestProps(comp);
  testPropsShouldBeSet();
});
