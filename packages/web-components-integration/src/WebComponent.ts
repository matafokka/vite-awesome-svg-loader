import { camelCaseToKebabCase } from "common-utils";
import type { CustomElement } from "typed-custom-elements";

/** Describes {@link WebComponent} property */
export interface WebComponentProp {
  /** Property name */
  name: string;

  /** Default value */
  default?: string;
}

/** Basic custom element's definition options that should be passed to {@link WebComponent.define} */
export interface BasicWebComponentDefinitionOptions {
  /** Custom element tag name */
  tag: string;

  /**
   * Where to define given element
   *
   * @default customElements
   */
  registry?: CustomElementRegistry;

  /**
   * Whether to ignore an error that is thrown when an element is defined second time under a different tag.
   *
   * This option is intended for when a web component uses another web component which may not be defined before
   * its construction.
   *
   * @default false
   */
  noRedefinitionError?: boolean;
}

/**
 * Definition options that should be used by concrete web components. Components must provide default values
 * if necessary.
 */
export interface WebComponentDefinitionOptions extends Partial<BasicWebComponentDefinitionOptions> {}

/**
 * Current component state. Possible values:
 *
 * 1. `uninitialized` - Initialization has not yet run.
 * 1. `initialization` - Component is initializing its internal state.
 * 1. `attrs-first-change` - Component is calling {@link WebComponent.attributeChangedCallback} for the first time right
 * after initialization is completed.
 * 1. `normal` - Normal state.
 */
export type WebComponentState = "uninitialized" | "initialization" | "attrs-first-change" | "normal";

/** Resolved and normalized property config */
export interface ResolvedWebComponentProp extends Omit<WebComponentProp, "name"> {}

/** Web component metadata */
interface WebComponentMeta {
  /** Maps property name in `camelCase` to the resolved property config */
  props: Record<string, ResolvedWebComponentProp | undefined>;

  /** Maps attribute name in `kebab-case` to the resolved property config */
  attrs: Record<string, ResolvedWebComponentProp | undefined>;
}

// Not a WeakMap because custom element constructors won't be garbage-collected.
// So let's squeeze a bit of performance by using a regular Map.
const componentsMeta = new Map<typeof WebComponent, WebComponentMeta>();

/** Tracks which registry contains which web components */
const registryToComponents = new Map<CustomElementRegistry, Set<typeof WebComponent>>();

