import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        reporters: ['default'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: 'coverage',
            // Include coverage for external files (outside this workspace root)
            allowExternal: true,
            // Compute coverage for included files even if not imported in tests
            all: true,
            // Include both direct sibling path and the symlinked node_modules path
            include: [
                '../dsl-core/dist/**/*.js',
                'node_modules/@ruleflow/dsl-core/dist/**/*.js'
            ],
            // Do not exclude node_modules so the symlinked package is measured
            exclude: []
        },
        deps: {
            inline: [/@ruleflow\/dsl-core/]
        }
    }
});
