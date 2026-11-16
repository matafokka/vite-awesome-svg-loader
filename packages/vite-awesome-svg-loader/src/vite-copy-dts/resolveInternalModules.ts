import * as ts from "typescript";
import { INTERNAL_PACKAGES } from "../generated/cfg";
import { defineImportExportReplacer } from "./defineImportExportReplacer";

export interface ResolveInternalModuleOptions {
  /** A path appended to the import/export specifiers. Specifiers start with package name. */
  basePath: string;

  /**
   * Called whenever a package has been resolved
   * @param pkg Package name
   */
  onPkgResolved?: (pkg: string) => void;
}

/** Resolves and replaces import/export specifiers */
export function resolveInternalModules(options: ResolveInternalModuleOptions): ts.TransformerFactory<ts.Node> {
  return defineImportExportReplacer((specifier) => {
    const pkg = INTERNAL_PACKAGES.find((pkg) => specifier.startsWith(pkg))?.split("/")[0];

    if (!pkg) {
      return;
    }

    options.onPkgResolved?.(pkg);
    return `${options.basePath}/${pkg}/index.d.ts`;
  });
}
