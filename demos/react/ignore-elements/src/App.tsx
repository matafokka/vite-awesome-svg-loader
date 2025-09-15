import imageSrc from "@/assets/ignore-elements.svg";
import originalImageSrc from "@/assets/ignore-elements-original.svg";
import { Fragment, useState } from "react";
import { SvgImage } from "vite-awesome-svg-loader/react-integration";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "demo-checkbox": any;
    }
  }
}

export default function App() {
  const [isOriginalShown, setIsOriginalShown] = useState(false);

  return (
    <Fragment>
      <demo-checkbox
        label="Show original image"
        checked={isOriginalShown}
        onchange={(e: any) => setIsOriginalShown(e.checked)}
      />

      <div
        className="images"
        style={{ color: "red", marginTop: "24px" }}
      >
        <SvgImage
          src={isOriginalShown ? originalImageSrc : imageSrc}
          className="standalone-image"
        />
      </div>
    </Fragment>
  );
}
