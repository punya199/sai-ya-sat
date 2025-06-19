import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  plugins: [
    react(),
    tailwindcss(),
    process.env.ANALYZE === 'true' &&
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
      }),
  ].filter(Boolean),
  build: {
    // Production optimizations
    minify: 'esbuild', // faster than terser
    cssCodeSplit: true,
    sourcemap: false,
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router', 'react-router-dom'],
          'antd-vendor': ['antd'],
          'utils-vendor': ['axios', 'lodash-es', 'uuid'],
        },
        // Optimize asset names
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd', 'axios', 'lodash-es'],
  },
})
