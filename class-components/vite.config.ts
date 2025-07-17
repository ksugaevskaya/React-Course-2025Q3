import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React-Course-2025Q3/class-components/',
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov'],
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,

      threshold: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
} as UserConfig);
