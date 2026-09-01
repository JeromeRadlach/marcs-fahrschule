import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Resets scroll on navigation.
//
// Without this, following a link from halfway down the vehicle list drops you
// halfway down the next page, which reads as a broken link.
//
// useLayoutEffect rather than useEffect so the jump happens before the browser
// paints; with useEffect the old scroll position is briefly visible on the new
// page as a flash.
//
// behavior: 'instant' is required. html has scroll-behavior: smooth for anchor
// links, and without the explicit override this would smooth-scroll the page
// you are leaving, which is disorienting and races the route change.
//
// A hash in the URL is left alone so in-page anchors still work.
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // A smooth scroll that was still running when the route changed - started
    // by the back-to-top control, or by an in-page anchor - is not fully
    // abandoned by the jump above. Its remaining frames keep applying after
    // the navigation and drag the new page a little way back down; measured at
    // 13-15px when a nav link is clicked while back-to-top is still gliding.
    //
    // Re-asserting the position on the next couple of frames absorbs those
    // leftovers. The window is about 30ms, far too short for a deliberate
    // scroll by the reader to be undone by it.
    let frame = 0
    let raf = 0
    const reassert = () => {
      if (window.scrollY !== 0) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      if (++frame < 2) raf = requestAnimationFrame(reassert)
    }
    raf = requestAnimationFrame(reassert)

    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
