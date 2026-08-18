import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SplitProvider } from './context/SplitContext';
import { SavingsProvider } from './context/SavingsContext';
import AppRoutes from './routes/AppRoutes';
import PhoneBorder from './components/PhoneBorder/PhoneBorder';

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <SplitProvider>
          <SavingsProvider>
            <Router>
              <PhoneBorder>
                <AppRoutes />
              </PhoneBorder>
            </Router>
          </SavingsProvider>
        </SplitProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
