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

## Build process

This website renders demos directly into the docs pages. Dependencies in `package.json` are built when
`npm run built` is ran. It is not required for the `dev` mode because imports are handled by globs.
Demos themselves are built in [Vite library mode](https://vite.dev/guide/build.html#library-mode) and rebuilt whenever
a change occurs.

This pattern avoids necessity for the running multiple web servers.
