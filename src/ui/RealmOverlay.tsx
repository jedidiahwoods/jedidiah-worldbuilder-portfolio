import { Link } from 'react-router-dom'
import type { Realm } from '../data/projects'
import { realmTitle } from '../data/projects'

export function RealmOverlay({ realm }: { realm: Realm }) {
  const other = realm === 'physical' ? 'digital' : 'physical'

  return (
    <div className="overlay">
      <Link to="/" className="back-link">
        <span aria-hidden>←</span> Return to the cosmos
      </Link>
      <Link to={`/${other}`} className="realm-switch">
        {other === 'physical' ? 'The Physical →' : 'The Digital →'}
      </Link>

      <div className={`realm-chrome ${realm}`}>
        <div className="realm-kicker">{realm === 'physical' ? 'Realm I' : 'Realm II'}</div>
        <h2>{realmTitle(realm)}</h2>
        <div className="realm-hint">Pick a world</div>
      </div>
    </div>
  )
}
