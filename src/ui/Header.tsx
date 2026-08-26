import { Link, useLocation } from 'react-router-dom'

/**
 * "JEDIDIAH — WORLD BUILDER": front and center on load,
 * then flies up into the site banner as you travel the cosmos.
 */
export function Header() {
  const { pathname } = useLocation()
  const hero = pathname === '/'

  return (
    <Link to="/" className={`site-title ${hero ? 'hero' : 'banner'}`} aria-label="Jedidiah — World Builder, return home">
      <h1>JEDIDIAH</h1>
      <div className="title-rule" />
      <div className="subtitle">World Builder</div>
    </Link>
  )
}
