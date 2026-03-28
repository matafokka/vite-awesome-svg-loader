import { WithBaseTestProps, BASE_TEST_PROPS } from "@/component/test-kit/common";
import { WebComponentDefinitionOptions } from "vite-awesome-svg-loader/web-components-integration";

export const MIN_COMP_TAG = "minimal-comp";

export class MinimalComponent extends WithBaseTestProps {
  static readonly props = [...BASE_TEST_PROPS];

  // eslint-disable-next-line unused-imports/no-unused-vars
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {}

  static define(options: WebComponentDefinitionOptions = {}): void {
    super.define({ ...options, tag: options.tag || MIN_COMP_TAG });
  }
}
