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
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/main.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
      ],
      lines: 50,
      statements: 80,
      functions: 50,
      branches: 50,
    },
  },
} as UserConfig);
