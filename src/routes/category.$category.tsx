import { Link, createFileRoute } from '@tanstack/react-router'

import { allEntries } from 'content-collections'

const TYPE_LABELS: Record<string, { label: string; icon: string; badgeClass: string; accentColor: string }> = {
  'game-files': { label: 'Game Files', icon: '🎮', badgeClass: 'badge-game', accentColor: 'var(--tekken-red)' },
  'movies': { label: 'Movies', icon: '🎬', badgeClass: 'badge-movie', accentColor: 'var(--tekken-gold)' },
  'extras': { label: 'Extras', icon: '📦', badgeClass: 'badge-extra', accentColor: '#7777cc' },
}

export const Route = createFileRoute('/category/$category')({
  component: CategoryPage,
  loader: async ({ params }) => {
    const category = params.category
    const entries = allEntries.filter(
      (e) => e.type === category || e.categories.some((c) => c.toLowerCase() === category.toLowerCase())
    )
    return { category, entries }
  },
})

function CategoryPage() {
  const { category, entries } = Route.useLoaderData()
  const meta = TYPE_LABELS[category] ?? { label: category, icon: '📁', badgeClass: '', accentColor: 'var(--tekken-text)' }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link to="/" className="text-sm no-underline mb-4 inline-block" style={{ color: 'var(--tekken-muted)' }}>
          ← Back to Archive
        </Link>
        <h1
          className="tekken-heading text-3xl font-bold flex items-center gap-2 mt-2"
          style={{ color: 'var(--tekken-text)' }}
        >
          <span>{meta.icon}</span>
          <span>{meta.label}</span>
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--tekken-muted)' }}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </p>
      </div>

      {entries.length === 0 ? (
        <p style={{ color: 'var(--tekken-muted)' }}>No entries found in this category.</p>
      ) : (
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
                  <h2 className="font-bold text-base leading-snug" style={{ color: 'var(--tekken-text)' }}>
                    {entry.title}
                  </h2>
                  {entry.categories[0] && (
                    <span className={`${meta.badgeClass} text-xs px-2 py-0.5 rounded-full shrink-0 font-medium`}>
                      {entry.categories[0]}
                    </span>
                  )}
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--tekken-muted)' }}>
                  {entry.summary}
                </p>
                <div
                  className="flex flex-wrap gap-3 text-xs"
                  style={{
                    color: 'var(--tekken-muted)',
                    borderTop: '1px solid var(--tekken-border)',
                    paddingTop: '0.75rem',
                  }}
                >
                  {entry.platform && <span>📀 {entry.platform}</span>}
                  {entry.fileSize && <span>💾 {entry.fileSize}</span>}
                  {entry.format && <span>📄 {entry.format}</span>}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
