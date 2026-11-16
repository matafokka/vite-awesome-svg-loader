import { defineImportExportReplacer } from "./defineImportExportReplacer";

const TARGET_EXT = ".js";
const TO_REPLACE = [".m.", "."].flatMap((p) => [p + "ts", p + "js"]).flatMap((ext) => [".d" + ext, ext]);

/** Adds correct import/export extensions to the bundled types */
export const addExtensions = defineImportExportReplacer((specifier: string) => {
  if (!specifier.startsWith(".") || specifier.endsWith(TARGET_EXT)) {
    return;
  }

  const ext = TO_REPLACE.find((ext) => specifier.endsWith(ext));

  if (!ext) {
    return specifier + TARGET_EXT;
  }

  return specifier.substring(0, specifier.length - ext.length) + TARGET_EXT;
});
