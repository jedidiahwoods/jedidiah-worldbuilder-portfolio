import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { projectBySlug, projects, realmAccent, realmTitle } from '../data/projects'

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src)

function MediaFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="media-frame">
      {isVideo(src) ? (
        <video src={src} autoPlay loop muted playsInline aria-label={alt} />
      ) : (
        <img src={src} alt={alt} loading="lazy" />
      )}
    </div>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const project = slug ? projectBySlug(slug) : undefined

  useEffect(() => {
    document.querySelector('.project-page')?.scrollTo(0, 0)
  }, [slug])

  if (!project) return <Navigate to="/" replace />

  const accent = realmAccent(project.realm)
  const idx = projects.indexOf(project)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  return (
    <div className="project-page">
      <Link to={`/${project.realm}`} className="back-link">
        <span aria-hidden>←</span> {realmTitle(project.realm)}
      </Link>

      <article className="project-inner">
        <div className="project-kicker" style={{ color: accent }}>
          <span className="dot" style={{ background: accent }} />
          {realmTitle(project.realm)} · {project.year}
        </div>

        <h1 className="project-name">{project.name}</h1>
        <p className="project-tagline">{project.tagline}</p>

        <div className="project-meta">
          <div className="meta-cell">
            <div className="meta-label">Status</div>
            <div className="meta-value" style={{ color: accent }}>{project.status}</div>
          </div>
          <div className="meta-cell">
            <div className="meta-label">Role</div>
            <div className="meta-value">{project.role}</div>
          </div>
          {project.stats
            .filter((s) => s.label.toLowerCase() !== 'status')
            .map((s) => (
              <div className="meta-cell" key={s.label}>
                <div className="meta-label">{s.label}</div>
                <div className="meta-value">{s.value}</div>
              </div>
            ))}
        </div>

        <MediaFrame src={project.cover} alt={`${project.name} — cover`} />

        <div className="project-body">
          <h2 className="project-section-title">About</h2>
          {project.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {project.gallery.length > 0 && (
          <>
            <h2 className="project-section-title">Artifacts</h2>
            <div className="gallery-grid">
              {project.gallery.map((src, i) => (
                <MediaFrame key={src} src={src} alt={`${project.name} — image ${i + 1}`} />
              ))}
            </div>
          </>
        )}

        <nav className="project-nav">
          <Link to={`/project/${prev.slug}`}>
            ← Previous
            <span className="nav-name">{prev.name}</span>
          </Link>
          <Link to={`/project/${next.slug}`} style={{ textAlign: 'right' }}>
            Next →
            <span className="nav-name">{next.name}</span>
          </Link>
        </nav>
      </article>
    </div>
  )
}
