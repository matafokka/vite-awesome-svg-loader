import React, { useEffect, useState } from "react";
import { SvgImageProps as SvgImagePropsRaw } from "types";
import { onSrcUpdate as onSrcUpdateRaw, onUnmount as onUnmountRaw } from "integration-utils";

export interface SvgImageProps extends React.SVGAttributes<SVGElement>, SvgImagePropsRaw {}

export function SvgImage({ src, useElAttrs, ...attrs }: SvgImageProps) {
  let actualId = "";
  const [id, setId] = useState(actualId);
  const [svgAttrs, setSvgAttrs] = useState<React.SVGAttributes<SVGElement>>({});
  let prevSrc = "";

  const onSrcUpdate = () => {
    const res = onSrcUpdateRaw(prevSrc, src);

    if (res.id) {
      setId(res.id);
      actualId = res.id;
    }

    if (res.attrs) {
      setSvgAttrs(res.attrs);
    }

    prevSrc = src;
  };

  useEffect(onSrcUpdate, []); // When component is mounted
  useEffect(onSrcUpdate, [src]); // When src is updated

  // When component will be unmounted
  useEffect(() => {
    return () => onUnmountRaw(actualId);
  }, []);

  return (
    <svg {...{ alt: "", ...attrs, ...svgAttrs }}>
      <use {...{ ...useElAttrs, href: "#" + id }} />
    </svg>
  );
}
