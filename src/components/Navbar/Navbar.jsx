import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navItems } from '../../data/mockData';
import './Navbar.css';

const icons = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  split: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20" />
    </svg>
  ),
  savings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
      <path d="M2 9.5c1 0 3.5.5 5 2" />
      <circle cx="16" cy="10" r="0.5" fill="currentColor" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 10-16 0" />
    </svg>
  ),
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {navItems.map((item) => {
        const isActive = location.pathname === item.route ||
          (item.id === 'home' && location.pathname === '/dashboard');

        return (
          <motion.button
            key={item.id}
            className={`navbar-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.route)}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="navbar-icon">{icons[item.icon]}</span>
            <span className="navbar-label">{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}