/**
 * ### Introduction
 *
 * This is the base web components class and the whole web components implementation.
 *
 * This is just a
 * [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
 * with a number of necessary features missing from the standard custom elements.
 *
 * ### Implementation goals
 *
 * This web components implementation was designed with the following goals in mind:
 *
 * 1. Improve upon custom elements:
 *    1. Implement necessary features that are missing from the standard custom elements.
 *    1. Maintain compliance with the custom elements specification.
 *    1. Maintain compatibility with other libraries and frameworks without additional setup.
 * 1. Keep implementation minimal and size small:
 *    1. Don't pollute application's bundle with the code that most likely won't be used.
 *    1. Don't implement features for the sake of having features.
 * 1. Achieve maximum performance.
 *
 * As you can see, this is **not** a framework. There are no quality-of-life abstractions and features found in major
 * frameworks like [Lit](https://lit.dev/). Ultimately, this is a bare minimum to ship off web components integration.
 *
 * ### When to use this
 *
 * When you are:
 *
 * - Occasionally using web components (or just `vite-awesome-svg-loader` alone).
 * - Building a wrapper around `vite-awesome-svg-loader`.
 * - Having other reasons to use a **minimal** web components implementation like this one.
 *
 * ### When to NOT use this
 *
 * When you are:
 *
 * - Planning or already using a dedicated library for managing web components.
 *
 *    Just use that library.
 *
 * - Planning to build more web components.
 *
 *    Consider using a dedicated library. It will pay off in the long run.
 *
 * ### Behavioral differences from custom elements
 *
 * 1. All attributes are observed automatically. No need for {@link WebComponent.observedAttributes}.
 *
 * 1. {@link WebComponent.attributeChangedCallback} is called when component has initialized and when any attribute's
 * value has **actually** changed. Setting same value doesn't count as a change.
 *
 * 1. Properties can be synchronized with attributes by defining them in {@link WebComponent.props}.
 *
 * ### Core principles
 *
 * 1. Use constructors to initialize state. But do **not** use properties defined in {@link WebComponent.props}
 * in a constructor because that will trigger an attribute setter which renders constructor invalid
 * (per custom elements specification).
 *
 * 1. Use {@link WebComponent.connectedCallback} to initialize markup.
 *
 * 1. Use {@link WebComponent.attributeChangedCallback} to track property/attribute changes. Do **not** define your own
 * getters and setters, they will be overridden.
 *
 * 1. Prefer inheritance over composition. Yes, this is an anti-pattern. Web components are actual elements.
 * The more components you nest, the larger and slower to process DOM becomes. If you want composition, either sacrifice
 * performance or use a specialized library/framework.
 *
 * 1. When using a web component inside another web component, call `define({ noRedefinitionError: true })` and
 * use a constructor instead of `document.createElement()`.
 *
 *    Suppress a redefinition error because in most cases user will not specify different tag and would not expect
 *    an error if they haven't defined a dependency component.
 *
 *    Use a constructor because user still might decide to use a custom tag.
 *
 *    Ultimately, user will get an error, if the definition is invalid.
 *
 * 1. If you've encountered a problem that must be resolved immediately by modifying the internals,
 * everything's here for you. Just use `// @ts-ignore` to suppress the errors. After the hotfix, please file an issue
 * and explain your case.
 *
 * ### Creating web components
 *
 * Let's create a simple `BusinessCard` web component:
 *
 * ```ts
 * class BusinessCard extends WebComponent implements CustomElement {
 *   // Define class properties that will be synced with attributes
 *
 *   static readonly props = ["personName", { name: "orgName", default: "Not affiliated" }];
 *
 *   // Declare properties for type-checking to work. You may actually define them, but they will be overridden
 *   // with proper getters and setters, so don't create empty overhead.
 *
 *   declare personName?: string;
 *   declare orgName: string;
 *
 *   // Add markup
 *
 *   connectedCallback() {
 *     super.connectedCallback();
 *
 *     if (this.children.length) {
 *       return
 *     }
 *
 *     const personName = document.createElement("div");
 *     personName.className = "person-name";
 *     this.appendChild(personName);
 *
 *     const orgName = document.createElement("div");
 *     orgName.className = "org-name";
 *     this.appendChild(orgName);
 *   }
 *
 *   // Track changes
 *
 *   attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
 *     switch (name) {
 *       // props are tracked:
 *       case "personName":
 *       case "orgName":
 *         this.getElementsByClassName(name)[0]!.innerText = newValue || "-";
 *         break;
 *
 *        // Every other attribute is also tracked:
 *        case "data-some-attr":
 *          console.log(oldValue, newValue);
 *          break;
 *     }
 *   }
 *
 *   // Provide default tag for definition (optional, but recommended)
 *
 *   define(options?: WebComponentDefinitionOptions) {
 *     super.define({ ...options, tag: options.tag || "business-card" });
 *   }
 * }
 *
 * // Define a custom element
 *
 * BusinessCard.define();
 * ```
 *
 * ### Using web components
 *
 * Let's instantiate and mount a `BusinessCard` web component that we've created:
 *
 * ```ts
 * // Create a web component instance:
 *
 * const card = new BusinessCard();
 * // or:
 * const card = document.createElement("business-card");
 *
 * // Add component to the DOM:
 *
 * document.getElementById("card")!.appendChild(card);
 *
 * // Change properties:
 *
 * card.firstName = "John";
 * // or:
 * card.setAttribute("first-name", "John"); // Notice that attribute is in snake-case while property is in camelCase
 * ```
 *
 * ### Extending web components
 *
 * Let's create a `CoolBusinessCard` component by extending `BusinessCard` component:
 *
 * ```ts
 * class CoolBusinessCard extends BusinessCard implements CustomElement {
 *   // Define new properties. Inherited properties will be defined and copied to "props" automatically.
 *   // Note: it is impossible to redefine inherited properties because parent relies on their behavior.
 *
 *   static readonly props = [
 *     { name: "coolness", default: "120%" },
 *   ];
 *
 *   declare coolness: string;
 *
 *   // Provide default tag for definition
 *
 *   define(options: WebComponentDefinitionOptions = {}) {
 *     super.define({ ...options, tag: options.tag || "cool-business-card" });
 *   }
 * }
 * ```
 */
export class WebComponent extends HTMLElement implements CustomElement {
  /**
   * Doesn't do anything. All attributes are already observed. This property will be deleted when custom element
   * will be defined.
   *
   * This property is recognized for compatibility reasons only.
   */
  declare static observedAttributes?: string[];

  /**
   * Properties that will be synced with attributes.
   *
   * Properties must be in `camelCase`. Synchronized attributes will be in `kebab-case`.
   *
   * To not confuse cases, prefer single-word names.
   */
  static props: (string | WebComponentProp)[] = [];

  /**
   * Current component state. See {@link WebComponentState} for the details.
   */
  protected _state: WebComponentState = "uninitialized";

  /**
   * Initial property values.
   *
   * If element is created before it is defined, and user will set properties, these properties will be own properties
   * of the element. When element is upgraded, these properties are kept as own.
   * Children's constructors may override the base class's properties.`
   *
   * The initialization logic must re-apply user's values. To do so, we save them here in the constructor before they're
   * overridden.
   *
   * This property is deleted after initialization is complete.
   */
  private _initialValues?: Record<string, string> = {};

