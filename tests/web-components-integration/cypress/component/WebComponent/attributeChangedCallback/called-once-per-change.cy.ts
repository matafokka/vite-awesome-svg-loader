import { NEW_VALUE, DEFAULT_VALUE } from "@/component/test-kit/common";
import { FullComponent } from "@/component/test-kit/FullComponent";
import { timeout } from "internal-utils";

it("Called once per change", async () => {
  const comp = FullComponent.mount();
  await timeout(0); // Wait for initialization because we don't access any attributes before performing the tests
  const spy = cy.spy(comp, "attributeChangedCallback");

  // --- Set via property ---

  // First change

  comp.withDefault = NEW_VALUE;
  await timeout(100);
  expect(comp.attributeChangedCallback).to.have.been.calledOnceWithExactly("with-default", DEFAULT_VALUE, NEW_VALUE);
  spy.resetHistory();

  comp.withoutDefault = NEW_VALUE;
  await timeout(100);
  expect(comp.attributeChangedCallback).to.have.been.calledOnceWithExactly("without-default", null, NEW_VALUE);
  spy.resetHistory();

  // Second change

  comp.withDefault = DEFAULT_VALUE;
  await timeout(100);
  expect(comp.attributeChangedCallback).to.have.been.calledOnceWithExactly("with-default", NEW_VALUE, DEFAULT_VALUE);
  spy.resetHistory();

  comp.withoutDefault = DEFAULT_VALUE;
  await timeout(100);
  expect(comp.attributeChangedCallback).to.have.been.calledOnceWithExactly("without-default", NEW_VALUE, DEFAULT_VALUE);
  spy.resetHistory();

  // --- Set via attribute ---

  // First change

  comp.setAttribute("prop1", DEFAULT_VALUE);
  await timeout(100);
  expect(comp.attributeChangedCallback).to.have.been.calledOnceWithExactly("prop1", null, DEFAULT_VALUE);
  spy.resetHistory();

  // Second change

  comp.setAttribute("prop1", NEW_VALUE);
  await timeout(100);
  expect(comp.attributeChangedCallback).to.have.been.calledOnceWithExactly("prop1", DEFAULT_VALUE, NEW_VALUE);
  spy.resetHistory();
});
