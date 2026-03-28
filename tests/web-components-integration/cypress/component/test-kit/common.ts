import { WebComponent, WebComponentProp } from "vite-awesome-svg-loader/web-components-integration";

export const DEFAULT_VALUE = "Default value";
export const NEW_VALUE = "New value";

export const BASE_TEST_PROPS: (string | WebComponentProp)[] = [
  "withoutDefault",
  { name: "withDefault", default: DEFAULT_VALUE },
];

export class WithBaseTestProps extends WebComponent {
  declare withoutDefault?: string;
  declare withDefault: string;
}
