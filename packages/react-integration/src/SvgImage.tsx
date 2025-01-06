import { useEffect, useRef, useState, type SVGAttributes } from "react";
import { SvgImageProps as SvgImagePropsRaw } from "types";
import { onSrcUpdate as onSrcUpdateRaw, onUnmount } from "integration-utils";

export interface SvgImageProps extends SVGAttributes<SVGElement>, SvgImagePropsRaw {}

export function SvgImage({ src, useElAttrs, ...attrs }: SvgImageProps) {
  const actualId = useRef(""); // Actual ID for cleanup on unmount
  const prevSrc = useRef("");

  const [id, setId] = useState(actualId.current);
  const [svgAttrs, setSvgAttrs] = useState<React.SVGAttributes<SVGElement>>({});

  const onSrcUpdate = () => {
    const res = onSrcUpdateRaw(prevSrc.current, src);

    if (res.id) {
      setId(res.id);
      actualId.current = res.id;
    }

    if (res.attrs) {
      setSvgAttrs(res.attrs);
    }

    prevSrc.current = src;
  };

  useEffect(() => {
    onSrcUpdate(); // When component is "mounted"

    // When component is "unmounted"
    return () => {
      onUnmount(actualId.current);

      // onSrcUpdateRaw() checks if current src is equal to previous and doesn't do anything if source didn't change.
      // It would be fine if this useEffect() hack ran on actual unmount. However! When dev setup+cleanup cycle
      // is running, previous component instance is used, and prevSrc is not being cleared. This results in images
      // disappearing in dev mode. So we have to reset this ref manually. Why, React, why?! Just add actual damn hooks
      // like Vue did!
      prevSrc.current = "";
    };
  }, []);

  useEffect(onSrcUpdate, [src]); // When src is updated

  return (
    <svg {...{ alt: "", ...attrs, ...svgAttrs }}>
      <use {...{ ...useElAttrs, href: "#" + id }} />
    </svg>
  );
}
