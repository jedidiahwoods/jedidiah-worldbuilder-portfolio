import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * "JEDIDIAH — WORLD BUILDER": front and center on load,
 * then flies up into the site banner as you travel the cosmos.
 * The letters carry a slow glare sweep and lean toward the cursor.
 */
export function Header() {
  const { pathname } = useLocation()
  const hero = pathname === '/'
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const strength = hero ? 1 : 0.3
    const cur = { x: 0, y: 0 }
    const tgt = { x: 0, y: 0 }
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tgt.x = (e.clientX / window.innerWidth) * 2 - 1
      tgt.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.05
      cur.y += (tgt.y - cur.y) * 0.05
      if (inner.current) {
        inner.current.style.transform =
          `perspective(760px) rotateY(${cur.x * 7 * strength}deg) rotateX(${-cur.y * 5 * strength}deg)` +
          ` translate(${cur.x * 12 * strength}px, ${cur.y * 7 * strength}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [hero])

  return (
    <Link to="/" className={`site-title ${hero ? 'hero' : 'banner'}`} aria-label="Jedidiah — World Builder, return home">
      <div className="title-inner" ref={inner}>
        <h1>JEDIDIAH</h1>
        <div className="title-rule" />
        <div className="subtitle">World Builder</div>
      </div>
    </Link>
  )
}
