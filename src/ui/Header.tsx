import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LETTERS = 'JEDIDIAH'.split('')

/**
 * "JEDIDIAH — WORLD BUILDER" as glowing wire text: stroked letterforms
 * with electric sparks running along the outlines. Draws itself on in
 * stroke on first load, grows slightly on hover, and docks into the
 * banner while navigating. Static and centered otherwise.
 */
export function Header() {
  const { pathname } = useLocation()
  const hero = pathname === '/'
  // play the draw-on intro only when the site loads on the hero
  const intro = useRef(pathname === '/').current

  return (
    <Link
      to="/"
      className={`site-title ${hero ? 'hero' : 'banner'}${intro ? ' intro' : ''}`}
      aria-label="Jedidiah — World Builder, return home"
    >
      <div className="title-inner">
        <div className="title-stack">
          <h1>JEDIDIAH</h1>
          <svg className="title-wire" aria-hidden="true">
            <text className="wire-base" x="50%" y="52%">
              {LETTERS.map((letter, i) => (
                <tspan
                  key={i}
                  style={intro ? { animationDelay: `${0.08 + i * 0.07}s` } : undefined}
                >
                  {letter}
                </tspan>
              ))}
            </text>
            <text className="wire-spark" x="50%" y="52%">
              JEDIDIAH
            </text>
          </svg>
        </div>
        <div className="title-rule" />
        <div className="subtitle">World Builder</div>
      </div>
    </Link>
  )
}
