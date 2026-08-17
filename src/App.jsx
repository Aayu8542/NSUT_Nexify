import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SplitProvider } from './context/SplitContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <SplitProvider>
          <Router>
            <AppRoutes />
          </Router>
        </SplitProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
