import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite rewrites import.meta.url back to the original config path when bundling
// the config, so this stays pointed at the project root on Vercel too.
const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const indexHtml = path.resolve(projectRoot, 'index.html')

if (!fs.existsSync(indexHtml)) {
  const listing = fs.readdirSync(projectRoot).join(', ')
  throw new Error(
    `Vite entry not found at ${indexHtml}. Project root contains: ${listing}`,
  )
}

// https://vite.dev/config/
export default defineConfig({
  root: projectRoot,
  plugins: [
    react(),
    {
      // Vite 8 / rolldown can leave open handles on Vercel after a successful build.
      name: 'vercel-exit-after-build',
      apply: 'build',
      closeBundle() {
        if (process.env.VERCEL) {
          setTimeout(() => process.exit(0), 0)
        }
      },
    },
  ],
  build: {
    outDir: path.resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    rolldownOptions: {
      input: indexHtml,
    },
  },
})
