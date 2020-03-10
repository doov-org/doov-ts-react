# dOOv-TS-React

React renderer for doov-TS rules.

![Node.js CI](https://github.com/doov-io/doov-ts-react/workflows/Node.js%20CI/badge.svg)

## Local Development

### `yarn watch`

Runs the project in development/watch mode. Your project will be rebuilt upon changes, only in ES Module.

### `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

### `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

### `yarn prettier`

Runs the code formatter Prettier

## Continuous Integration

### Github Actions

Runs `yarn test-ci` which executes all tests, checks for code coverage, formatting errors and linting.

## Release

### `yarn version`

Set the new version according to the release with`--major` `--minor`, `--patch` or `--new -version`

### `yarn publish`

Publish to npm registry
