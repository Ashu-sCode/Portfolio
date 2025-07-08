import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: 'brotliCompress', // or 'gzip'
      ext: '.br',                  // optional: '.gz' for gzip
      deleteOriginFile: false      // keeps the original files too
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  }
})
