import { useState } from 'react';
import BottomNav from '../components/BottomNav';

type Customer = { id: number; name: string; phone: string; history: { date: string; amount: string; status: string }[] };

const initialCustomers: Customer[] = [
  { id: 1, name: 'Rahim Store', phone: '+8801712345678', history: [{ date: '2026-11-18', amount: '1,785.00', status: 'Submitted' }] },
  { id: 2, name: 'Karim Traders', phone: '+8801812345678', history: [] },
];

export default function SalesCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [q, setQ] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [online, setOnline] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const filtered = customers.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q));

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!online) { alert('Adding customers requires online connection'); return; }
    setSubmitting(true);
    setTimeout(() => {
      const newC: Customer = { id: customers.length + 1, name: form.name, phone: form.phone, history: [] };
      setCustomers(prev => [...prev, newC]);
      setForm({ name: '', phone: '' });
      setShowAdd(false);
      setSubmitting(false);
      alert('Mock customer created');
    }, 300);
  }
  // rest unchanged except form inputs bind to form state and submit uses handleAdd

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 72 }}>
      <header style={{ background: 'var(--color-surface)', padding: 'var(--space-4) var(--space-6)', borderBottom: 'var(--border-width) solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)', color: 'var(--color-heading)' }}>Customers</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)' }}>Search and manage customers</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', padding: 'var(--space-2) var(--space-4)', cursor: 'pointer', fontWeight: 600, minHeight: 44 }}>Add Customer</button>
      </header>
      <main style={{ padding: 'var(--space-6)', maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <input placeholder="Search by name or phone" value={q} onChange={e=>setQ(e.target.value)} style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
        <div style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>Offline indicator: {online ? 'Online' : 'Offline (add disabled)'}</div>
        <button onClick={()=>setOnline(!online)} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer' }}>Toggle offline (mock)</button>
        {filtered.length === 0 && <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No customers found.</div>}
        {filtered.map(c => (
          <div key={c.id} style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>{c.phone}</div>
            </div>
            <button onClick={()=>setSelected(c.id)} style={{ background: 'none', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)', padding: 'var(--space-2) var(--space-3)', cursor: 'pointer' }}>View History</button>
          </div>
        ))}
        {selected !== null && (
          <section style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)', marginBottom: 'var(--space-4)' }}>Sales History</h2>
            {customers.find(c=>c.id===selected)?.history.length === 0 && <div style={{ color: 'var(--color-text-secondary)' }}>No approved reports.</div>}
            {customers.find(c=>c.id===selected)?.history.map((h,i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: 'var(--border-width) solid var(--color-border)' }}>
                <span>{h.date}</span>
                <span>{h.amount} BDT · {h.status}</span>
              </div>
            ))}
            <button onClick={()=>setSelected(null)} style={{ marginTop: 'var(--space-3)', background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer' }}>Close</button>
          </section>
        )}
      </main>

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)' }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', width: '100%', maxWidth: 420 }}>
            <h2 style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)', marginBottom: 'var(--space-4)' }}>Add Customer</h2>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--text-label-size)', fontWeight: 'var(--text-label-weight)' }}>Name</span>
                <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--text-label-size)', fontWeight: 'var(--text-label-weight)' }}>Phone</span>
                <input required value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
              </label>
              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
                <button type="button" onClick={()=>setShowAdd(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', padding: 'var(--space-2) var(--space-4)', cursor: 'pointer', fontWeight: 600, opacity: submitting ? 0.6 : 1 }}>{submitting ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}