import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        detail: resolve(__dirname, 'detail.html'),
      },
    },
  },
  base: '/mucha-muses/',
})