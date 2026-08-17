import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SplitCard.css';

export default function SplitCard({ split }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="split-card"
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/split/${split.id}`)}
    >
      <div className="split-header">
        <h4 className="split-title">{split.title}</h4>
        <span className="split-amount">{split.formatted}</span>
      </div>
      
      <div className="split-footer">
        <p className="split-status">
          <span>{split.paidCount}</span> of {split.totalCount} paid
        </p>
        
        <div className="split-avatars">
          {split.participants.slice(0, 4).map((p, i) => (
            <div key={p.id || i} className={`split-avatar ${p.paid ? 'paid' : ''}`}>
              {(p.name === 'Me' ? 'M' : p.name.charAt(0)).toUpperCase()}
            </div>
          ))}
          {split.participants.length > 4 && (
            <div className="split-avatar">
              +{split.participants.length - 4}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
