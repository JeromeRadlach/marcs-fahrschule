/**
 * Decorative background: aurora gradients in brand colours, an asphalt grid
 * and a fine grain. Ported from the Next.js rebuild.
 *
 * Two performance decisions that are deliberate here:
 *
 * 1. NO `filter: blur()` on the auroras. The keyframes contain `scale`, and a
 *    scaled blur layer has to be re-rasterised per frame - at 70vmax plus
 *    blur spread that is several megapixels of Gaussian per frame, on every
 *    page. The radial gradient is soft anyway; the extra colour stops replace
 *    the blur visually.
 *
 * 2. NO `mix-blend-mode` on the grain. A blend layer over the whole viewport
 *    forces the compositor to render everything below into a buffer and read
 *    it back - the aurora transforms then lose the compositor thread and
 *    compete with React on the main thread.
 */
function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 'var(--z-backdrop)' }}
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% -10%, var(--color-ink-850) 0%, var(--color-ink-1000) 60%)'
        }}
      />

      {/* Aurora 1 — neon orange (brand glow) */}
      <div
        className="bg-aurora absolute -top-1/4 left-[-15%] h-[70vmax] w-[70vmax] opacity-45"
        style={{
          background:
            'radial-gradient(circle, rgba(255,107,0,0.50) 0%, rgba(255,107,0,0.30) 26%, rgba(255,107,0,0.10) 50%, rgba(255,107,0,0) 74%)',
          animation: 'aurora-a 26s var(--ease) infinite'
        }}
      />

      {/* Aurora 2 — violet/cyan (banner imagery) */}
      <div
        className="bg-aurora absolute right-[-20%] top-[10%] h-[62vmax] w-[62vmax] opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(168,85,247,0.22) 24%, rgba(34,211,238,0.14) 46%, rgba(34,211,238,0) 72%)',
          animation: 'aurora-b 32s var(--ease) infinite'
        }}
      />

      {/* Aurora 3 — amber (photo light); hidden on mobile, where the blob
          would sit mostly off screen anyway. */}
      <div
        className="bg-aurora bg-aurora--c absolute bottom-[-25%] left-[25%] h-[55vmax] w-[55vmax] opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(255,105,0,0.45) 0%, rgba(255,105,0,0.20) 30%, rgba(255,105,0,0) 72%)',
          animation: 'aurora-c 38s var(--ease) infinite'
        }}
      />

      {/* Asphalt grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(115% 80% at 50% 0%, #000 0%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(115% 80% at 50% 0%, #000 0%, transparent 72%)'
        }}
      />

      {/* Grain — without blend mode, see comment above */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 45%, transparent 45%, rgba(5,5,8,0.75) 100%)'
        }}
      />
    </div>
  )
}

export default Backdrop
