import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';

export default function StubPage({ title }) {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-2xl)' }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: 'var(--space-md)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="heading-md">{title}</h1>
      </div>

      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', padding: 'var(--space-2xl) var(--space-lg)', marginTop: 'auto', marginBottom: 'auto' }}
      >
        <div style={{ fontSize: '48px', marginBottom: 'var(--space-md)' }}>🚧</div>
        <h2 className="heading-sm" style={{ marginBottom: 'var(--space-sm)' }}>Coming in Phase 2</h2>
        <p className="text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
          This feature is part of the next development phase. Stay tuned!
        </p>
      </motion.div>
      
      <Navbar />
    </div>
  );
}
