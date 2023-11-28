/**
 * Props of `<SvgImage>` component
 */
export interface SvgImageProps {
  /**
   * SVG image source code
   */
  src: string;

  /**
   * Attributes of `<use>` element
   */
  useElAttrs?: Record<string, any>;
}

/**
 * Props of `<SvgIcon>` component
 */
export interface SvgIconProps {

  /**
   * Svg source, i.e. result of `import "/my/icon.svg"`
   */
  src: string;

  /**
   * Icon size.
   *
   * Should be a valid CSS unit value or a variable, i.e. `10px`, `0.1em`, `var(--icon-size)`.
   *
   * If `undefined` is passed, size won't be changed.
   *
   * @default undefined
   */
  size?: string;

  /**
   * Icon color.
   *
   * Should be a valid CSS color value or a variable, i.e. `#ff0000`, `red`, `var(--icon-color)`.
   *
   * If `undefined` is passed, color won't be changed.
   *
   * @default undefined
   */
  color?: string;

  /**
   * Icon color transition. Should contain only timing and easing functions.
   *
   * For example, if you want to set `transition: color 0.3s ease-out;`, you should pass only `0.3s ease-out`.
   *
   * @default "0.3s linear"
   */
  colorTransition?: string;
}