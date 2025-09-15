import imageSrc from "@/assets/ignore-elements.svg";
import originalImageSrc from "@/assets/ignore-elements-original.svg";
import { Fragment, useState } from "react";
import { SvgImage } from "vite-awesome-svg-loader/react-integration";

const Checkbox = "demo-checkbox" as keyof JSX.IntrinsicElements;

export default function App() {
  const [isOriginalShown, setIsOriginalShown] = useState(false);

  return (
    <Fragment>
      <Checkbox
        label="Show original image"
        checked={isOriginalShown}
        onChange={(e: any) => setIsOriginalShown(e.checked)}
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
