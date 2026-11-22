import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const reports = [
  { id: 1048, date: '2026-11-18', amount: '1,785.00', status: 'Submitted', customer: 'Rahim Store', items: [{ name: 'Cotton T-Shirt M', qty: 2, price: 480, total: 960 }, { name: 'Denim Jeans 32', qty: 5, price: 165, total: 825 }], rejectReason: '' },
  { id: 1049, date: '2026-11-17', amount: '960.00', status: 'Approved', customer: 'Karim Traders', items: [{ name: 'Cotton T-Shirt L', qty: 2, price: 480, total: 960 }], rejectReason: '' },
  { id: 1050, date: '2026-11-16', amount: '480.00', status: 'Rejected', customer: 'Rahim Store', items: [{ name: 'Cotton T-Shirt M', qty: 1, price: 480, total: 480 }], rejectReason: 'Price mismatch' },
];

export default function SalesReports() {
  const [selected, setSelected] = useState<number | null>(null);
  const rep = reports.find(r => r.id === selected);

  function badge(status: string) {
    const map: Record<string,string> = { Approved: 'var(--color-success)', Submitted: 'var(--color-warning)', Rejected: 'var(--color-danger)' };
    return <span style={{ color: map[status], fontWeight: 600, fontSize: 'var(--text-small-size)' }}>{status}</span>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 72 }}>
      <header style={{ background: 'var(--color-surface)', padding: 'var(--space-4) var(--space-6)', borderBottom: 'var(--border-width) solid var(--color-border)' }}>
        <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)', color: 'var(--color-heading)' }}>Reports</h1>
      </header>
      <main style={{ padding: 'var(--space-6)', maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {reports.length === 0 && <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No reports.</div>}
        {reports.map(r => (
          <div key={r.id} onClick={()=>setSelected(r.id)} style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 500 }}>{r.date}</div>
              <div style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>{r.amount} BDT</div>
            </div>
            {badge(r.status)}
          </div>
        ))}
        {rep && (
          <section style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)', marginBottom: 'var(--space-4)' }}>Report #{rep.id}</h2>
            <div style={{ marginBottom: 'var(--space-2)' }}><strong>Customer:</strong> {rep.customer}</div>
            <div style={{ marginBottom: 'var(--space-2)' }}><strong>Date:</strong> {rep.date}</div>
            <div style={{ marginBottom: 'var(--space-2)' }}><strong>Status:</strong> {badge(rep.status)}</div>
            {rep.status === 'Rejected' && <div style={{ color: 'var(--color-danger)', marginBottom: 'var(--space-4)' }}>Reason: {rep.rejectReason}</div>}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-table-size)' }}>
              <thead><tr><th style={{ textAlign: 'left', padding: 'var(--space-2)' }}>Item</th><th style={{ textAlign: 'right', padding: 'var(--space-2)' }}>Qty</th><th style={{ textAlign: 'right', padding: 'var(--space-2)' }}>Price</th><th style={{ textAlign: 'right', padding: 'var(--space-2)' }}>Total</th></tr></thead>
              <tbody>
                {rep.items.map((it,i) => (
                  <tr key={i}><td style={{ padding: 'var(--space-2)' }}>{it.name}</td><td style={{ textAlign: 'right', padding: 'var(--space-2)' }}>{it.qty}</td><td style={{ textAlign: 'right', padding: 'var(--space-2)' }}>{it.price}</td><td style={{ textAlign: 'right', padding: 'var(--space-2)' }}>{it.total}</td></tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 'var(--space-3)', fontWeight: 700, textAlign: 'right' }}>Grand Total: {rep.amount} BDT</div>
            {rep.status === 'Rejected' && (
              <button onClick={() => { window.location.href = `/sales/new-report?edit=${rep.id}`; }} style={{ marginTop: 'var(--space-4)', background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', padding: 'var(--space-2) var(--space-4)', cursor: 'pointer', fontWeight: 600 }}>Edit / Fix</button>
            )}
            <button onClick={()=>setSelected(null)} style={{ marginTop: 'var(--space-3)', background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', display: 'block' }}>Close</button>
          </section>
        )}
      </main>
      <BottomNav />
    </div>
  );
}