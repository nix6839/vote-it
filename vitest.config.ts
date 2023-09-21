import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const config = defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/vitest-setup.ts'],
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
  },
});

export default config;
