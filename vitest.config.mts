import { defineConfig } from 'vitest/config';
import packageJson from './package.json';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    name: packageJson.name,
    dir: './src',
    globals: true,
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*'],
    },
  },
});
