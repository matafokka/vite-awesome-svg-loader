import { useEffect, useState } from "react";
import { SvgIcon, type SvgIconProps } from "vite-awesome-svg-loader/react-integration";

export interface NamedIconProps extends Omit<SvgIconProps, "src"> {
  name: string;
}

// See: https://vitejs.dev/guide/features#glob-import
// I wasn't able to use dynamic imports for this
const icons: any = import.meta.glob("/src/assets/import-demo/icons/*.svg", {
  // Put URL here or setup your imports via vite-awesome-svg-loader configuration
  as: "preserve-line-width&set-current-color",
});

// Provide a fallback while loading.
// If you don't want a fallback, create an async factory and use top-level await in your main script.
const loadingFallback = `
<svg viewBox="0 0 60 20" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="10" style="font: 12px sans-serif;">Loading</text>
</svg>
`;

export function NamedIcon({ name, ...iconProps }: NamedIconProps) {
  const [src, setSrc] = useState(loadingFallback); // SVG source code

  const onNameChange = async (name: string) => {
    // Fetch SVG source code.
    // This may throw an error because icon might not be found, or user has been disconnected.
    // You may need to handle this case, for example, don't show an image.
    // Also, while loading, you may want to use some kind of animation.
    const code = (await icons[`/src/assets/import-demo/icons/${name}.svg`]()).default;

    // Verify that name hasn't changed. If it did, set its source code. Otherwise other onNameChange()
    // call will handle the changes.
    if (name === name) {
      setSrc(code);
    }
  };

  // Fetch new icon whenever name changes
  useEffect(() => {
    onNameChange(name);
  }, [name]);

  // Fetch initial icon
  onNameChange(name);

  return (
    <SvgIcon
      {...iconProps}
      src={src}
    />
  );
}
