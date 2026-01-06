# Documentation website

## Basics

The documentation is built with [Astro Starlight](https://starlight.astro.build/).

**File structure:**

- `src` - source code.
   - `assets` - static assets.
   - `components` - custom Astro and vanilla JS components.
   - `content` - content-related files.
      - `default-demo-descriptions` - default demos descriptions imported in each demo page.
      - `docs` - website pages. Naming follows Starlight conventions.
      - `demos` - demos import globs
      - `styles` - website styles.
   - `utils` - various utilities.

The website renders demos directly into the docs pages.

## Build process

The docs website depends on `all-demos` package which is meta-package for all demos.

The `package.json` file of `all-demos` package is generated before any command is executed.
This is required for Turborepo to build the demos before building the docs website.

Demos themselves are built in [Vite library mode](https://vite.dev/guide/build.html#library-mode) and rebuilt whenever
a change occurs. This avoids the necessity for running multiple Vite servers (one for each demo).

## Caveats

### Starlight doesn't add base path to the absolute links

In the Markdown, this is solved by prepending a base path via a `remark-rehype` handler.

The default Starlight components should be wrapped to prepend a base path to the links.

Custom components should account for this behavior too.
