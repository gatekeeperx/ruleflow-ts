# Contributing to Ruleflow TS

Thank you for your interest in contributing! This repository is a monorepo for the Ruleflow DSL.

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Packages

- `packages/dsl-core`: the publishable core package.
- `packages/dsl-tests`: golden tests for the core (private).
- `packages/next-demo`: Next.js demo app (private).

## Development Setup

```bash
npm install
npm run typecheck
npm run build
npm test
```

- Run the Next.js demo during development:

```bash
npm run dev:next
```

## Testing

Tests live in `packages/dsl-tests/` and use Vitest.

```bash
npm test           # runs tests with coverage
npm run test:coverage
```

Coverage output is written to `packages/dsl-tests/coverage/`.

## Commit Messages

Use clear and descriptive messages. Conventional commits are welcome but not required.

## Pull Requests

- Keep PRs focused and small when possible.
- Include tests for new features or bug fixes.
- Ensure `npm run typecheck` and `npm run build` pass locally.
- The CI must pass before merging.

## Releasing (maintainers)

Releases are published only for the core package:

```bash
npm run -w @ruleflow-ts/dsl-core release:patch
npm run -w @ruleflow-ts/dsl-core release:minor
npm run -w @ruleflow-ts/dsl-core release:major
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
