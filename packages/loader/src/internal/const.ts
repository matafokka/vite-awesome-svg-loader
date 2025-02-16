import { ImportType } from "../types";

export const COLOR_ATTRS_TO_REPLACE: Record<string, true> = {
  "fill": true,
  "stroke": true,
  "stop-color": true,
};

export const IGNORE_COLORS: Record<string, true> = {
  none: true,
  transparent: true,
  currentColor: true,
};

export const IMPORT_TYPES: ImportType[] = ["url", "source", "source-data-uri", "base64", "base64-data-uri"];
