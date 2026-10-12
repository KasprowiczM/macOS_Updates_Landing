import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    chunkSizeWarningLimit: 450,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Match by package directory, not substring: "react" also appears in
          // lucide-react, react-i18next and @remotion/*. Remotion is left
          // unassigned so it stays in the lazily loaded wall display chunk.
          const pkg = id.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/)?.[1]
          if (!pkg) return undefined
          if (['react', 'react-dom', 'scheduler', 'react-router', 'react-router-dom', 'react-helmet-async'].includes(pkg)) {
            return 'vendor-react'
          }
          if (['motion', 'framer-motion', 'motion-dom', 'motion-utils'].includes(pkg)) {
            return 'vendor-motion'
          }
          if (pkg === 'lucide-react') return 'vendor-icons'
          if (pkg === 'i18next' || pkg === 'react-i18next') return 'vendor-i18n'
          return undefined
        },
      },
    },
  },
})
