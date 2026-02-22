import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'pwa-512.png'],

      // Web App Manifest
      manifest: {
        name: 'Scoutrix — Sports Scouting Platform',
        short_name: 'Scoutrix',
        description: 'Connecting athletes and recruiters across India through smart scouting technology.',
        theme_color: '#060e1e',
        background_color: '#060e1e',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-512.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      // Workbox service worker configuration
      workbox: {
        // Cache app shell routes for offline
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],  // don't cache API calls

        // Cache strategies for different asset types
        runtimeCaching: [
          {
            // Pages / HTML — network first, fall back to cache
            urlPattern: /^https?:\/\/localhost:5173\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }  // 1 day
            }
          },
          {
            // Images — cache first
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }  // 30 days
            }
          },
          {
            // Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' }
          },
          {
            // Google Fonts files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }  // 1 year
            }
          },
          {
            // ImageKit CDN assets
            urlPattern: /^https:\/\/ik\.imagekit\.io\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'imagekit-cache',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 7 }  // 7 days
            }
          }
        ]
      },

      // Dev options — show the service worker in development too
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
})
