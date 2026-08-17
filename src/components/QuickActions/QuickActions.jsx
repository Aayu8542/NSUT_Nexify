import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { quickActions } from '../../data/mockData';
import './QuickActions.css';

const actionIcons = {
  send: (
    <svg viewBox="0 0 24 24">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  request: (
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  split: (
    <svg viewBox="0 0 24 24">
      <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">
      <motion.div
        className="quick-actions-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {quickActions.map((action) => (
          <motion.button
            key={action.id}
            className="quick-action-item"
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.route)}
          >
            <div
              className="quick-action-icon"
              style={{ background: action.color }}
            >
              {actionIcons[action.icon]}
            </div>
            <span className="quick-action-label">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
