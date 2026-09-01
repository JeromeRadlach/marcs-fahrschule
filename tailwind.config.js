export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF6B00',
        'primary-dark': '#E55E00',
        'dark-gray': '#111827',
        'gray-dark': '#1f2937',
      },
      fontFamily: {
        'sans': ['Barlow', 'system-ui', 'sans-serif'],
        'display': ['Oswald', 'Barlow', 'system-ui', 'sans-serif'],
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