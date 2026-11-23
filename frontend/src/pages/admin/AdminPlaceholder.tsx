import { Link } from 'react-router-dom';

export default function AdminPlaceholder({ section }: { section: string }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: 'var(--space-6)' }}>
      <header style={{
        background: 'var(--color-surface)',
        padding: 'var(--space-4) var(--space-6)',
        borderBottom: 'var(--border-width) solid var(--color-border)',
      }}>
        <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)', color: 'var(--color-heading)', margin: 0 }}>{section}</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)', margin: 'var(--space-1) 0 0 0' }}>This section is not implemented yet.</p>
      </header>
      <main style={{ padding: 'var(--space-6)', maxWidth: 960, margin: '0 auto' }}>
        <section style={{
          background: 'var(--color-surface)',
          border: 'var(--border-width) solid var(--color-border)',
          borderRadius: 'var(--radius)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
          display: 'inline-block',
        }}>
          <p style={{ margin: 0 }}>{section} management UI will be built in a later phase.</p>
          <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>
            Placeholder route: <code style={{ color: 'var(--color-text-secondary)' }}>/admin/{section.toLowerCase()}</code>
          </p>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <Link to="/admin" style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              background: 'var(--color-surface)', border: 'var(--border-width) solid var(--color-border)',
              color: 'var(--color-heading)', padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius)', fontSize: 'var(--text-small-size)', fontWeight: 500,
              textDecoration: 'none',
            }}>
              &larr; Back to Dashboard
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
