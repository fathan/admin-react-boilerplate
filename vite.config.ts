import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5175
  },
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
});
