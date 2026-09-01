import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from a repository subpath, a vserver serves it
  // from the domain root. Both are just a different base, so switching is an
  // env var rather than a code change:
  //
  //     VITE_DEPLOY=root npm run build
  //
  // The flag is the word "root" and not the path "/" on purpose: Git Bash on
  // Windows rewrites a bare "/" argument into a Windows directory, so a path
  // here silently produces a build with asset URLs like /Program Files/Git/.
  //
  // src/App.jsx reads the result back via import.meta.env.BASE_URL, so the
  // router's basename can never drift out of sync with the asset paths.
  base: process.env.VITE_DEPLOY === 'root' ? '/' : '/marcs-fahrschule/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})