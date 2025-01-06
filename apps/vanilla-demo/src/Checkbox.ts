import type { SvgIcon, SvgImage } from "vite-awesome-svg-loader/vanilla-integration";

export interface CheckboxProps {
  selector: string;
  onChange?: (checked: boolean) => void;
  label: string;
}

export interface SvgCheckboxProps extends Omit<CheckboxProps, "label"> {
  svg: SvgImage | SvgIcon;
  src1: string;
  src2: string;
  label?: string;
}

export class Checkbox {
  private internalLabel = "";
  private internalChecked = false;

  private el = document.createElement("label");
  private input = document.createElement("input");
  private labelValue = document.createElement("span");

  get label() {
    return this.internalLabel;
  }

  set label(label) {
    this.internalLabel = label;
    this.labelValue.innerHTML = label;
  }

  get checked() {
    return this.internalChecked;
  }

  set checked(checked: boolean) {
    if (checked === this.internalChecked) {
      return;
    }

    this.internalChecked = checked;
    this.input.checked = checked;
    this.props.onChange?.(checked);
  }

  constructor(private props: CheckboxProps) {
    this.label = props.label;

    this.input.type = "checkbox";
    this.input.addEventListener("input", this.onCheckboxChange);

    this.el.className = "checkbox";
    this.el.appendChild(this.input);
    this.el.appendChild(this.labelValue);

    const target = document.querySelector(props.selector);

    if (!target) {
      throw new Error(`Target "${props.selector}" not found`);
    }

    target.parentElement?.replaceChild(this.el, target);
  }

  private onCheckboxChange = () => {
    this.checked = this.input.checked;
  };

  remove() {
    this.el.parentElement?.removeChild(this.el);
    this.input.removeEventListener("input", this.onCheckboxChange);
  }

  static svgCheckbox(props: SvgCheckboxProps) {
    return new Checkbox({
      ...props,
      label: "Show original image",
      onChange: (checked) => props.svg.setSrc(checked ? props.src2 : props.src1),
    });
  }
}
