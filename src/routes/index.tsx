import { Link, createFileRoute } from '@tanstack/react-router'

import { allEntries } from 'content-collections'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const SECTIONS = [
  {
    type: 'game-files' as const,
    label: 'Game Files',
    icon: '🎮',
    description: 'ROM images, ISOs, and arcade dumps from across the Tekken franchise history.',
    accentColor: 'var(--tekken-red)',
    badgeClass: 'badge-game',
  },
  {
    type: 'movies' as const,
    label: 'Movies',
    icon: '🎬',
    description: 'Animated OVAs, CGI films, and live-action adaptations of the Tekken universe.',
    accentColor: 'var(--tekken-gold)',
    badgeClass: 'badge-movie',
  },
  {
    type: 'extras' as const,
    label: 'Extras',
    icon: '📦',
    description: 'Soundtracks, art books, merchandise scans, and other franchise collectibles.',
    accentColor: '#7777cc',
    badgeClass: 'badge-extra',
  },
]

function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1
          className="text-5xl font-black tracking-widest mb-3"
          style={{
            background: 'linear-gradient(90deg, var(--tekken-red-bright), var(--tekken-gold-bright))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          TEKKEN ARCHIVE
        </h1>
        <p className="text-lg" style={{ color: 'var(--tekken-muted)' }}>
          The definitive preservation archive for the Tekken franchise
        </p>
        <hr className="tekken-divider" style={{ maxWidth: '400px', margin: '1.5rem auto' }} />
        <div className="flex justify-center gap-6 text-sm" style={{ color: 'var(--tekken-muted)' }}>
          <span>
            <strong style={{ color: 'var(--tekken-text)' }}>{allEntries.filter(e => e.type === 'game-files').length}</strong> Game Files
          </span>
          <span>
            <strong style={{ color: 'var(--tekken-text)' }}>{allEntries.filter(e => e.type === 'movies').length}</strong> Movies
          </span>
          <span>
            <strong style={{ color: 'var(--tekken-text)' }}>{allEntries.filter(e => e.type === 'extras').length}</strong> Extras
          </span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-14">
        {SECTIONS.map((section) => {
          const entries = allEntries.filter((e) => e.type === section.type)
          return (
            <section key={section.type}>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2
                    className="tekken-heading text-2xl font-bold flex items-center gap-2"
                    style={{ color: 'var(--tekken-text)' }}
                  >
                    <span>{section.icon}</span>
                    <span>{section.label}</span>
                  </h2>
                  <p className="mt-2 text-sm" style={{ color: 'var(--tekken-muted)' }}>
                    {section.description}
                  </p>
                </div>
                <Link
                  to="/category/$category"
                  params={{ category: section.type }}
                  className="text-sm font-medium no-underline px-3 py-1.5 rounded"
                  style={{
                    color: section.accentColor,
                    border: `1px solid ${section.accentColor}33`,
                    backgroundColor: `${section.accentColor}11`,
                  }}
                >
                  View all →
                </Link>
              </div>

              {/* Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <Link
                    to="/posts/$slug"
                    params={{ slug: entry.slug }}
                    key={entry._meta.path}
                    className="no-underline block"
                  >
                    <article
                      className="tekken-card rounded-lg p-5 h-full"
                      style={{
                        backgroundColor: 'var(--tekken-surface)',
                        border: '1px solid var(--tekken-border)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-bold text-base leading-snug" style={{ color: 'var(--tekken-text)' }}>
                          {entry.title}
                        </h3>
                        {entry.categories[0] && (
                          <span
                            className={`${section.badgeClass} text-xs px-2 py-0.5 rounded-full shrink-0 font-medium`}
                          >
                            {entry.categories[0]}
                          </span>
                        )}
                      </div>
                      <p className="text-sm mb-4" style={{ color: 'var(--tekken-muted)' }}>
                        {entry.summary}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs" style={{ color: 'var(--tekken-muted)', borderTop: '1px solid var(--tekken-border)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                        {entry.platform && <span>📀 {entry.platform}</span>}
                        {entry.fileSize && <span>💾 {entry.fileSize}</span>}
                        {entry.format && <span>📄 {entry.format}</span>}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
