# Marc's Fahrschule

The website for Marc's Fahrschule in Essen. Next.js (App Router) exported as a
fully static site, plus a small Express service that takes the contact form.

## Getting started

```sh
npm install
npm run dev        # Next dev server, http://localhost:3000/marcs-fahrschule
npm run dev:full   # the same, plus the contact API on :3001
```

`npm run dev` alone is enough for everything except submitting the contact form:
that posts to `/api/contact`, which `next.config.mjs` proxies to the Express app
in development. Copy `.env.example` to `.env` before running the API.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run build` | Static export into `out/` |
| `npm run start` | Next production server (unused by the Pages deploy) |
| `npm run server` | The Express contact API on port 3001 |
| `npm run dev:full` | `server` and `dev` together |
| `npm run lint` | oxlint |
| `npm run images` | Regenerates `public/images/` and the manifest from `assets-src/` |

## Deployment

The site is a static export (`output: 'export'` in `next.config.mjs`), so
`npm run build` writes plain HTML into `out/` and no Node server is needed to
serve it. `.github/workflows/` publishes `out/` to GitHub Pages on every push to
`main`.

GitHub Pages serves the site from a repository subpath
(`https://JeromeRadlach.github.io/marcs-fahrschule/`), so the build sets
`basePath: '/marcs-fahrschule'`. Building for a domain root instead:

```sh
DEPLOY=root npm run build
```

Next prefixes its own bundles and stylesheets with the base path, but it does
**not** rewrite path strings written in JSX - so anything served out of
`public/` has to go through `asset()` from `src/lib/base-path.js`, which reads
the same value out of `next.config.mjs`. Writing `/images/...` by hand will 404
on GitHub Pages.

The contact API (`server.js`, `api/`, `lib/`, `deploy/nginx.conf`) is deployed
separately; see `deploy/nginx.conf` for the reverse proxy that puts it back on
the same origin as the site.

## Layout

```
src/app/          App Router: layout, per-route page.jsx with its Metadata
src/views/        the page bodies each route renders
src/components/   shared UI
src/data/         vehicle, team and FAQ content
src/lib/          image manifest helpers, base path, motion tokens
src/index.css     design tokens, Tailwind layers and component classes
public/           images, favicon, robots.txt, sitemap.xml
```
