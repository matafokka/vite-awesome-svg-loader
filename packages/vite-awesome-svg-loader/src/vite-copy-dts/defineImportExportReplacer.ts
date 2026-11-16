import * as ts from "typescript";

export function defineImportExportReplacer(
  replacer: (specifier: string) => string | void,
): ts.TransformerFactory<ts.Node> {
  const newLiteral = (node: ts.Node | undefined) => {
    if (!node || !ts.isStringLiteral(node)) {
      return;
    }

    const replacement = replacer(node.text);

    if (replacement) {
      return ts.factory.createStringLiteral(replacement);
    }
  };

  return (context) => {
    const visit: ts.Visitor<ts.Node, ts.Node> = (node) => {
      const next = () => ts.visitEachChild(node, visit, context);

      // import … from "…"
      if (ts.isImportDeclaration(node)) {
        const replacement = newLiteral(node.moduleSpecifier);

        if (!replacement) {
          return next();
        }

        return ts.factory.updateImportDeclaration(
          node,
          node.modifiers,
          node.importClause,
          replacement,
          node.attributes,
        );
      }

      // export … from "…"
      if (ts.isExportDeclaration(node)) {
        const replacement = newLiteral(node.moduleSpecifier);

        if (!replacement) {
          return next();
        }

        return ts.factory.updateExportDeclaration(
          node,
          node.modifiers,
          node.isTypeOnly,
          node.exportClause,
          replacement,
          node.attributes,
        );
      }

      // `typeof import("…")` / `import("…")` type references
      if (ts.isImportTypeNode(node)) {
        if (!node.argument || !ts.isLiteralTypeNode(node.argument) || !ts.isLiteralExpression(node.argument.literal)) {
          return next();
        }

        const replacement = replacer(node.argument.literal.text);

        if (!replacement) {
          return next();
        }

        return ts.factory.updateImportTypeNode(
          node,
          ts.factory.updateLiteralTypeNode(node.argument, ts.factory.createStringLiteral(replacement)),
          node.attributes,
          node.qualifier,
          node.typeArguments,
          node.isTypeOf,
        );
      }

      return next();
    };

    return (rootNode) => ts.visitNode(rootNode, visit);
  };
}
