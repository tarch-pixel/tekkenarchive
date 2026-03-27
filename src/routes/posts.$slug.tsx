import { Link, createFileRoute } from '@tanstack/react-router'
import { marked } from 'marked'

import { allEntries } from 'content-collections'

const TYPE_META: Record<string, { label: string; route: string; badgeClass: string }> = {
  'game-files': { label: 'Game Files', route: '/category/game-files', badgeClass: 'badge-game' },
  'movies': { label: 'Movies', route: '/category/movies', badgeClass: 'badge-movie' },
  'extras': { label: 'Extras', route: '/category/extras', badgeClass: 'badge-extra' },
}

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const entry = allEntries.find((e) => e.slug === params.slug)
    if (!entry) throw new Error('Entry not found')
    return entry
  },
  component: EntryPage,
})

function EntryPage() {
  const entry = Route.useLoaderData()
  const meta = TYPE_META[entry.type] ?? { label: entry.type, route: '/', badgeClass: '' }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--tekken-muted)' }}>
        <Link to="/" className="no-underline hover:underline" style={{ color: 'var(--tekken-muted)' }}>
          Archive
        </Link>
        <span>/</span>
        <Link
          to="/category/$category"
          params={{ category: entry.type }}
          className="no-underline hover:underline"
          style={{ color: 'var(--tekken-muted)' }}
        >
          {meta.label}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--tekken-text)' }}>{entry.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <h1 className="text-3xl font-black" style={{ color: 'var(--tekken-text)' }}>
            {entry.title}
          </h1>
          <span className={`${meta.badgeClass} text-xs px-2 py-1 rounded-full font-medium self-start mt-1.5`}>
            {meta.label}
          </span>
        </div>
        <p className="text-base mb-6" style={{ color: 'var(--tekken-muted)' }}>
          {entry.summary}
        </p>

        {/* Metadata grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg p-4"
          style={{ backgroundColor: 'var(--tekken-surface)', border: '1px solid var(--tekken-border)' }}
        >
          {entry.platform && <MetaItem icon="📀" label="Platform" value={entry.platform} />}
          {entry.region && <MetaItem icon="🌍" label="Region" value={entry.region} />}
          {entry.fileSize && <MetaItem icon="💾" label="Size" value={entry.fileSize} />}
          {entry.format && <MetaItem icon="📄" label="Format" value={entry.format} />}
          {entry.date && <MetaItem icon="📅" label="Released" value={entry.date} />}
          {entry.categories.length > 0 && (
            <MetaItem icon="🏷️" label="Category" value={entry.categories.join(', ')} />
          )}
        </div>

        {/* Download button if URL provided */}
        {entry.downloadUrl && (
          <a
            href={entry.downloadUrl}
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded font-bold text-sm no-underline"
            style={{
              background: 'linear-gradient(135deg, var(--tekken-red), #8b0000)',
              color: '#fff',
            }}
          >
            ↓ Download
          </a>
        )}
      </header>

      <hr className="tekken-divider" />

      {/* Content */}
      <div
        className="prose-tekken"
        dangerouslySetInnerHTML={{ __html: marked(entry.content) }}
      />

      {/* Back link */}
      <div className="mt-12">
        <Link
          to="/category/$category"
          params={{ category: entry.type }}
          className="text-sm no-underline"
          style={{ color: 'var(--tekken-muted)' }}
        >
          ← Back to {meta.label}
        </Link>
      </div>
    </div>
  )
}

function MetaItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div>
      <div className="text-xs mb-0.5" style={{ color: 'var(--tekken-muted)' }}>
        {icon} {label}
      </div>
      <div className="text-sm font-medium" style={{ color: 'var(--tekken-text)' }}>
        {value}
      </div>
    </div>
  )
}
