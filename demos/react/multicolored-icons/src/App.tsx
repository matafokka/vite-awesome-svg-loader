import imageSrc from "@/assets/image.svg";
import { CSSProperties } from "react";
import { SvgImage } from "vite-awesome-svg-loader/react-integration";

export default function App() {
  return (
    <div className="images">
      <SvgImage
        src={imageSrc}
        className="image"
        style={
          {
            "--primary-color": "red",
            "--secondary-color": "green",
            "--tertiary-color": "blue",
          } as CSSProperties
        }
      />
      <SvgImage
        src={imageSrc}
        className="image"
        style={
          {
            "--primary-color": "magenta",
            "--secondary-color": "cyan",
            "--tertiary-color": "yellow",
          } as CSSProperties
        }
      />
    </div>
  );
}
