// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { getContainerEl, setupHooks } from "@cypress/mount-utils";
import "./commands";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Chai {
    interface Assertion {
      haveUndefinedProperty(name: string): void;
    }
  }
}

// Looks like have.prop doesn't work when property exists but has undefined value.
// We should write our own assertion instead of using "not.have.prop".
chai.use((chaiInstance) => {
  chaiInstance.Assertion.addMethod("haveUndefinedProperty", function (name: string) {
    const obj = Cypress.dom.isJquery(this._obj) ? this._obj.get()[0] : this._obj;

    this.assert(
      "withoutDefault" in obj,
      `expected #{this} to have property "${name}"`,
      `expected #{this} to not have property "${name}"`,
      obj,
    );

    this.assert(
      obj[name] === undefined,
      `expected #{this} to have undefined property "${name}"`,
      `expected #{this} to not have undefined property "${name}"`,
      obj,
    );
  });
});

setupHooks(() => (getContainerEl().innerHTML = "")); // Clear container after each test
