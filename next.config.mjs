/**
 * The site ships as a fully static export.
 *
 * GitHub Pages serves it from a repository subpath, a vserver serves it from
 * the domain root. Both are just a different base, so switching is an env var
 * rather than a code change:
 *
 *     DEPLOY=root npm run build
 *
 * The flag is the word "root" and not the path "/" on purpose: Git Bash on
 * Windows rewrites a bare "/" argument into a Windows directory, so a path here
 * silently produces a build with asset URLs like /Program Files/Git/.
 */
const basePath = process.env.DEPLOY === 'root' ? '' : '/marcs-fahrschule'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages cannot run a Node server: `next build` has to emit plain
  // files. Produces out/ with one HTML document per route.
  output: 'export',

  basePath,

  // Next prefixes its own bundles, CSS and font chunks with basePath, but it
  // does NOT rewrite path strings that appear inside JS or JSX - so every
  // reference to something in public/ ("/images/...", the favicon, the logo
  // video) would 404 under the subpath. src/lib/base-path.js is the single
  // place that prepends it, and it reads the value from here so the two can
  // never drift apart. NEXT_PUBLIC_ so it is inlined into the client bundle.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },

  // Nothing uses next/image (the responsive <picture> markup is hand-rolled in
  // src/components/ResponsiveImage.jsx against the manifest that
  // scripts/optimize-images.mjs writes), but a static export refuses to build
  // if the default loader is ever reintroduced by accident.
  images: {
    unoptimized: true
  },

  // next dev otherwise writes an AGENTS.md and a CLAUDE.md into the repository
  // root and keeps re-adding them. Nothing here needs them, and an untracked
  // file that reappears on every dev run is only noise in git status.
  agentRules: false,

  // Dev only. The contact endpoint is served by the Express app in server.js
  // (npm run server / npm run dev:full) on port 3001; in production it is a
  // separate deployment behind the reverse proxy in deploy/nginx.conf, which is
  // why the form posts to a same-origin /api/contact in both cases.
  //
  // basePath: false because the fetch goes to /api/contact, not to
  // /marcs-fahrschule/api/contact.
  //
  // The dev server honours rewrites; `next build` with output: 'export' cannot,
  // and warns about it. Hence the guard: the production build has no rules that
  // could never run, and the warning is confined to dev, where the rule works.
  ...(process.env.NODE_ENV === 'development'
    ? {
        // Landing on bare localhost:3000 would otherwise 404, because dev
        // serves the site under the same subpath GitHub Pages does. Forward
        // to the start page instead of leaving a dead root.
        async redirects() {
          return basePath
            ? [
                {
                  source: '/',
                  destination: basePath,
                  basePath: false,
                  permanent: false
                }
              ]
            : []
        },

        async rewrites() {
          return [
            {
              source: '/api/:path*',
              destination: 'http://localhost:3001/api/:path*',
              basePath: false
            }
          ]
        }
      }
    : {})
}

export default nextConfig
