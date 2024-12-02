import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 2100,
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: blob: https:;
        connect-src 'self' 
          https://gchkskdblqyfzzahqkjc.supabase.co 
          https://*.supabase.co 
          https://*.supabase.net 
          wss://*.supabase.co;
        frame-src 'self';
        font-src 'self';
        worker-src 'self' blob:;
      `.replace(/\s+/g, ' ').trim()
    }
  },
})
