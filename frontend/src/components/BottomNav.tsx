import { Link, useLocation } from 'react-router-dom';

const items = [
  { label: 'Home', path: '/sales' },
  { label: 'Catalog', path: '/sales/catalog' },
  { label: 'New Report', path: '/sales/new-report' },
  { label: 'Reports', path: '/sales/reports' },
];

export default function BottomNav() {
  const loc = useLocation();
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--color-surface)', borderTop: 'var(--border-width) solid var(--color-border)', display: 'flex', justifyContent: 'space-around', padding: 'var(--space-2) 0' }}>
      {items.map(it => {
        const active = loc.pathname === it.path;
        return (
          <Link key={it.label} to={it.path} style={{ textDecoration: 'none', color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)', fontWeight: active ? 600 : 500, minHeight: 44, display: 'flex', alignItems: 'center' }}>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}