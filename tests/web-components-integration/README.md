# Tests for vite-awesome-svg-loader/web-components-integration package

This test suite uses Cypress framework and follows its conventions.

## Technical requirements

1. Because (almost) standard HTML elements are being tested, assertions must run synchronously.
1. Use Chai assertions for web components and avoid Cypress assertions.
1. Use Cypress assertions for testing integration with the frameworks.

## Pitfalls

### Shared browser context

Cypress reuses the same iframe when switching between tests in a single file.

This breaks most of the lifecycle tests because it is not possible to clear `customElements`, and tests require a fresh
browser context.

To solve this issue, context-dependent tests are split into separate files for which Cypress does create a new iframe.

This solution has proved to be not that cumbersome. Still, a proper fix would be welcome.
