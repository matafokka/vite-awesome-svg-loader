# vite-awesome-svg-loader

A Vite plugin that:

1. Can import SVGs as:
   1. Source code (default import type).
   1. URL to a static asset.
   1. Source code [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme).
   1. Source code base64.
   1. Source code base64 [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme).
1. Can preserve line width, i.e. make icons and line art have same line width when scaling.
1. Can replace colors with `currentColor` or a custom color via configuration (see `replaceColorsList` option).
1. Will automatically minimize your SVGs using [SVGO](https://github.com/svg/svgo).
1. Allows you to create SVG sprites using provided integrations.

`vite-awesome-svg-loader` is framework-agnostic.

However, to create SVG symbols, some boilerplate code in form of components is required. These components are provided
in the integrations.

All integrations are provided as ES modules in separate subpath imports
(for example, `vite-awesome-svg-loader/vue-integration`), so your app will contain only required code.

You can integrate `vite-awesome-svg-loader` with [any framework](https://matafokka.github.io/vite-awesome-svg-loader/other-frameworks/quick-start)
using `vite-awesome-svg-loader/integration-utils` package.

## Installation

```sh
npm i vite-awesome-svg-loader
```

## Docs

> The [docs website](https://matafokka.github.io/vite-awesome-svg-loader/) is the central knowledge base for `vite-awesome-svg-loader`.

### Loader

- [Home](https://matafokka.github.io/vite-awesome-svg-loader/)
- [Getting started](https://matafokka.github.io/vite-awesome-svg-loader/guides/getting-started/)
- [Configuration](https://matafokka.github.io/loader-api-reference/interfaces/svgloaderoptions/)

### Framework integrations, examples and demos

- [React](https://matafokka.github.io/vite-awesome-svg-loader/react/quick-start/)
- [Vue](https://matafokka.github.io/vite-awesome-svg-loader/vue/quick-start/)
- [Vanilla JS](https://matafokka.github.io/vite-awesome-svg-loader/vanilla-js/quick-start/)
- [Other frameworks](https://matafokka.github.io/vite-awesome-svg-loader/other-frameworks/quick-start/)