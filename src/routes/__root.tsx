import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Tekken Archive — Games, Movies & Extras' },
      { name: 'description', content: 'The definitive archive for Tekken game files, movies, and franchise extras.' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen" style={{ backgroundColor: 'var(--tekken-bg)' }}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function SiteHeader() {
  return (
    <header style={{ backgroundColor: 'var(--tekken-surface)', borderBottom: '1px solid var(--tekken-border)' }}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div
            className="w-10 h-10 flex items-center justify-center rounded font-black text-white text-xl"
            style={{ background: 'linear-gradient(135deg, var(--tekken-red), #8b0000)' }}
          >
            T
          </div>
          <div>
            <div className="font-black text-lg tracking-widest" style={{ color: 'var(--tekken-text)' }}>
              TEKKEN
            </div>
            <div className="text-xs tracking-wider -mt-1" style={{ color: 'var(--tekken-muted)' }}>
              ARCHIVE
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <NavLink to="/category/game-files" label="Game Files" />
          <NavLink to="/category/movies" label="Movies" />
          <NavLink to="/category/extras" label="Extras" />
        </nav>
      </div>
    </header>
  )
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded text-sm font-medium no-underline transition-colors"
      style={{ color: 'var(--tekken-muted)' }}
      activeProps={{ style: { color: 'var(--tekken-red-bright)', backgroundColor: 'rgba(196,30,42,0.1)' } }}
    >
      {label}
    </Link>
  )
}

function SiteFooter() {
  return (
    <footer
      className="mt-16 py-8 text-center text-sm"
      style={{ borderTop: '1px solid var(--tekken-border)', color: 'var(--tekken-muted)' }}
    >
      <p>Tekken Archive — Fan preservation project. All trademarks belong to Bandai Namco Entertainment.</p>
    </footer>
  )
}
