import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import react from '@vitejs/plugin-react'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexHtmlPath = path.join(projectRoot, 'index.html')

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/mahdi-profile.png" />
    <link rel="apple-touch-icon" href="/mahdi-profile.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Mahdi Esmaeelnezhad — Frontend / Full-Stack Developer. React, Vue.js, TypeScript, Node.js, Blazor. Based in Mashhad, Iran."
    />
    <meta property="og:title" content="Mahdi Esmaeelnezhad — Frontend / Full-Stack Developer" />
    <meta
      property="og:description"
      content="5+ years building web applications across education, logistics, retail, and tourism. React · Vue · TypeScript · Node.js · Blazor."
    />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <title>Mahdi Esmaeelnezhad — Frontend / Full-Stack Developer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

process.chdir(projectRoot)

console.log('[build] cwd:', process.cwd())
console.log('[build] projectRoot:', projectRoot)
console.log('[build] files:', fs.readdirSync(projectRoot).join(', '))
console.log('[build] src exists:', fs.existsSync(path.join(projectRoot, 'src')))
console.log('[build] main.tsx exists:', fs.existsSync(path.join(projectRoot, 'src/main.tsx')))

if (!fs.existsSync(indexHtmlPath)) {
  console.warn('[build] index.html missing — writing fallback entry')
  fs.writeFileSync(indexHtmlPath, INDEX_HTML, 'utf8')
}

if (!fs.existsSync(path.join(projectRoot, 'src/main.tsx'))) {
  throw new Error(
    `src/main.tsx is missing from ${projectRoot}. Files: ${fs.readdirSync(projectRoot).join(', ')}`,
  )
}

await build({
  configFile: false,
  root: projectRoot,
  plugins: [react()],
  build: {
    outDir: path.join(projectRoot, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: indexHtmlPath,
    },
  },
})

console.log('[build] done')
