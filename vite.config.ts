import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Argonomist_Garden/',
  plugins: [react()],
   server: {
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/, ''),
      },
    },
    watch: {
      ignored: ['**/db.json'],
    },
  },
})

