# Integration utility functions

This package exports two important functions:

1. `onSrcUpdate()` - should be called when component is mounted, and its SVG source code is updated.
1. `onUnmount()` - should be called when component is unmounted.

These functions will run only on client side. However, they won't break SSR.

And this package exposes following constants:

1. `SVG_ID` - ID of an SVG element that contains all symbols.
1. `SYMBOL_ID_PREFIX` - this string prepended to the symbol ID.
1. `USAGES_COUNT_ATTR` - symbol attribute that contains count of elements that uses that symbol.

See usage example in `packages/vue-integration` directory.