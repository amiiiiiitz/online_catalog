import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type DayPoint = { date: string; amount: number };
type TopUser = { id: number; name: string; target: number; approved: number };
type ProductRow = { product: string; variant: string; units: number; revenue: number };

type MonthData = {
  month: string;
  totalSales: number;
  totalCount: number;
  approvedTotal: number;
  approvedCount: number;
  pendingTotal: number;
  pendingCount: number;
  rejectedTotal: number;
  rejectedCount: number;
  todayTotal: number;
  todayCount: number;
  daily: DayPoint[];
  topUsers: TopUser[];
  products: ProductRow[];
  productsTotal: { units: number; revenue: number };
  pending: { reportsWaiting: number; accountsWaiting: number };
};

// Mock data only. Backend dashboards endpoints (#38-#42) are not implemented yet.
// Figures are internally consistent: total sales = approved + pending + rejected.
const MONTH_DATA: Record<string, MonthData> = {
  '2026-11': {
    month: '2026-11',
    totalSales: 46925,
    totalCount: 65,
    approvedTotal: 35000,
    approvedCount: 42,
    pendingTotal: 6925,
    pendingCount: 18,
    rejectedTotal: 5000,
    rejectedCount: 5,
    todayTotal: 960,
    todayCount: 2,
    daily: [
      { date: '2026-11-01', amount: 1490 }, { date: '2026-11-02', amount: 0 },
      { date: '2026-11-03', amount: 1900 }, { date: '2026-11-04', amount: 300 },
      { date: '2026-11-05', amount: 2400 }, { date: '2026-11-06', amount: 0 },
      { date: '2026-11-07', amount: 1500 }, { date: '2026-11-08', amount: 1700 },
      { date: '2026-11-09', amount: 700 }, { date: '2026-11-10', amount: 0 },
      { date: '2026-11-11', amount: 2200 }, { date: '2026-11-12', amount: 900 },
      { date: '2026-11-13', amount: 2600 }, { date: '2026-11-14', amount: 750 },
      { date: '2026-11-15', amount: 0 }, { date: '2026-11-16', amount: 1700 },
      { date: '2026-11-17', amount: 1400 }, { date: '2026-11-18', amount: 2100 },
      { date: '2026-11-19', amount: 0 }, { date: '2026-11-20', amount: 1200 },
      { date: '2026-11-21', amount: 2400 }, { date: '2026-11-22', amount: 650 },
      { date: '2026-11-23', amount: 960 }, { date: '2026-11-24', amount: 1500 },
      { date: '2026-11-25', amount: 0 }, { date: '2026-11-26', amount: 1200 },
      { date: '2026-11-27', amount: 2000 }, { date: '2026-11-28', amount: 750 },
      { date: '2026-11-29', amount: 1000 }, { date: '2026-11-30', amount: 1700 },
    ],
    topUsers: [
      { id: 7, name: 'Sarah', target: 30000, approved: 31000 },
      { id: 4, name: 'Karim', target: 40000, approved: 37000 },
      { id: 2, name: 'Tanvir', target: 45000, approved: 40000 },
      { id: 9, name: 'Farah', target: 25000, approved: 22000 },
      { id: 5, name: 'Imran', target: 60000, approved: 51000 },
      { id: 8, name: 'Nusrat', target: 35000, approved: 29000 },
      { id: 3, name: 'Selim', target: 55000, approved: 44000 },
      { id: 6, name: 'Rumana', target: 20000, approved: 15000 },
      { id: 10, name: 'Hasan', target: 70000, approved: 49000 },
      { id: 1, name: 'Rahim', target: 50000, approved: 35000 },
    ],
    products: [
      { product: 'Cotton T-Shirt', variant: 'M', units: 20, revenue: 9600 },
      { product: 'Denim Jeans', variant: '32', units: 8, revenue: 9600 },
      { product: 'Wool Blazer', variant: 'L', units: 3, revenue: 12600 },
      { product: 'Canvas Sneakers', variant: '42', units: 8, revenue: 6800 },
      { product: 'Cotton T-Shirt', variant: 'L', units: 5, revenue: 2400 },
      { product: 'Denim Jeans', variant: '34', units: 3, revenue: 3900 },
    ],
    productsTotal: { units: 47, revenue: 44900 },
    pending: { reportsWaiting: 18, accountsWaiting: 3 },
  },
  '2026-10': {
    month: '2026-10',
    totalSales: 33300,
    totalCount: 42,
    approvedTotal: 28000,
    approvedCount: 31,
    pendingTotal: 3200,
    pendingCount: 7,
    rejectedTotal: 2100,
    rejectedCount: 4,
    todayTotal: 0,
    todayCount: 0,
    daily: [
      { date: '2026-10-01', amount: 900 }, { date: '2026-10-02', amount: 1400 },
      { date: '2026-10-03', amount: 0 }, { date: '2026-10-04', amount: 700 },
      { date: '2026-10-05', amount: 1900 }, { date: '2026-10-06', amount: 0 },
      { date: '2026-10-07', amount: 600 }, { date: '2026-10-08', amount: 1400 },
      { date: '2026-10-09', amount: 0 }, { date: '2026-10-10', amount: 1000 },
      { date: '2026-10-11', amount: 2500 }, { date: '2026-10-12', amount: 700 },
      { date: '2026-10-13', amount: 0 }, { date: '2026-10-14', amount: 1200 },
      { date: '2026-10-15', amount: 1500 }, { date: '2026-10-16', amount: 0 },
      { date: '2026-10-17', amount: 950 }, { date: '2026-10-18', amount: 2000 },
      { date: '2026-10-19', amount: 800 }, { date: '2026-10-20', amount: 0 },
      { date: '2026-10-21', amount: 1300 }, { date: '2026-10-22', amount: 1900 },
      { date: '2026-10-23', amount: 0 }, { date: '2026-10-24', amount: 700 },
      { date: '2026-10-25', amount: 1800 }, { date: '2026-10-26', amount: 1400 },
      { date: '2026-10-27', amount: 0 }, { date: '2026-10-28', amount: 900 },
      { date: '2026-10-29', amount: 1600 }, { date: '2026-10-30', amount: 850 },
      { date: '2026-10-31', amount: 0 },
    ],
    topUsers: [
      { id: 101, name: 'Asif', target: 30000, approved: 27000 },
      { id: 103, name: 'Orin', target: 40000, approved: 34000 },
      { id: 104, name: 'Raju', target: 25000, approved: 20000 },
      { id: 102, name: 'Lata', target: 20000, approved: 15000 },
    ],
    products: [
      { product: 'Cotton T-Shirt', variant: 'M', units: 12, revenue: 5760 },
      { product: 'Denim Jeans', variant: '32', units: 5, revenue: 6000 },
      { product: 'Canvas Sneakers', variant: '42', units: 6, revenue: 5100 },
    ],
    productsTotal: { units: 23, revenue: 16860 },
    pending: { reportsWaiting: 12, accountsWaiting: 1 },
  },
};

