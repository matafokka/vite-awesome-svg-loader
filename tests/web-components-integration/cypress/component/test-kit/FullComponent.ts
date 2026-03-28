import { BASE_TEST_PROPS, DEFAULT_VALUE, NEW_VALUE, WithBaseTestProps } from "@/component/test-kit/common";
import { getContainerEl } from "@cypress/mount-utils";
import { WebComponentDefinitionOptions } from "vite-awesome-svg-loader/web-components-integration";

export const FULL_COMP_TAG = "full-comp";

export class FullComponent extends WithBaseTestProps {
  static readonly props = [...BASE_TEST_PROPS, "prop1", "prop2"];

  declare text: string;
  declare prop1?: string;
  declare prop2?: string;

  unsynced = DEFAULT_VALUE;

  div: HTMLElement;

  constructor() {
    super();

    this.div = document.createElement("div");
    this.div.innerText = DEFAULT_VALUE;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.childElementCount) {
      this.appendChild(this.div);
    }
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === "text") {
      this.div.innerText = newValue || "";
    }
  }

  static define(options: WebComponentDefinitionOptions = {}): void {
    super.define({ ...options, tag: options.tag || FULL_COMP_TAG });
  }

  static mount(options?: WebComponentDefinitionOptions) {
    FullComponent.define(options);
    const comp = new FullComponent();
    getContainerEl().appendChild(comp);
    return comp;
  }
}

export function el(tag = FULL_COMP_TAG) {
  return document.getElementsByTagName(tag)[0] as FullComponent | undefined;
}

export function div(tag = FULL_COMP_TAG) {
  return el(tag)?.getElementsByTagName("div")[0];
}

export function expectCompToBeMounted(tag = FULL_COMP_TAG) {
  expect(el(tag)).to.be.visible;
  expect(div(tag)).to.be.visible;
}

export function expectCompToBeMountedWithDefaults(tag = FULL_COMP_TAG) {
  expectCompToBeMounted(tag);
  const comp = el(tag);

  expect(comp).to.haveUndefinedProperty("withoutDefault");
  expect(comp).to.have.prop("withDefault", DEFAULT_VALUE);
  expect(comp).to.have.prop("unsynced", DEFAULT_VALUE);
  expect(comp).to.not.have.attr("withoutDefault");
  expect(comp).to.have.attr("with-default", DEFAULT_VALUE);
  expect(comp).to.not.have.attr("unsynced");

  expect(div(tag)).to.have.text(DEFAULT_VALUE);
}

export function expectCompToBeUnmounted(tag = FULL_COMP_TAG) {
  expect(el(tag)).to.not.exist;
}

export function setTestProps(comp: FullComponent) {
  comp.prop1 = NEW_VALUE;
  comp.setAttribute("prop2", NEW_VALUE);
  comp.setAttribute("some-attr", NEW_VALUE);
}

export function testPropsShouldBeSet() {
  expectCompToBeMountedWithDefaults();

  expect(el()).to.have.prop("prop1", NEW_VALUE);
  expect(el()).to.have.attr("prop1", NEW_VALUE);
  expect(el()).to.have.prop("prop2", NEW_VALUE);
  expect(el()).to.have.attr("prop2", NEW_VALUE);
  expect(el()).to.have.attr("some-attr", NEW_VALUE);
}
