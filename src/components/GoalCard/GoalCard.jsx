import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProgressRing from '../ProgressRing/ProgressRing';
import './GoalCard.css';

export default function GoalCard({ goal }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="goal-card"
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/savings/${goal.id}`)}
    >
      <ProgressRing radius={28} stroke={4} progress={goal.percentage} color="#1F5C4A">
        <span className="goal-icon">{goal.icon}</span>
      </ProgressRing>
      
      <div className="goal-info">
        <p className="goal-name">{goal.name}</p>
        <p className="goal-target">
          ₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()}
        </p>
      </div>

      <div className="goal-progress-text">
        {goal.percentage}%
      </div>
    </motion.div>
  );
}
