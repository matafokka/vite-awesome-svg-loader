import { NEW_VALUE, DEFAULT_VALUE } from "@/component/test-kit/common";
import { FullComponent } from "@/component/test-kit/FullComponent";

describe("Syncs props and attrs", () => {
  it("when property is set first", () => {
    const comp = FullComponent.mount();

    comp.prop1 = NEW_VALUE;
    expect(comp).to.have.attr("prop1", NEW_VALUE);

    comp.prop1 = DEFAULT_VALUE;
    expect(comp).to.have.attr("prop1", DEFAULT_VALUE);

    comp.setAttribute("prop1", NEW_VALUE);
    expect(comp).to.have.property("prop1", NEW_VALUE);
  });

  it("when attribute is set first", () => {
    const comp = FullComponent.mount();

    comp.setAttribute("prop1", NEW_VALUE);
    expect(comp).to.have.property("prop1", NEW_VALUE);

    comp.setAttribute("prop1", DEFAULT_VALUE);
    expect(comp).to.have.property("prop1", DEFAULT_VALUE);

    comp.prop1 = NEW_VALUE;
    expect(comp).to.have.attr("prop1", NEW_VALUE);
  });
});
