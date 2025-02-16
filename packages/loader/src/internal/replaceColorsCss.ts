import * as csstree from "css-tree";
import { XastChild } from "svgo/lib/types";
import { COLOR_ATTRS_TO_REPLACE, IGNORE_COLORS } from "./const";
import { matchesSelector, replaceColor } from "./misc";
import { ResolvedColorReplacements } from "./types";

export function replaceColorsCss(
  css: any,
  replacements: ResolvedColorReplacements,
  nodesWithOrigColors: XastChild[],
  isInline = false,
) {
  if (!css || typeof css !== "string") {
    return "";
  }

  let context = "stylesheet";

  if (isInline) {
    css = `{${css}}`;
    context = "block";
  }

  // For original colors preservation
  const shouldPreserveColors = !isInline && nodesWithOrigColors.length;
  let origColorSelectors: string[] = [];
  let currentColorSelectors: string[] = [];
  let didSplitSelectors = false;

  const ast = csstree.parse(css, { context });

  csstree.walk(ast, {
    // Ignore because of broken types in csstree:
    // @ts-ignore
    visit: shouldPreserveColors ? undefined : "Declaration",

    enter: function (node) {
      // Skip rules with original colors
      if ((node as any).__SKIP_SVG_LOADER__ || (this.rule as any)?.__SKIP_SVG_LOADER__) {
        return;
      }

      // If need to preserve colors
      if (shouldPreserveColors) {
        // Reset lists if it's new rule
        if (node.type === "SelectorList") {
          origColorSelectors = [];
          currentColorSelectors = [];
          didSplitSelectors = false;
          return;
        }

        // Classify selectors
        if (node.type === "Selector") {
          const selector = csstree.generate(node);
          let isOrigColor = false;

          for (const svgNode of nodesWithOrigColors) {
            if (matchesSelector(svgNode, selector)) {
              isOrigColor = true;
              (node as any).__ORIG_COLOR__ = true;
              break;
            }
          }

          (isOrigColor ? origColorSelectors : currentColorSelectors).push(selector);
          return;
        }
      }

      // Check if there's a declaration with a color, and if this color should be replaced

      if (node.type !== "Declaration" || !COLOR_ATTRS_TO_REPLACE[node.property]) {
        return;
      }

      // @ts-ignore
      const identifier = node.value?.children?.first;
      const color = identifier?.value || identifier?.name;

      if (!color || IGNORE_COLORS[color]) {
        return;
      }

      // Create new rule with original colors and remove such selectors from the current rule.
      // We'll replace color in the current rule.

      if (shouldPreserveColors && !didSplitSelectors && this.rule?.prelude.type === "SelectorList") {
        // Split selectors and create a new rule

        const origColorsRule = csstree.clone(this.rule) as csstree.Rule;
        (origColorsRule as any).__SKIP_SVG_LOADER__ = true;
        const origColorsSelectors = new csstree.List<csstree.CssNode>();
        const selectors = this.rule.prelude.children;

        selectors.forEach((node, listItem) => {
          if ((node as any).__ORIG_COLOR__) {
            selectors.remove(listItem);
            origColorsSelectors.push(node);
          }
        });

        (origColorsRule.prelude as csstree.SelectorList).children = origColorsSelectors;

        // Parent can be either at-rule or stylesheet
        const parent = this.atrule?.block?.children || this.stylesheet?.children;

        // Find current rule in parent. FFS, why there's no indices?
        let insertBefore: csstree.ListItem<csstree.CssNode> | undefined;

        parent?.some((rule, listItem) => {
          if (rule === this.rule) {
            insertBefore = listItem;
            return true;
          }

          return false;
        });

        insertBefore ? parent?.insertData(origColorsRule, insertBefore) : parent?.push(origColorsRule);
        didSplitSelectors = true;
      }

      // Replace color

      node.value = csstree.parse(replaceColor(csstree.generate(node.value), replacements), {
        context: "value",
      }) as csstree.Value;
    } satisfies csstree.EnterOrLeaveFn,
  });

  return csstree.generate(ast);
}
