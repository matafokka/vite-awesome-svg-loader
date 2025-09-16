import imageSrc, { prefix as imagePrefix } from "@/assets/targeting-demo.svg";
import { Fragment, MouseEventHandler, useMemo } from "react";

const leftElementClass = imagePrefix + "left-element";
const rightElementClass = imagePrefix + "right-element";

function createColorGetter(colors: string[]) {
  let index = 0;

  return () => {
    index++;

    if (index === colors.length) {
      index = 0;
    }

    return colors[index];
  };
}

export default function App() {
  const getLeftElementColor = useMemo(() => createColorGetter(["#ffd6d6", "#e8ffd6", "#d6efff"]), []);
  const getRightElementColor = useMemo(() => createColorGetter(["#f3d6ff", "#ffffd6", "#dad6ff"]), []);

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof SVGElement)) {
      return;
    }

    if (e.target.classList.contains(leftElementClass)) {
      e.target.style.fill = getLeftElementColor();
    } else if (e.target.classList.contains(rightElementClass)) {
      e.target.style.fill = getRightElementColor();
    }
  };

  return (
    <Fragment>
      <p className="demo-section-caption">Click on the rectangles to change their colors:</p>

      <div className="images">
        <div
          dangerouslySetInnerHTML={{ __html: imageSrc }}
          onClick={onClick}
          className="standalone-image"
        />
      </div>
    </Fragment>
  );
}
