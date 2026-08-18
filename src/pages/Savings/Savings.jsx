import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSavings } from '../../context/SavingsContext';
import GoalCard from '../../components/GoalCard/GoalCard';
import './Savings.css';

export default function Savings() {
  const navigate = useNavigate();
  const { goals } = useSavings();

  const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const overallPercentage = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <div className="savings-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="page-title">Savings Goals</h1>
      </motion.div>

      <motion.div
        className="savings-overview"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="overview-card">
          <p className="overview-label">Total Savings Progress</p>
          <h2 className="overview-amount">
            ₹{totalSaved.toLocaleString('en-IN')}
          </h2>
          <p className="overview-target">
            of ₹{totalTarget.toLocaleString('en-IN')}
          </p>
          <div className="overview-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${overallPercentage}%` }}></div>
            </div>
            <span className="progress-label">{overallPercentage}% Complete</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="goals-header">
          <h3 className="section-label">Your Goals</h3>
          <button
            className="btn-secondary"
            onClick={() => navigate('/savings/create')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-icon">🎯</div>
            <h3>No Goals Yet</h3>
            <p>Start saving by creating your first financial goal!</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/savings/create')}
            >
              Create Your First Goal
            </button>
          </motion.div>
        ) : (
          <div className="goals-grid">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
