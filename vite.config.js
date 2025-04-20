// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/kspace/',  // 👈 this must match your GitHub repo name
  plugins: [vue()]
})
