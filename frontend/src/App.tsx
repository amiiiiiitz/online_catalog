import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SalesHome from './pages/SalesHome';
import SalesCatalog from './pages/SalesCatalog';
import SalesCustomers from './pages/SalesCustomers';
import SalesNewReport from './pages/SalesNewReport';
import SalesReports from './pages/SalesReports';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminPlaceholder from './pages/admin/AdminPlaceholder';

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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="approvals" element={<AdminPlaceholder section="Approvals" />} />
          <Route path="catalog" element={<AdminPlaceholder section="Catalog" />} />
          <Route path="stock" element={<AdminPlaceholder section="Stock" />} />
          <Route path="customers" element={<AdminPlaceholder section="Customers" />} />
          <Route path="reports" element={<AdminPlaceholder section="Reports" />} />
          <Route path="targets" element={<AdminPlaceholder section="Targets" />} />
          <Route path="users" element={<AdminPlaceholder section="Users" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
