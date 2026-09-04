import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/faxyu729-/',
  plugins: [react(), tailwindcss()],
  optimizeDeps: { entries: ['index.html'] },
})
