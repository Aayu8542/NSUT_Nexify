import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Welcome from '../pages/Welcome/Welcome';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import StubPage from '../pages/StubPage';

// Phase 2 components
import SendMoney from '../pages/SendMoney/SendMoney';
import EnterAmount from '../pages/SendMoney/EnterAmount';
import ReviewTransfer from '../pages/ReviewTransfer/ReviewTransfer';
import TransferSuccess from '../pages/TransferSuccess/TransferSuccess';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/welcome" replace />;
  }
  
  return children;
}

export default function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/welcome" replace />} 
      />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Phase 2: Send Money Flow */}
      <Route path="/send" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
      <Route path="/send/amount" element={<ProtectedRoute><EnterAmount /></ProtectedRoute>} />
      <Route path="/send/review" element={<ProtectedRoute><ReviewTransfer /></ProtectedRoute>} />
      <Route path="/send/success" element={<ProtectedRoute><TransferSuccess /></ProtectedRoute>} />
      
      {/* Stubs */}
      <Route path="/split" element={<ProtectedRoute><StubPage title="Split Bill" /></ProtectedRoute>} />
      <Route path="/savings" element={<ProtectedRoute><StubPage title="Savings Goals" /></ProtectedRoute>} />
      <Route path="/goal/:id" element={<ProtectedRoute><StubPage title="Goal Details" /></ProtectedRoute>} />
      <Route path="/split/:id" element={<ProtectedRoute><StubPage title="Split Details" /></ProtectedRoute>} />
    </Routes>
  );
}
