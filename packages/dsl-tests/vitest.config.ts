import path from 'node:path';
import { defineConfig } from 'vitest/config';

// Rutas absolutas y globs POSIX para los fuentes de dsl-core
const DSL_CORE_SRC = path.resolve(__dirname, '../dsl-core/src');
const DSL_CORE_SRC_NODE = path.resolve(__dirname, 'node_modules/@ruleflow/dsl-core/src');
const toPosix = (p: string) => p.split(path.sep).join('/');
const DSL_CORE_GLOB = `${toPosix(DSL_CORE_SRC)}/**/*.{ts,tsx,js}`;
const DSL_CORE_NODE_GLOB = `${toPosix(DSL_CORE_SRC_NODE)}/**/*.{ts,tsx,js}`;

export default defineConfig({
    test: {
        environment: 'node',
        reporters: ['default'],
        includeSource: [DSL_CORE_GLOB, DSL_CORE_NODE_GLOB],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov', 'json-summary'],
            reportsDirectory: 'coverage',
            all: true,
            allowExternal: true,
            include: [DSL_CORE_GLOB, DSL_CORE_NODE_GLOB],
            exclude: []
        },
        deps: {
            optimizer: {
                ssr: {
                    exclude: ['@ruleflow/dsl-core'],
                }
            }
        }
    },
    resolve: {
        alias: {
            '@ruleflow/dsl-core': path.resolve(__dirname, '../dsl-core/src/index.ts')
        }
    },
    server: {
        fs: {
            allow: [path.resolve(__dirname, '../dsl-core')]
        }
    },
    ssr: {
        noExternal: ['@ruleflow/dsl-core']
    }
});
