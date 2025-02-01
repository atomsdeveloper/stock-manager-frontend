import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Templates
import Index from "./Templates/index.jsx";
import Home from "./Templates/home.jsx";

// Components
import UserAccount from './components/user-accounts.tsx'
import Dashboard from './components/views/dashboard.tsx'
import RecordsProducts from './components/views/records-products.tsx'
import ReportsProducts from './components/views/reports-products.tsx'
import RecordsSales from './components/views/records-sales.tsx'
import ReportsSales from './components/views/reports-sales.tsx'
import Settings from './components/views/settings.tsx'

export const Error = () => {
  return (
    <div class="container">
      <h1>Error</h1>
    </div>
  );
}

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <Navigate to={"/"} />
    )
  }

  return (
    <>
      {children}
    </>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/home" element={
          <PrivateRoute>
            < Home />
          </PrivateRoute>
        }
        >
          {/* Children Routes Home */}
          <Route index element={<Dashboard />} /> {/* Default Route */}

          {/* Products Routes */}
          <Route path="records/products" element={<RecordsProducts />} />
          <Route path="reports/products" element={<ReportsProducts />} />

          {/* Sales Routes */}
          <Route path="records/sales" element={<RecordsSales />} />
          <Route path="reports/sales" element={<ReportsSales />} />

          <Route path="settings" element={<Settings />} />

        </Route>

        <Route path="/user/account" element={
          <PrivateRoute>
            <UserAccount />
          </PrivateRoute>
        } />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App;
