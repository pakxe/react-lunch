import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    base: isDevelopment ? '/' : '/react-lunch/',
    plugins: [react()],
  };
});
