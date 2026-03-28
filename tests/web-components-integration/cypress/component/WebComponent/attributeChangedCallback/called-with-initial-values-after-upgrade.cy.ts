import { timeout } from "internal-utils";
import { getContainerEl } from "@cypress/mount-utils";
import { MinimalComponent } from "@/component/test-kit/MinimalComponent";
import { DEFAULT_VALUE } from "@/component/test-kit/common";

it("Called with initial values after upgrade", async () => {
  const comp = document.createElement("minimal-comp");
  cy.spy(MinimalComponent.prototype, "attributeChangedCallback");
  MinimalComponent.define();

  getContainerEl().appendChild(comp);
  customElements.upgrade(comp);

  await timeout(100); // Wait for possible async updates

  expect(comp.attributeChangedCallback).to.have.callCount(MinimalComponent.props.length);

  expect(comp.attributeChangedCallback).to.have.been.calledWith("without-default", null, null);
  expect(comp.attributeChangedCallback).to.have.been.calledWith("with-default", null, DEFAULT_VALUE);
});
