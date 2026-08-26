import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LETTERS = 'JEDIDIAH'.split('')

/**
 * "JEDIDIAH — WORLD BUILDER": on first load the name draws itself in
 * stroke like a snake, then the solid glare-swept letters take over.
 * Front and center on the hero, docks into the banner while navigating.
 * Leans toward the cursor.
 */
export function Header() {
  const { pathname } = useLocation()
  const hero = pathname === '/'
  // play the draw-on intro only when the site loads on the hero
  const intro = useRef(pathname === '/').current
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
      cur.x += (tgt.x - cur.x) * 0.14
      cur.y += (tgt.y - cur.y) * 0.14
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
    <Link
      to="/"
      className={`site-title ${hero ? 'hero' : 'banner'}${intro ? ' intro' : ''}`}
      aria-label="Jedidiah — World Builder, return home"
    >
      <div className="title-inner" ref={inner}>
        <div className="title-stack">
          <h1>JEDIDIAH</h1>
          {intro && (
            <svg className="title-draw" aria-hidden="true">
              <text x="50%" y="52%">
                {LETTERS.map((letter, i) => (
                  <tspan key={i} style={{ animationDelay: `${0.08 + i * 0.07}s` }}>
                    {letter}
                  </tspan>
                ))}
              </text>
            </svg>
          )}
        </div>
        <div className="title-rule" />
        <div className="subtitle">World Builder</div>
      </div>
    </Link>
  )
}
