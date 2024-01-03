# Architecture

This project uses [Turborepo](https://turbo.build/) to separate loader, integrations and demos into their own packages, and build whole project into a single bundle.

## Project structure

- `apps` - demos and, possibly, other applications that are being deployed to the GitHub Pages and not being exposed in the final bundle.
  - `*-demo` - specific framework demo project.
  - `build-demos` - builds all demos into one package for deployment.
- `packages` - loader itself and integrations
  - `integration-utils` - utility functions and constants for integrations. Bundled with the loader to allow users to write their own integrations. [More info](packages/integration-utils/README.md).
  - `loader` - loader source code.
  - `ui` - common scripts and styles for the demos. They're not important for the demonstration purposes hence separated from them.
  - `types` - types for the integrations
  - `*-integration` - specific framework integration.
  - `vite-awesome-svg-loader` - final loader bundle. All demos should use this package to make demos have same source code as would final user, and to make tests closer to the final result.
- `modules.d.ts` - types for untyped external modules.

## Demos

All images, markup and styles needed for the demo should be duplicated in all demos. The demos are not only for testing but for presenting to the loader's users. As such, locales or common string dicts are not used.

Sure, it adds a layer of complexity. Sure, common strings can be interpolated, and demo projects can be generated. But this approach will add a far greater complexity than the current solution.

## Scripts

1. `build` - builds whole project.
1. `build:packages` - builds all packages. Use this while developing to speed up the build.
1. `build:apps` - builds all apps.
1. `build:*` - builds a specific demo. For example, `build:vue` will build only Vue demo. Use this while developing to speed up the build.
1. `dev` - executes `dev` command for all demos.
1. `dev:*` - executes `dev` command for a specific demo. For example, `dev:vue` will run only Vue demo.
1. `lint` - lints the code with ESLint.
1. `format` - formats the code with Prettier.

## Bundle structure

Every project (both in `apps` and `packages` directories) should be bundled into `dist` directory inside project's root. For example, `vue-demo` bundle is in `apps/vue-demo/dist` directory.

`apps` should have `dist/index.html` file.

`packages` should have following files inside `dist` directory:

1. `index.js` - CJS bundle.
1. `index.mjs` - EMS bundle.
1. `index.d.ts` - types.
1. `index.js.map`, `index.mjs.map` - source maps, applicable only if project will be used by the end user.

## TypeScript and JavaScript

The primary language for this project is TypeScript. TypeScript should be used while developing loader itself, integrations and demos.

However, build scripts are written in JS to simplify development and speed up the build. Typing is not critical for these scripts. Thus, TypeScript is just not worth it.

## Dependencies

Dependencies that are used by more than one project should be installed for the whole project, i.e. added to the root `package.json`.

Such dependencies include Vite, TypeScript, Vue, React, Solid, etc.

Local dependencies should be installed in package or app where they're required.

`vite-awesome-svg-loader` final bundle dependencies always should be in `packages/vite-awesome-svg-loader/package.json` file even if they're duplicated in the root `package.json`.

## Code style

Prettier should be used to format the code. Styles that are left for the user to decide are handled by ESLint rules.

This project tries to keep the source code clean and readable. Please, try to do so as well, i.e. don't stack `if`s too many times, don't use bit shifts unnecessarily, etc.

# Integrations development

**Warning**: do NOT use `vanilla-integration` package do develop custom integrations. Use `integration-utils` package and your framework's capabilities instead.

1. Create an issue to notify the community that you'll be working on your integration.
1. Create integration and demo packages using `npx turbo generate workspace` command.
1. Develop integration:
   1. Open `package.json` file inside your integration directory.
   1. Add `"integration-utils": "*"` dependency.
   1. Develop your integration. Use `integration-utils` to simplify the development. [More info](packages/integration-utils/README.md).
1. Update `vite-awesome-svg-loader` package with your integration:
   1. Open `packages/vite-awesome-svg-loader/package.json`.
   1. Add your integration to the `exports` and `typesVersions["*"]` fields. Basically copy already existing entry and change directory name. Unfortunately, we can't point to another `package.json` and shouldn't dynamically create a package.
1. Develop a demo for your integration:
   1. Open `package.json` file in your integration demo directory.
   1. Add following dependencies (don't forget to add your integration as well):
      ```json
      "dependencies": {
        "vite-awesome-svg-loader": "*",
        "ui": "*"
      }
      ```
    1. Run `npm build:packages` command to build integrations.
    1. Copy assets, markup and styles from any existing demo. Make sure that there's two directories with the images: `import-demo` and `config-demo`. Path to these directories should follow framework's guidelines.
    1. Implement your demo.
1. Add `build:*` and `dev:*` commands for your integration demo to the root `package.json`.
1. Submit a PR with your integration.

# Loader development

1. Create an issue to notify the community that you'll be working on your feature.
1. Develop your feature.
1. Add JSDoc to the feature's interface.
1. Add feature description to the README.md.
1. Update all existing demos to showcase your feature.
1. Build demos and test your feature.
1. Submit a PR.
