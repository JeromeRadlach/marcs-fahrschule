export default {
  // Everything lives under src/ - the App Router in src/app, the page bodies in
  // src/views, and the shared components. index.html is gone with Vite; the
  // document is now src/app/layout.jsx and is covered by the same glob.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neon brand orange. `primary-dark` keeps its old name so existing
        // hover:bg-primary-dark utilities still resolve.
        'primary': '#ff6b00',
        'primary-dark': '#e55e00',
        'primary-light': '#ff8a3d',
        // Dark text for use on the full-strength primary: white on the brand
        // orange fails WCAG AA at 16px; the dark ink passes comfortably.
        'on-primary': '#12121c',
        // Ink scale. `dark-gray` is the page ground, `gray-dark` the solid
        // surface used where translucency won't do (inputs, lightbox).
        'dark-gray': '#050508',
        'gray-dark': '#12121c',
        'ink': {
          1000: '#050508',
          950: '#08080d',
          900: '#0d0d15',
          850: '#12121c',
          800: '#191926',
          700: '#232333',
        },
      },
      fontFamily: {
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'DM Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      // Motion tokens, mirroring src/lib/motion.js. Exposed as Tailwind scales
      // so one-off transitions in markup use the same numbers as the shared
      // component classes rather than inventing new ones.
      transitionDuration: {
        'instant': '120ms',
        'fast': '200ms',
        'base': '320ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
}
