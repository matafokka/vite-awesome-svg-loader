import { isIterable } from "@/utils/typecheck";
import type { HTMLAttributes, HTMLTag } from "astro/types";

export function getClasses(props: Pick<HTMLAttributes<"div">, "class" | "class:list">) {
  const origList = props["class:list"] || "";
  const cls = props.class || "";

  let list: Record<string, any>;

  if (typeof origList === "string") {
    list = { [origList]: true };
  } else if (isIterable(origList)) {
    list = {};

    for (const className of origList) {
      list[className + ""] = true;
    }
  } else {
    list = { ...origList };
  }

  list[cls] = true;
  return list;
}
