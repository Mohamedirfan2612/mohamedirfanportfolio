import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Allow phones and other devices on the same Wi-Fi network to load the
    // app and its imported video assets through the computer's LAN IP.
    host: '0.0.0.0',
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/*.mp4', '**/*.webm', '**/*.avi', '**/videos/**', '**/photo/**', '**/*.png', '**/*.jpg', '**/*.jpeg']
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
})
