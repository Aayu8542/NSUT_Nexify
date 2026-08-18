import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SplitProvider } from './context/SplitContext';
import AppRoutes from './routes/AppRoutes';
import PhoneBorder from './components/PhoneBorder/PhoneBorder';

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <SplitProvider>
          <Router>
            <PhoneBorder>
              <AppRoutes />
            </PhoneBorder>
          </Router>
        </SplitProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
