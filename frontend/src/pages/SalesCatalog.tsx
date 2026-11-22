import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const products = [
  { id: 1, name: 'Cotton T-Shirt', variants: [{ size: 'M', price: '480.00', inStock: true }, { size: 'L', price: '480.00', inStock: false }] },
  { id: 2, name: 'Denim Jeans', variants: [{ size: '32', price: '1,200.00', inStock: true }] },
];

export default function SalesCatalog() {
  const [q, setQ] = useState('');
  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 72 }}>
      <header style={{ background: 'var(--color-surface)', padding: 'var(--space-4) var(--space-6)', borderBottom: 'var(--border-width) solid var(--color-border)' }}>
        <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)', color: 'var(--color-heading)' }}>Product Catalog</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)' }}>Browse active products and variants</p>
      </header>
      <main style={{ padding: 'var(--space-6)', maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <input placeholder="Search products" value={q} onChange={e=>setQ(e.target.value)} style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
        <div style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>Offline: last synced 2h ago (mock)</div>
        {filtered.length === 0 && <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No products found.</div>}
        {filtered.map(p => (
          <div key={p.id} style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, background: 'var(--color-border)', borderRadius: 'var(--radius)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>{p.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {p.variants.map(v => (
                  <span key={v.size} style={{ fontSize: 'var(--text-small-size)', padding: 'var(--space-1) var(--space-2)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                    {v.size} · {v.price} BDT · <span style={{ color: v.inStock ? 'var(--color-success)' : 'var(--color-danger)' }}>{v.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>
      <BottomNav />
    </div>
  );
}