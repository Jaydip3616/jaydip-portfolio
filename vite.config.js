import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` must match the GitHub repository name so asset URLs resolve
// correctly when served from https://<user>.github.io/jaydip-portfolio/
export default defineConfig({
  base: '/jaydip-portfolio/',
  plugins: [react()],
})