  /**
   * Called when:
   *
   * 1. Component has just finished initialization. Then:
   *
   *    1. {@link _state} property will be `attrs-first-change`.
   *    1. `oldValue` argument will be `null`.
   *    1. `newValue` will have a default value or `null`, if there's no default.
   *    1. Thus, following may be true: `oldValue === newValue && newValue === null`.
   *
   * 1. **Any** of the element's attributes has **actually** changed (unlike default custom elements' behavior where
   * this method is called even if the same value has been set). Then:
   *
   *    1. {@link _state} property will be `normal`.
   *    1. `oldValue` and `newValue` will be always different.
   */
  attributeChangedCallback?(...args: Parameters<NonNullable<CustomElement["attributeChangedCallback"]>>): void;

  // Initialization logic

  constructor() {
    super();
    let meta = this._getMeta();

    if (!meta) {
      this._ctor()._initClass();
      meta = this._getMeta();
    }

    for (const prop in meta.props) {
      if (!Object.hasOwn(this, prop)) {
        continue;
      }

      const value = this[prop as keyof this];

      if (typeof value === "string") {
        this._initialValues![prop] = value;
      }
    }

    queueMicrotask(this._init.bind(this));
  }

  /**
   * Initializes component state.
   *
   * Custom elements may not add attributes or children in a constructor, so separate initialization is required.
   * Thus, this method is called whenever an attribute is accessed or in a microtask after component's constructor
   * has run.
   *
   * Initialization is performed only once.
   */
  protected _init() {
    if (this._state !== "uninitialized") {
      return;
    }

    this._state = "initialization";
    const { props, attrs } = this._getMeta();

    // An instance might be created and manipulated before a component has been defined, and the element
    // is upgraded.
    //
    // That instance will skip our synchronization logic because no setters would have been called.
    //
    // Will use this hack (which is ~10x more performant than Object.defineProperty()) to call setters:
    // https://nolanlawson.com/2021/08/03/handling-properties-in-custom-element-upgrades/#:~:text=It%20feels%20like%20it%20should,set%20mode%20)%20will%20be%20invoked.

    for (const name in props) {
      // Delete own property, so prototype's property will be used instead
      delete (this as any)[name];

      // This calls setter defined in prototype instead of setting own property
      (this as any)[name] =
        this._initialValues![name] ?? super.getAttribute(camelCaseToKebabCase(name)) ?? props[name]!.default;
    }

    delete this._initialValues; // Free memory

    // Track first attributes' "change"

    this._state = "attrs-first-change";

    if (this.attributeChangedCallback) {
      const call = (name: string) => this.attributeChangedCallback!(name, null, this.getAttribute(name));

      for (const name in attrs) {
        call(name);
      }

      for (const { name } of this.attributes) {
        if (!(name in attrs)) {
          call(name);
        }
      }
    }

    this._state = "normal";
  }

  /**
   * Called when the element is added to a document.
   *
   * If overridden, `super.connectedCallback()` must be the first statement.
   */
  connectedCallback(): void {
    this._init();
  }

  // Make attribute getter return default value

  getAttribute(name: string): string | null {
    this._init();
    return super.getAttribute(name) ?? this._getMeta().attrs[name]?.default ?? null;
  }

  // Make all attributes setters track changes through a common setter

  setAttribute(name: string, value: string): void {
    this._setAttr(name, value);
  }

  removeAttribute(name: string): void {
    this._setAttr(name, null);
  }

  toggleAttribute(name: string, force?: boolean): boolean {
    this._setAttr(name, force || typeof this.getAttribute(name) === "string" ? null : "");
    return !!this.getAttribute(name); // attributeChangedCallback() may change attribute value, so call getter
  }

  /**
   * A common attribute setter called by attributes manipulation methods (`setAttribute`, `removeAttribute`, etc)
   * and property setters
   *
   * @param name Attribute name
   * @param value Attribute value
   */
  private _setAttr(name: string, value: string | null): void {
    this._init();

    const cfg = this._getMeta().attrs[name];
    const propsInitialized = this._state !== "initialization";

    const prev = this.getAttribute(name);
    value ??= cfg?.default ?? null;

    // Values are equal when initializing attributes but we should still reset them
    if (
      propsInitialized &&
      // @ts-expect-error
      !(this as BaseWebComponent)._isFirstObserverCall &&
      value === prev
    ) {
      return;
    }

    // FIXME: Somehow switch to setAttr()
    if (typeof value === "string") {
      super.setAttribute.call(this, name, value);
    } else {
      super.removeAttribute.call(this, name);
    }

    if (propsInitialized && this.attributeChangedCallback) {
      this.attributeChangedCallback(name, prev, value);
    }
  }

  // Rest of the logic

