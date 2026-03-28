import { FULL_COMP_TAG, FullComponent } from "@/component/test-kit/FullComponent";
import { MIN_COMP_TAG, MinimalComponent } from "@/component/test-kit/MinimalComponent";

declare global {
  interface HTMLElementTagNameMap {
    [MIN_COMP_TAG]: MinimalComponent;
    [FULL_COMP_TAG]: FullComponent;
  }
}
