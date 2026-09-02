import '../index.css'
import { asset } from '@/lib/base-path'
import SiteShell from './site-shell'

// Everything that used to live in index.html's <head>.
//
// Security headers are set by the web server, not here - see deploy/nginx.conf.
// They used to be four <meta http-equiv> tags, none of which did anything:
// X-Frame-Options and X-Content-Type-Options are honoured only as HTTP response
// headers and are discarded when they appear in markup; the Permissions-Policy
// meta form was proposed but never shipped in any browser; and Referrer-Policy
// is only read from <meta name="referrer">, not from http-equiv.
//
// The title here is the site-wide default. Pages that set their own metadata
// replace it outright - there is deliberately no template, because the page
// titles already spell out "- Marc's Fahrschule Essen" in full.
//
// icons goes through asset(): Next applies basePath to its own build output but
// uses metadata URLs verbatim, so a bare "/favicon.svg" would resolve against
// the GitHub Pages domain root rather than the project subpath.
export const metadata = {
  metadataBase: new URL('https://JeromeRadlach.github.io/marcs-fahrschule/'),
  title: "Marc's Fahrschule Essen - Führerschein A, B, BE, AM",
  description:
    "Marc's Fahrschule in Essen - Professionelles Fahrtraining für alle Klassen. Jetzt Termin vereinbaren!",
  icons: {
    icon: [{ url: asset('/favicon.svg'), type: 'image/svg+xml' }]
  }
}

// viewport-fit=cover so the bottom-anchored navigation bar can reach into the
// home indicator area; the bar adds the safe-area inset back as padding.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#050508'
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
