import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Diario Bíblico',
        short_name: 'DiarioBíblico',
        description: 'Diario de notas bíblicas con calendario y soporte offline.',
        theme_color: '#0ea5e9',
        background_color: "#0b1220",
        display: 'standalone',
        start_url: '/',
        icons: [
          { "src": "pwa-192x192.png", "sizes": "192x192", "type": "image/png" },
          { "src": "pwa-512x512.png", "sizes": "512x512", "type": "image/png" },
          { "src": "pwa-maskable-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
        ]
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({url}) => url.pathname.startsWith('/'),
            handler: 'NetworkFirst',
            options: { cacheName: 'app-pages' }
          }
        ]
      }
    })
  ]
})
