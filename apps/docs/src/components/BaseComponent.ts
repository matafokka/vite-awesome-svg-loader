export abstract class BaseComponent extends HTMLElement {
  /**
   * Do **NOT** override, use {@link init} instead
   */
  async connectedCallback() {
    this.dispatchEvent(new Event("initstart", { cancelable: false, bubbles: true }));
    this.dataset.isDemoCustomElement = "true";
    this.dataset.isInitialized = "false";

    const children = this.querySelectorAll('[data-is-demo-custom-element="true"][data-is-initialized="false"]');
    const initPromises: Promise<void>[] = [];

    for (const child of children) {
      let resolve: () => void = () => undefined;
      initPromises.push(new Promise<void>((r) => (resolve = r)));
      child.addEventListener("initend", resolve);
    }

    await Promise.all(initPromises);
    await this.init();
    this.dataset.isInitialized = "true";
    this.dispatchEvent(new Event("initend", { cancelable: false, bubbles: true }));
  }

  /**
   * Initializes this component
   */
  protected init(): void | Promise<void> {}
}
