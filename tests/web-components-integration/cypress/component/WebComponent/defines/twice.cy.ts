import { FullComponent } from "@/component/test-kit/FullComponent";

it("Defines twice", () => {
  expect(() => {
    FullComponent.define();
    FullComponent.define();
  }).to.not.throw();
});
