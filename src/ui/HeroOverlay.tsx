import { Link } from 'react-router-dom'

function Planet() {
  return (
    <span className="planet-wrap" aria-hidden="true">
      <span className="planet-glow" />
      <span className="planet">
        <span className="planet-surface" />
        <span className="planet-rim" />
      </span>
    </span>
  )
}

export function HeroOverlay() {
  return (
    <div className="overlay">
      <div className="hero-eclipse" aria-hidden="true" />

      <p className="hero-tagline">
        Worlds you can touch and worlds you can experience.
      </p>

      <nav aria-label="Realms">
        <Link to="/physical" className="realm-half physical">
          <Planet />
          <div className="half-label">
            <div className="half-name">The Physical</div>
            <div className="half-enter">Enter →</div>
          </div>
        </Link>
        <Link to="/digital" className="realm-half digital">
          <Planet />
          <div className="half-label">
            <div className="half-name">The Digital</div>
            <div className="half-enter">← Enter</div>
          </div>
        </Link>
      </nav>

      <div className="cosmos-footer">Established in the Cosmos</div>
    </div>
  )
}
