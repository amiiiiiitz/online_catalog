import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const reports = [
  { id: 1, date: '2026-11-18', amount: '1,785.00', status: 'Submitted' },
  { id: 2, date: '2026-11-17', amount: '960.00', status: 'Approved' },
  { id: 3, date: '2026-11-16', amount: '480.00', status: 'Rejected' },
  { id: 4, date: '2026-11-15', amount: '2,100.00', status: 'Approved' },
  { id: 5, date: '2026-11-14', amount: '650.00', status: 'Submitted' },
];

function badge(status: string) {
  const map: Record<string,string> = { Approved: 'var(--color-success)', Submitted: 'var(--color-warning)', Rejected: 'var(--color-danger)' };
  return <span style={{ color: map[status], fontSize: 'var(--text-small-size)', fontWeight: 600 }}>{status}</span>;
}

export default function SalesHome() {
  const [month, setMonth] = useState('2026-11');
  const target = 50000; const approved = 35000; const waiting = 4200; const remaining = 15000; const today = 960; const rejected = 1;
  const progress = Math.floor((approved / target) * 100);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: 72 }}>
      <header style={{ background: 'var(--color-surface)', padding: 'var(--space-4) var(--space-6)', borderBottom: 'var(--border-width) solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)', color: 'var(--color-heading)' }}>Welcome, Rahim</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)' }}>Your sales dashboard</p>
        </div>
        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
      </header>

      <main style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 960, margin: '0 auto' }}>
        {/* Target card */}
        <section style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)', marginBottom: 'var(--space-4)' }}>Monthly Target</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px,1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div><div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)' }}>Target</div><div style={{ fontWeight: 600 }}>{target.toLocaleString()} BDT</div></div>
            <div><div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)' }}>Approved</div><div style={{ fontWeight: 600, color: 'var(--color-success)' }}>{approved.toLocaleString()} BDT</div></div>
            <div><div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)' }}>Remaining</div><div style={{ fontWeight: 600 }}>{remaining.toLocaleString()} BDT</div></div>
            <div><div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)' }}>Waiting</div><div style={{ fontWeight: 600, color: 'var(--color-warning)' }}>{waiting.toLocaleString()} BDT</div></div>
          </div>
          <div style={{ height: 10, background: 'var(--color-border)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-accent)' }} />
          </div>
          <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>{progress}% achieved</div>
        </section>

        {/* Today */}
        <section style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)', marginBottom: 'var(--space-2)' }}>Today's Performance</h2>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-success)' }}>{today.toLocaleString()} BDT</div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)' }}>Approved sales today</p>
        </section>

        {/* Rejected alert */}
        {rejected > 0 && (
          <section style={{ background: 'var(--color-danger-bg)', border: 'var(--border-width) solid var(--color-danger)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-danger)' }}>Rejected Reports: {rejected}</div>
              <div style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>Review and resubmit</div>
            </div>
            <button onClick={() => alert('Editing not yet available (S5 pending)')} style={{ background: 'var(--color-danger)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', padding: 'var(--space-2) var(--space-4)', cursor: 'pointer', fontWeight: 600 }}>Fix</button>
          </section>
        )}

        {/* Recent reports */}
        <section style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: 'var(--text-section-heading-size)', fontWeight: 'var(--text-section-heading-weight)', marginBottom: 'var(--space-4)' }}>Recent Reports</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {reports.map(r => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{r.date}</div>
                  <div style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>{r.amount} BDT</div>
                </div>
                {badge(r.status)}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom nav */}
      <BottomNav />
    </div>
  );
}