import { FullComponent } from "@/component/test-kit/FullComponent";

it("Defines under different tag", () => {
  const tag = "custom-tag";
  FullComponent.define({ tag });
  expect(document.createElement(tag)).to.be.instanceOf(FullComponent);
});
