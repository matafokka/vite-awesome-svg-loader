import { mount } from "cypress/vue";

// Looks like currently Cypress supports only one framework per instance.
// Fortunately, we need only one framework to test integrations.

import TestComponent from "@/component/WebComponent/integrates-with-vue/TestComponent.vue";
import { DEFAULT_VALUE, NEW_VALUE } from "@/component/test-kit/common";
import { ref } from "vue";

it("Integrates with Vue", () => {
  const prop1 = ref<string>();
  const dataAttr = ref<string>();
  const text = ref(DEFAULT_VALUE);

  mount(TestComponent).then(({ wrapper }) =>
    // @ts-expect-error Refs are actually supported and reactive
    wrapper.setProps({ text, prop1, "data-attr": dataAttr }),
  );

  comp().should("be.visible");
  comp().should("have.text", DEFAULT_VALUE);

  cy.then(() => (text.value = NEW_VALUE));
  comp().should("have.text", NEW_VALUE);

  cy.then(() => (prop1.value = NEW_VALUE));
  comp().should("have.prop", "prop1", NEW_VALUE);

  comp().should("not.have.attr", "data-attr");
  cy.then(() => (dataAttr.value = NEW_VALUE));
  comp().should("have.attr", "data-attr", NEW_VALUE);
});

function comp() {
  return cy.get("full-comp");
}
