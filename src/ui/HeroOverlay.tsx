import { Link } from 'react-router-dom'

export function HeroOverlay() {
  return (
    <div className="overlay">
      <p className="hero-tagline">
        Worlds are not found. They are built — in matter and in light.
        Choose a realm to explore what has been made.
      </p>

      <nav className="realm-gates" aria-label="Realms">
        <Link to="/physical" className="realm-gate physical">
          <div className="gate-kicker">Realm I</div>
          <div className="gate-name">The Physical</div>
          <div className="gate-desc">
            Objects forged in the material world — games, gear, and a studio that makes things real.
          </div>
        </Link>
        <Link to="/digital" className="realm-gate digital">
          <div className="gate-kicker">Realm II</div>
          <div className="gate-name">The Digital</div>
          <div className="gate-desc">
            Systems built from light and logic — apps and tools that live in the network.
          </div>
        </Link>
      </nav>

      <div className="cosmos-footer">jedidiah.ai · est. in the cosmos</div>
    </div>
  )
}
