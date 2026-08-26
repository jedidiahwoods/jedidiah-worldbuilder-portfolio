import { Link } from 'react-router-dom'

export function HeroOverlay() {
  return (
    <div className="overlay">
      <p className="hero-tagline">
        Worlds are not found. They are built — in matter and in light.
        Choose a realm to explore what has been made.
      </p>

      <nav aria-label="Realms">
        <Link to="/physical" className="realm-half physical">
          <div className="half-label">
            <div className="half-kicker">Realm I</div>
            <div className="half-name">The Physical</div>
            <div className="half-desc">
              Objects forged in the material world — games, gear, and a studio that makes things real.
            </div>
            <div className="half-enter">Enter →</div>
          </div>
        </Link>
        <Link to="/digital" className="realm-half digital">
          <div className="half-label">
            <div className="half-kicker">Realm II</div>
            <div className="half-name">The Digital</div>
            <div className="half-desc">
              Systems built from light and logic — apps and tools that live in the network.
            </div>
            <div className="half-enter">← Enter</div>
          </div>
        </Link>
      </nav>

      <div className="cosmos-footer">Established in the Cosmos</div>
    </div>
  )
}
