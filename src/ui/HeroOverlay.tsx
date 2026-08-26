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
      <p className="hero-tagline">
        Half of what I make you can hold in your hands.
        The other half lives on a screen.
      </p>

      <nav aria-label="Realms">
        <Link to="/physical" className="realm-half physical">
          <Planet />
          <div className="half-label">
            <div className="half-kicker">Realm I</div>
            <div className="half-name">The Physical</div>
            <div className="half-desc">
              A board game, a travel backpack, a production company. Things that exist in the real world.
            </div>
            <div className="half-enter">Enter →</div>
          </div>
        </Link>
        <Link to="/digital" className="realm-half digital">
          <Planet />
          <div className="half-label">
            <div className="half-kicker">Realm II</div>
            <div className="half-name">The Digital</div>
            <div className="half-desc">
              A journal app, a bill splitter, a weekly budget. Software I built because I needed it.
            </div>
            <div className="half-enter">← Enter</div>
          </div>
        </Link>
      </nav>

      <div className="cosmos-footer">Established in the Cosmos</div>
    </div>
  )
}
