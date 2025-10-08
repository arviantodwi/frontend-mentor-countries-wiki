import { coverageConfigDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// https://vitest.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: './src/vitest-setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        exclude: [
          ...coverageConfigDefaults.exclude,
          '**/__mocks__/**',
          './src/types/**',
          './src/main.tsx',
        ],
      },
    },
  }),
);