function money(value: number) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' BDT';
}

function monthLabel(month: string) {
  return new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function progressPct(approved: number, target: number) {
  return target <= 0 ? 0 : Math.floor((approved / target) * 100);
}

const DEFAULT_MONTH = new Date().toISOString().slice(0, 7);

function rankedTopUsers(users: TopUser[]) {
  return [...users]
    .sort((a, b) => {
      const ratioA = a.target > 0 ? a.approved / a.target : -1;
      const ratioB = b.target > 0 ? b.approved / b.target : -1;
      if (ratioB !== ratioA) return ratioB - ratioA;
      if (b.approved !== a.approved) return b.approved - a.approved;
      return a.id - b.id;
    })
    .slice(0, 10);
}

const cardStyle = {
  background: 'var(--color-surface)',
  border: 'var(--border-width) solid var(--color-border)',
  borderRadius: 'var(--radius)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-sm)',
};


function StatCard({ title, value, sub, color }: { title: string; value: string; sub?: string; color?: string }) {
  return (
    <section style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
      <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)', fontWeight: 500 }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: color ?? 'var(--color-heading)' }}>{value}</div>
      {sub && <div style={{ fontSize: 'var(--text-helper-size)', color: 'var(--color-text-secondary)' }}>{sub}</div>}
    </section>
  );
}
function DailyChart({ daily }: { daily: DayPoint[] }) {
  const [hover, setHover] = useState<DayPoint | null>(null);
  const maxAmount = Math.max(1, ...daily.map(d => d.amount));
  const chartHeight = 170;

  return (
    <section style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <h2 style={{ fontSize: 'var(--text-card-heading-size)', fontWeight: 'var(--text-card-heading-weight)', color: 'var(--color-heading)', margin: 0 }}>Daily Sales</h2>
        <span style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{monthLabel(daily[0].date.slice(0, 7))}</span>
      </div>
      <svg width="100%" height={230} style={{ display: 'block' }} aria-label="Daily approved sales for the selected month">
        {[0, 1, 2, 3, 4].map(i => {
          const value = (maxAmount * i) / 4;
          const y = chartHeight - (value / maxAmount) * chartHeight;
          return (
            <g key={i}>
              <text x={16} y={y + 4} fontSize={11} textAnchor="end" style={{ fill: 'var(--color-text-secondary)' }}>{value.toLocaleString()}</text>
              <line x1="56" y1={y} x2="100%" y2={y} strokeWidth={1} style={{ stroke: 'var(--color-border)' }} />
            </g>
          );
        })}
        {daily.map((d, i) => {
          const barHeight = (d.amount / maxAmount) * chartHeight;
          const y = chartHeight - barHeight;
          const x = (i * 100) / daily.length;
          const width = (68 / daily.length);
          const active = hover?.date === d.date;
          return (
            <g key={d.date} onMouseEnter={() => setHover(d)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
              <rect x={`${x}%`} y={y} width={`${width}%`} height={Math.max(barHeight, 1)} style={{ fill: active ? 'var(--color-accent)' : 'var(--color-primary)' }} />
              <title>{d.date}: {money(d.amount)}</title>
            </g>
          );
        })}
        {daily.map((d, i) => (
          <text key={d.date} x={`${(i * 100) / daily.length + 34 / daily.length}%`} y={chartHeight + 22} fontSize={11} textAnchor="middle" style={{ fill: 'var(--color-text-secondary)' }}>{new Date(d.date).getDate()}</text>
        ))}
      </svg>
      {hover && (
        <div style={{ fontSize: 'var(--text-small-size)', fontWeight: 600, color: 'var(--color-heading)', marginTop: 'var(--space-2)', display: 'flex', gap: 'var(--space-2)', alignItems: 'baseline' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{new Date(hover.date).getDate()}</span>
          {money(hover.amount)}
        </div>
      )}
      <p style={{ fontSize: 'var(--text-helper-size)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>Zero bars indicate days with no approved sales.</p>
    </section>
  );
}
function Table({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <section style={cardStyle}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-table-size)' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} style={{ textAlign: 'left', padding: 'var(--space-2)', color: 'var(--color-text-secondary)', fontWeight: 500, borderBottom: 'var(--border-width) solid var(--color-border)' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: 'var(--border-width) solid var(--color-border)' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: 'var(--space-2)', textAlign: j === 0 ? 'left' : 'right' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default function Dashboard() {
  const [month, setMonth] = useState(DEFAULT_MONTH);
  const data = MONTH_DATA[month];
  const topUsers = useMemo(() => rankedTopUsers(data?.topUsers ?? []), [data]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <header style={{
        background: 'var(--color-surface)',
        borderBottom: 'var(--border-width) solid var(--color-border)',
        padding: 'var(--space-4) var(--space-6)',
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap',
      }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)', color: 'var(--color-heading)', margin: 0 }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-small-size)', margin: 'var(--space-1) 0 0 0' }}>
            Company-wide sales performance for {monthLabel(month)}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderLeft: 'var(--border-width) solid var(--color-border)', paddingLeft: 'var(--space-6)', marginLeft: 'var(--space-6)' }}>
          <label style={{ fontSize: 'var(--text-label-size)', fontWeight: 'var(--text-label-weight)', color: 'var(--color-heading)', margin: 0, whiteSpace: 'nowrap' }}>Reporting month</label>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)} style={{ height: 'var(--input-height)', padding: '0 var(--space-3)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius)' }} />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {!data && (
          <section style={cardStyle}>
            <h2 style={{ fontSize: 'var(--text-card-heading-size)', fontWeight: 'var(--text-card-heading-weight)', color: 'var(--color-heading)', margin: '0 0 var(--space-3) 0' }}>No data for {monthLabel(month)}</h2>
            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>Mock dashboard data is available for October 2026 and November 2026. Select a different month above.</p>
          </section>
        )}

        {data && (
          <>
            {/* B. Sales overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 'var(--space-4)' }}>
              <StatCard title="Total sales" value={money(data.totalSales)} sub={`${data.totalCount} reports, all statuses`} />
              <StatCard title="Approved sales" value={money(data.approvedTotal)} sub={`${data.approvedCount} reports approved`} color="var(--color-success)" />
              <StatCard title="Pending sales" value={money(data.pendingTotal)} sub={`${data.pendingCount} reports awaiting approval`} color="var(--color-warning)" />
              <StatCard title="Rejected sales" value={money(data.rejectedTotal)} sub={`${data.rejectedCount} reports rejected`} color="var(--color-danger)" />
            </div>

            {/* C. Daily sales overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 'var(--space-4)' }}>
              <DailyChart daily={data.daily} />
            </div>
            {/* D. Top performers */}
            <section style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <h2 style={{ fontSize: 'var(--text-card-heading-size)', fontWeight: 'var(--text-card-heading-weight)', color: 'var(--color-heading)', margin: 0 }}>Top Performers</h2>
                <span style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{monthLabel(month)} &middot; ranked by target achievement</span>
              </div>
              <Table
                columns={['#', 'Salesperson', 'Target', 'Approved', 'Progress', 'Remaining']}
                rows={topUsers.map(u => {
                  const pct = progressPct(u.approved, u.target);
                  const remaining = Math.max(u.target - u.approved, 0);
                  const exceeded = Math.max(u.approved - u.target, 0);
                  return [
                    String(topUsers.indexOf(u) + 1),
                    u.name,
                    money(u.target),
                    money(u.approved),
                    <span key="progress" style={{ fontWeight: 700, color: pct >= 100 ? 'var(--color-success)' : 'var(--color-heading)' }}>{pct}%</span>,
                    exceeded > 0 ? `Exceeded by ${money(exceeded)}` : money(remaining),
                  ];
                })}
              />
              <p style={{ fontSize: 'var(--text-helper-size)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
                Progress = floor(approved &divide; target &times; 100), uncapped. Users without a target are excluded. Ranking by exact achievement ratio, then higher approved total, then lower user id.
              </p>
            </section>

            {/* E. Product summary */}
            <section style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <h2 style={{ fontSize: 'var(--text-card-heading-size)', fontWeight: 'var(--text-card-heading-weight)', color: 'var(--color-heading)', margin: 0 }}>Product Summary</h2>
                <span style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{monthLabel(month)} &middot; variant sales</span>
              </div>
              <Table
                columns={['Product', 'Variant', 'Units sold', 'Revenue']}
                rows={[
                  ...data.products.map(p => [p.product, p.variant, String(p.units), money(p.revenue)]),
                  [
                    <span key="a" style={{ fontWeight: 700 }}>Total</span>,
                    <span key="b" style={{ fontWeight: 700 }}>-</span>,
                    <span key="c" style={{ fontWeight: 700 }}>{data.productsTotal.units}</span>,
                    <span key="d" style={{ fontWeight: 700 }}>{money(data.productsTotal.revenue)}</span>,
                  ],
                ]}
              />
              <p style={{ fontSize: 'var(--text-helper-size)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
                Variant-level sales from approved reports in the selected month.
              </p>
            </section>

            {/* F. Pending counts */}
            <section style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <h2 style={{ fontSize: 'var(--text-card-heading-size)', fontWeight: 'var(--text-card-heading-weight)', color: 'var(--color-heading)', margin: 0 }}>Pending Approvals</h2>
                <span style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>(all months)</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-heading)' }}>Reports awaiting approval</div>
                    <div style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>{data.pending.reportsWaiting} reports submitted, not yet reviewed</div>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--color-warning)' }}>{data.pending.reportsWaiting}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-heading)' }}>Accounts awaiting approval</div>
                    <div style={{ fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>{data.pending.accountsWaiting} user accounts pending review</div>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--color-warning)' }}>{data.pending.accountsWaiting}</div>
                </div>
                <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-small-size)', color: 'var(--color-text-secondary)' }}>
                  Review and decide on these items in the <Link to="/admin/approvals" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'underline' }}>Approvals</Link> section (placeholder &mdash; not implemented yet).
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

