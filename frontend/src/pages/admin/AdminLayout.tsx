import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

type NavItem = {
  key: string;
  label: string;
  path: string;
  implemented: boolean;
};

const NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', path: '/admin', implemented: true },
  { key: 'approvals', label: 'Approvals', path: '/admin/approvals', implemented: false },
  { key: 'catalog', label: 'Catalog', path: '/admin/catalog', implemented: false },
  { key: 'stock', label: 'Stock', path: '/admin/stock', implemented: false },
  { key: 'customers', label: 'Customers', path: '/admin/customers', implemented: false },
  { key: 'reports', label: 'Reports', path: '/admin/reports', implemented: false },
  { key: 'targets', label: 'Targets', path: '/admin/targets', implemented: false },
  { key: 'users', label: 'Users', path: '/admin/users', implemented: false },
];

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/approvals': 'Approvals',
  '/admin/catalog': 'Catalog',
  '/admin/stock': 'Stock',
  '/admin/customers': 'Customers',
  '/admin/reports': 'Reports',
  '/admin/targets': 'Targets',
  '/admin/users': 'Users',
};

const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 240;
const MOBILE_BREAKPOINT = 768;

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Admin Panel';

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden', background: 'var(--color-bg)' }}>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: HEADER_HEIGHT,
        background: 'var(--color-surface)',
        borderBottom: 'var(--border-width) solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--space-6)', zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {mobile && (
            <button
              aria-label="Toggle navigation"
              onClick={toggleSidebar}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, border: 'none', background: 'none',
                color: 'var(--color-heading)', fontSize: 20, cursor: 'pointer',
              }}
            >
              &#9776;
            </button>
          )}
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-heading)', letterSpacing: '-0.5px' }}>Admin Panel</div>
        </div>
        <div style={{ fontSize: 'var(--text-small-size)', fontWeight: 500, color: 'var(--color-heading)' }}>{pageTitle}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            aria-label="Notifications"
            title="Notifications (mock placeholder)"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 40, height: 40, border: 'none', background: 'none',
              color: 'var(--color-text-secondary)', cursor: 'pointer',
            }}
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }} aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h14s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', paddingLeft: 'var(--space-3)', borderLeft: 'var(--border-width) solid var(--color-border)' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '999px', background: 'var(--color-primary)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, fontSize: 14,
            }}>AU</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 'var(--text-small-size)', fontWeight: 600, color: 'var(--color-heading)' }}>Admin User</div>
              <div style={{ fontSize: 'var(--text-helper-size)', color: 'var(--color-text-secondary)' }}>Administrator</div>
            </div>
          </div>
        </div>
      </header>
      <aside style={{
        position: 'fixed', top: HEADER_HEIGHT, bottom: 0, left: 0, width: SIDEBAR_WIDTH,
        display: 'flex', flexDirection: 'column',
        background: 'var(--color-surface)',
        borderRight: 'var(--border-width) solid var(--color-border)',
        overflowY: 'auto',
        ...(mobile && {
          boxShadow: 'var(--shadow-md)',
          zIndex: 210,
          transform: 'translateX(' + (sidebarOpen ? 0 : -100) + '%)',
          transition: 'transform 0.2s ease',
        }),
      }}>
        <nav style={{ padding: 'var(--space-4) 0', flex: 1 }}>
          {NAV.map(item => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.key}
                to={item.path}
                onClick={closeSidebar}
                style={{
                  display: 'block', padding: 'var(--space-3) var(--space-6)',
                  textDecoration: 'none',
                  color: active ? '#fff' : 'var(--color-heading)',
                  fontWeight: active ? 600 : 500,
                  fontSize: 'var(--text-small-size)',
                  background: active ? 'var(--color-primary)' : 'transparent',
                  borderRight: active ? '3px solid var(--color-accent)' : 'none',
                }}
              >
                {item.label}
                {!item.implemented && (
                  <span style={{ fontSize: 'var(--text-helper-size)', fontWeight: 400, color: 'rgba(255,255,255,0.7)', marginLeft: 'var(--space-3)' }}>Not implemented</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: 'var(--space-4) var(--space-6)', fontSize: 'var(--text-helper-size)', color: 'var(--color-text-secondary)', borderTop: 'var(--border-width) solid var(--color-border)' }}>
          Demo build &mdash; mock data only
        </div>
      </aside>

      <main style={{
        marginLeft: mobile ? 0 : SIDEBAR_WIDTH,
        paddingTop: HEADER_HEIGHT + 30,
        paddingRight: 'var(--space-6)',
        paddingBottom: 'var(--space-6)',
        paddingLeft: 'var(--space-6)',
        minHeight: '100vh',
      }}>
        <Outlet />
      </main>

      {mobile && sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(32, 43, 60, 0.4)', zIndex: 150 }}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
