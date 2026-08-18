import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSplits } from '../../context/SplitContext';
import SplitCard from '../../components/SplitCard/SplitCard';
import '../../styles/page-layout.css';
import './SplitBill.css';

export default function SplitBill() {
  const navigate = useNavigate();
  const { splits } = useSplits();

  return (
    <div className="split-bill-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="page-title">Split Expenses</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          className="btn-primary create-split-btn"
          onClick={() => navigate('/split/create')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Split
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="section-label">Recent Splits</h3>
        <div className="splits-list">
          {splits.map((split, i) => (
            <motion.div
              key={split.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <SplitCard split={split} />
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
