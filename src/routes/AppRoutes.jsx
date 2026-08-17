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

// Phase 3 components
import SplitBill from '../pages/SplitBill/SplitBill';
import CreateSplit from '../pages/SplitBill/CreateSplit';
import AddFriends from '../pages/SplitBill/AddFriends';
import SplitResult from '../pages/SplitBill/SplitResult';
import SplitDetails from '../pages/SplitBill/SplitDetails';

// Profile
import Profile from '../pages/Profile/Profile';
import ProfileTransactions from '../pages/Profile/ProfileTransactions';
import ProfileSettings from '../pages/Profile/ProfileSettings';

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
      
      {/* Phase 3: Split Bill Flow */}
      <Route path="/split" element={<ProtectedRoute><SplitBill /></ProtectedRoute>} />
      <Route path="/split/create" element={<ProtectedRoute><CreateSplit /></ProtectedRoute>} />
      <Route path="/split/create/friends" element={<ProtectedRoute><AddFriends /></ProtectedRoute>} />
      <Route path="/split/create/result" element={<ProtectedRoute><SplitResult /></ProtectedRoute>} />
      <Route path="/split/:id" element={<ProtectedRoute><SplitDetails /></ProtectedRoute>} />

      {/* Profile */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/transactions" element={<ProtectedRoute><ProfileTransactions /></ProtectedRoute>} />
      <Route path="/profile/settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />

      {/* Stubs */}
      <Route path="/savings" element={<ProtectedRoute><StubPage title="Savings Goals" /></ProtectedRoute>} />
      <Route path="/goal/:id" element={<ProtectedRoute><StubPage title="Goal Details" /></ProtectedRoute>} />
    </Routes>
  );
}
