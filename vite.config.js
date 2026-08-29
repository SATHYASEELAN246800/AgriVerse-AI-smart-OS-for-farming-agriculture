import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Load environment variables
const API_BACKEND = process.env.VITE_API_BACKEND || 'http://localhost:8000'
const API_OLLAMA = process.env.VITE_API_OLLAMA || 'http://localhost:11434'
const PORT = parseInt(process.env.VITE_PORT || '3000')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: PORT,
    host: true,
    proxy: {
      '/api/ollama': {
        target: API_OLLAMA,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ollama/, '')
      },
      '/api/backend': {
        target: API_BACKEND,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/backend/, '')
      },
      '/api': {
        target: API_BACKEND,
        changeOrigin: true
      }
    }
  }
})
