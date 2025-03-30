import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["localhost", "192.168.0.100", "0fa3-170-130-40-222.ngrok-free.app"],
  }
})
