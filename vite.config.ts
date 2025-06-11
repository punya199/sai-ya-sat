import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  plugins: [react(), tailwindcss()],
})
