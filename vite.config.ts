import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const PROJECT_ROOT = import.meta.dirname

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(PROJECT_ROOT, 'client', 'src'),
      '@components': path.resolve(PROJECT_ROOT, 'client', 'src', 'components'),
      '@pages': path.resolve(PROJECT_ROOT, 'client', 'src', 'pages'),
      '@stores': path.resolve(PROJECT_ROOT, 'client', 'src', 'stores'),
      '@services': path.resolve(PROJECT_ROOT, 'client', 'src', 'services'),
      '@types': path.resolve(PROJECT_ROOT, 'client', 'src', 'types'),
      '@utils': path.resolve(PROJECT_ROOT, 'client', 'src', 'utils'),
      '@layouts': path.resolve(PROJECT_ROOT, 'client', 'src', 'layouts'),
    },
  },
  envDir: PROJECT_ROOT,
  root: path.resolve(PROJECT_ROOT, 'client'),
  build: {
    outDir: path.resolve(PROJECT_ROOT, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    fs: {
      strict: true,
      deny: ['**/.*'],
    },
  },
})