  /**
   * Returns a constructor of this class
   *
   * If you need to refer to your own class, type it like so:
   *
   * ```ts
   * class MyClass extends WebComponent {
   *   declare protected _ctor: () => typeof MyClass
   * }
   * ```
   *
   * @returns constructor of this class
   */
  protected _ctor(): typeof WebComponent {
    return Object.getPrototypeOf(this).constructor;
  }

  /** @returns Current web component's metadata */
  private _getMeta() {
    // Meta is always initialized when calling from an instance.
    // If someone will decide to misuse web components and do something like:
    // WebComponent.prototype.getAttribute.call(someObject, "attr")
    // well, that's on them.
    return componentsMeta.get(this._ctor())!;
  }

  /**
   * Defines a custom element for this web component.
   *
   * Won't throw an error if called multiple times with the same tag.
   *
   * Will throw an error (unless suppressed via {@link BasicWebComponentDefinitionOptions.noRedefinitionError})
   * if defined under a different tag.
   *
   * @param options Definition options
   */
  static define(options: BasicWebComponentDefinitionOptions) {
    const { tag, registry = customElements, noRedefinitionError } = options;

    // Don't define again, if the same element is already defined under the same tag.
    // Otherwise, let browser throw an error (unless ignored via options).

    if (registry.get(tag) === this) {
      return;
    }

    if (noRedefinitionError && registryToComponents.get(registry)?.has(this)) {
      return;
    }

    this._initClass();
    registry.define(tag, this);
  }

  /** Initializes class itself. Called by {@link define} and by the constructor. Initialization happens only once. */
  protected static _initClass() {
    if (componentsMeta.has(this)) {
      return;
    }

    // Copy parent props

    this.props = Object.getPrototypeOf(this).props.concat(this.props);

    // Register and synchronize properties with attributes, i.e. make properties just get and set attributes

    const meta: WebComponentMeta = { props: {}, attrs: {} };
    componentsMeta.set(this, meta);

    for (const userCfg of this.props) {
      // Resolve config

      const { name: nameInCamelCase, ...cfg } = typeof userCfg === "string" ? { name: userCfg } : userCfg;

      if (meta.props[nameInCamelCase]) {
        continue; // Ignore duplicate definitions to prevent potential side-effects
      }

      const nameInKebabCase = camelCaseToKebabCase(nameInCamelCase);

      // Register property

      meta.props[nameInCamelCase] = cfg;
      meta.attrs[nameInKebabCase] = cfg;

      // Define getter and setter

      Object.defineProperty(this.prototype, nameInCamelCase, {
        get(this: WebComponent) {
          return this.getAttribute(nameInKebabCase) ?? cfg.default;
        },

        set(this: WebComponent, value: string | null | undefined) {
          this._setAttr(nameInKebabCase, value ?? null);
        },
      });
    }
  }
}

// Patch properties and methods that access attributes to call initialization logic beforehand

const proto = WebComponent.prototype;

// Properties

const propsToPatchWithInit = ["innerHTML", "innerText", "outerHTML", "attributes"] satisfies (keyof HTMLElement)[];

for (const prop of propsToPatchWithInit) {
  const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, prop);

  if (!descriptor) {
    continue;
  }

  if (!descriptor.get && !descriptor.set) {
    continue; // Probably not a good idea to patch this because there's no way to get initial value
  }

  const newDescriptor: PropertyDescriptor = {};

  if (descriptor.get) {
    newDescriptor.get = function (this: WebComponent) {
      this._init();
      return descriptor.get!.call(this);
    };
  }

  if (descriptor.set) {
    newDescriptor.set = function (this: WebComponent, v) {
      this._init();
      descriptor.set!.call(this, v);
    };
  }

  Object.defineProperty(proto, prop, newDescriptor);
}

// Methods

const methodsToPatchWithInit = ["hasAttribute", "hasAttributes", "getAttributeNames"] satisfies (keyof HTMLElement)[];

for (const method of methodsToPatchWithInit) {
  const orig: (...args: any[]) => any = proto[method];

  proto[method] = function (this: WebComponent, ...args: any[]) {
    this._init();
    return orig.call(this, ...args);
  };
}

// Patch registry

const origDefine = CustomElementRegistry.prototype.define;

CustomElementRegistry.prototype.define = function (
  this: CustomElementRegistry,
  name,
  ctor: typeof WebComponent,
  ...rest
) {
  const orig = () => origDefine.call(this, name, ctor, ...rest);

  if (!(ctor.prototype instanceof WebComponent)) {
    return orig();
  }

  // Track registered components

  if (!registryToComponents.has(this)) {
    registryToComponents.set(this, new Set());
  }

  registryToComponents.get(this)!.add(ctor);

  // Silently delete observedAttributes to opt out of default observer behavior
  delete ctor.observedAttributes;

  return orig();
};
