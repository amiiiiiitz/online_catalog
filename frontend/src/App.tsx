import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SalesHome from './pages/SalesHome';
import SalesCatalog from './pages/SalesCatalog';
import SalesCustomers from './pages/SalesCustomers';
import SalesNewReport from './pages/SalesNewReport';
import SalesReports from './pages/SalesReports';

function Page({ title }: { title: string }) {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <h1 style={{ fontSize: 'var(--text-page-title-size)', fontWeight: 'var(--text-page-title-weight)' }}>{title}</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/reset" element={<AuthPage />} />
        <Route path="/sales" element={<SalesHome />} />
        <Route path="/sales/catalog" element={<SalesCatalog />} />
        <Route path="/sales/customers" element={<SalesCustomers />} />
        <Route path="/sales/new-report" element={<SalesNewReport />} />
        <Route path="/sales/reports" element={<SalesReports />} />
        <Route path="/admin" element={<Page title="Admin Dashboard" />} />
        <Route path="/admin/approvals" element={<Page title="Approvals" />} />
        <Route path="/admin/catalog" element={<Page title="Admin Catalog" />} />
        <Route path="/admin/stock" element={<Page title="Stock" />} />
        <Route path="/admin/customers" element={<Page title="Admin Customers" />} />
        <Route path="/admin/reports" element={<Page title="Admin Reports" />} />
        <Route path="/admin/targets" element={<Page title="Targets" />} />
        <Route path="/admin/users" element={<Page title="Users" />} />
      </Routes>
    </BrowserRouter>
  );
}
