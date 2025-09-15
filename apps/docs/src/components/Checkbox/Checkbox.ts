import { BaseComponent } from "@/components/BaseComponent";
import "./checkbox.scss";

// This component is for outside usage where might be no type safety.
// We stick to the JS behavior of implicit type casts.

let counter = Number.MIN_SAFE_INTEGER;

class DemoCheckboxElement extends BaseComponent {
  static observedAttributes = ["label", "checked"];

  #label = "";
  #checked = false;
  #checkboxEl: HTMLInputElement | undefined;
  #labelEl: HTMLElement | undefined;

  init() {
    this.classList.add("not-content");

    const label = document.createElement("label");
    this.appendChild(label);

    this.#checkboxEl = document.createElement("input");
    this.#checkboxEl.type = "checkbox";
    this.#checkboxEl.name = `checkbox-${++counter}`;
    this.#checkboxEl.addEventListener("change", this.#onCheckboxChange.bind(this));
    label.appendChild(this.#checkboxEl);

    this.#labelEl = document.createElement("span");
    label.appendChild(this.#labelEl);

    this.#updateCheckbox();
    this.#updateLabelText();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    oldValue += "";
    newValue += "";

    switch (name) {
      case "label":
        this.label = newValue;
        break;

      case "checked":
        this.checked = newValue === "true";
        break;
    }
  }

  get checked() {
    return this.#checked;
  }

  set checked(checked: any) {
    checked = checked === true;

    if (this.#checked === checked) {
      return;
    }

    this.#checked = checked;
    this.#updateCheckbox();

    if (this.hasAttribute("checked")) {
      this.setAttribute("checked", this.checked ? "true" : "false");
    }
  }

  #updateCheckbox() {
    if (this.#checkboxEl) {
      this.#checkboxEl.checked = this.#checked;
    }
  }

  #onCheckboxChange(e: Event) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.checked = this.#checkboxEl!.checked;
    this.dispatchEvent(new DemoCheckboxChangeEvent(this.checked));
  }

  set label(label: any) {
    label += "";

    if (label === this.label) {
      return;
    }

    this.#label = label;
    this.#updateLabelText();

    if (this.hasAttribute("label")) {
      this.setAttribute("label", label);
    }
  }

  get label() {
    return this.#label;
  }

  #updateLabelText() {
    if (this.#labelEl) {
      this.#labelEl.innerText = this.#label;
    }
  }
}

class DemoCheckboxChangeEvent extends Event {
  constructor(public checked: boolean) {
    super("change", { cancelable: false });
  }
}

if (typeof window !== "undefined") {
  customElements.define("demo-checkbox", DemoCheckboxElement);
  (window as any).DemoCheckboxElement = DemoCheckboxElement;
}
