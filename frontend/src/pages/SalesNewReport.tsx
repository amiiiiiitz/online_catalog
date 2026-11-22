import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const customers = [{ id: 1, name: 'Rahim Store', phone: '+8801712345678' }, { id: 2, name: 'Karim Traders', phone: '+8801812345678' }];
const products = [
  { id: 1, name: 'Cotton T-Shirt', variants: [{ id: 12, size: 'M', price: 480 }, { id: 13, size: 'L', price: 480 }] },
  { id: 2, name: 'Denim Jeans', variants: [{ id: 40, size: '32', price: 1200 }] },
];

type Line = { variantId: number; productName: string; size: string; unitPrice: number; quantity: number };

const rejectedPrefill: Record<number, { customerId: number; lines: Line[]; reason: string }> = {
  1050: { customerId: 1, lines: [{ variantId: 12, productName: 'Cotton T-Shirt', size: 'M', unitPrice: 480, quantity: 1 }], reason: 'Price mismatch' },
};

export default function SalesNewReport() {
  const params = new URLSearchParams(window.location.search);
  const editId = params.get('edit') ? Number(params.get('edit')) : null;
  const prefill = editId ? rejectedPrefill[editId] : null;
  const [customerId, setCustomerId] = useState<number | null>(prefill?.customerId ?? null);
  const [lines, setLines] = useState<Line[]>(prefill?.lines ?? []);
  const [online, setOnline] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reason] = useState(prefill?.reason ?? '');


  const grandTotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);

  function addVariant(variantId: number, productName: string, size: string, price: number) {
    setLines(prev => {
      const existing = prev.find(l => l.variantId === variantId);
      if (existing) {
        if (existing.quantity >= 100000) return prev;
        return prev.map(l => l.variantId === variantId ? { ...l, quantity: Math.min(100000, l.quantity + 1) } : l);
      }
      if (prev.length >= 50) { alert('Max 50 distinct variants'); return prev; }
      return [...prev, { variantId, productName, size, unitPrice: price, quantity: 1 }];
    });
  }

  function setQty(variantId: number, q: number) {
    if (q < 1 || q > 100000) return;
    setLines(prev => prev.map(l => l.variantId === variantId ? { ...l, quantity: q } : l));
  }

  function remove(variantId: number) {
    setLines(prev => prev.filter(l => l.variantId !== variantId));
  }

  function submit() {
    if (!online || submitting || !customerId || lines.length === 0) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSuccess(true); }, 500);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 72 }}>
      <header style={{ background: 'var(--color-surface)', padding: 'var(--space-4) var(--space-6)', borderBottom: 'var(--border-width) solid var(--color-border)' }}>
        <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)', color: 'var(--color-heading)' }}>New Report</h1>
      </header>
      <main style={{ padding: 'var(--space-6)', maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Customer */}
        <section style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)', marginBottom: 'var(--space-3)' }}>Customer</h2>
          <select value={customerId ?? ''} onChange={e=>setCustomerId(Number(e.target.value))} style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)', width: '100%' }}>
            <option value="">Select customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>)}
          </select>
        </section>

        {/* Products */}
        <section style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)', marginBottom: 'var(--space-3)' }}>Add Products</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            {products.map(p => p.variants.map(v => (
              <button key={v.id} onClick={() => addVariant(v.id, p.name, v.size, v.price)} style={{ padding: 'var(--space-2) var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)', background: 'var(--color-surface)', cursor: 'pointer' }}>
                {p.name} {v.size} - {v.price} BDT
              </button>
            )))}
          </div>
          {lines.length === 0 && <div style={{ color: 'var(--color-text-secondary)' }}>No items added.</div>}
          {lines.map(l => (
            <div key={l.variantId} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', padding: 'var(--space-3) 0', borderBottom: 'var(--border-width) solid var(--color-border)', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 120 }}>{l.productName} {l.size}</div>
              <div style={{ color: 'var(--color-text-secondary)' }}>{l.unitPrice} BDT (read-only)</div>
              <input type="number" min={1} max={100000} value={l.quantity} onChange={e=>setQty(l.variantId, Number(e.target.value))} style={{ width: 80, height: 'var(--input-height)', padding: '0 var(--space-2)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
              <div style={{ fontWeight: 600 }}>{(l.unitPrice * l.quantity).toLocaleString()} BDT</div>
              <button onClick={()=>remove(l.variantId)} style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}>Remove</button>
            </div>
          ))}
        </section>

        {reason && (
          <div style={{ background: 'var(--color-danger-bg)', border: 'var(--border-width) solid var(--color-danger)', borderRadius: 'var(--radius)', padding: 'var(--space-3)', color: 'var(--color-danger)' }}>
            Rejection reason: {reason}
          </div>
        )}
        <section style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)' }}>Grand Total</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-accent)' }}>{grandTotal.toLocaleString()} BDT</div>
        </section>

        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={submit} disabled={!online || submitting || !customerId || lines.length===0} style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', padding: 'var(--space-3) var(--space-6)', cursor: 'pointer', fontWeight: 600, opacity: (!online||submitting||!customerId||lines.length===0) ? 0.5 : 1, minHeight: 44 }}>
            {submitting ? 'Submitting...' : 'Submit Report'}
          </button>
          <button onClick={()=>setOnline(!online)} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer' }}>Toggle offline (mock)</button>
          {!online && <span style={{ color: 'var(--color-danger)', fontSize: 'var(--text-small-size)' }}>Submission requires online connection.</span>}
          {success && <span style={{ color: 'var(--color-success)', fontSize: 'var(--text-small-size)' }}>Report submitted (mock).</span>}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}