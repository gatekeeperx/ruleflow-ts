# Ruleflow TS Monorepo

[![CI](https://github.com/gatekeeperx/ruleflow-ts/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/gatekeeperx/ruleflow-ts/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/gatekeeperx/ruleflow-ts/branch/master/graph/badge.svg)](https://codecov.io/gh/gatekeeperx/ruleflow-ts)

Monorepo for the Ruleflow DSL, including:

- `@ruleflow/dsl-core`: TypeScript interpreter for the Ruleflow DSL (Node / SSR / Edge-friendly).
- `@ruleflow/dsl-tests`: Golden tests for `@ruleflow/dsl-core` using Vitest.
- `@ruleflow/next-demo`: Next.js demo that consumes the core package and exposes an evaluator.

> Requirements: Node.js >= 18

## Getting Started

```bash
# from the repo root
npm install
npm run typecheck
npm run build
```

Useful scripts:

- `npm run build`: builds `@ruleflow/dsl-core`
- `npm run typecheck`: type-checks `@ruleflow/dsl-core`
- `npm test`: runs Vitest with coverage in `@ruleflow/dsl-tests`
- `npm run smoke`: runs a smoke test for `@ruleflow/dsl-core`
- `npm run dev:next`: starts the Next.js demo in dev mode

## Packages

- `packages/dsl-core/` – the core interpreter.
  - Entry points: `main`, `exports`, and `types` point to the built artifacts in `dist/`.
  - License: MIT
  - Publish config: public access
- `packages/dsl-tests/` – Vitest golden tests for the core.
  - Private package
  - Generates coverage reports (text, html, lcov) in `coverage/`
- `packages/next-demo/` – Next.js demo app.
  - Private package, not intended for npm publishing

## Testing & Coverage

```bash
npm test
# coverage artifacts will be written to packages/dsl-tests/coverage
```

CI (GitHub Actions) installs deps, type-checks, builds the core, runs tests with coverage, uploads coverage artifacts, runs the smoke test, and builds the Next.js demo.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Security

Please see [SECURITY.md](./SECURITY.md) for our vulnerability disclosure policy.

## Publishing

Only `@ruleflow/dsl-core` is meant for publication to npm.

- License: MIT
- `files`: includes `dist/`, `README.md`, and `LICENSE`
- `publishConfig.access`: `public`

Run a dry run:

```bash
npm run -w @ruleflow/dsl-core pack:dry
```

Release helpers:

```bash
npm run -w @ruleflow/dsl-core release:patch
npm run -w @ruleflow/dsl-core release:minor
npm run -w @ruleflow/dsl-core release:major
```

## License

MIT
