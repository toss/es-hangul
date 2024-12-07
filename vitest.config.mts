import path from 'path';
import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    name: packageJson.name,
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['json-summary', 'text'],
      include: ['src/**/*'],
    },
  },
});
