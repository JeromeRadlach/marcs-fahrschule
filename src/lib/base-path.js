// The one place that knows where the site is mounted.
//
// Next rewrites the URLs of its own build output for basePath, but it does not
// touch path strings written in JS or JSX. Anything served from public/ - the
// responsive photos, the logo, the animated logo video, the favicon - therefore
// has to be prefixed by hand, or it 404s on GitHub Pages where the site lives
// under /marcs-fahrschule/.
//
// The value comes from next.config.mjs via env, so the prefix used by the
// markup and the prefix Next uses for its own assets are literally the same
// string. Next inlines NEXT_PUBLIC_ variables at build time, so this works in
// client components and during the static prerender alike.
//
// An empty base (DEPLOY=root) leaves the variable undefined rather than empty,
// hence the fallback.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

// asset('/images/logo.png') -> '/marcs-fahrschule/images/logo.png'
//
// Leading slashes are normalised so call sites can pass either form and never
// produce a double slash.
export function asset(path) {
  return `${BASE_PATH}/${String(path).replace(/^\/+/, '')}`
}
