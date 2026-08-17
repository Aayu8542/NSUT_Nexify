import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { transactions } from '../../data/mockData';
import './TransactionList.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TransactionList() {
  const navigate = useNavigate();

  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <h3 className="transaction-list-title">Recent Activity</h3>
        <button
          className="transaction-list-see-all"
          onClick={() => navigate('/profile/transactions')}
        >
          See All
        </button>
      </div>

      <motion.div
        className="transaction-items"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {transactions.map((txn) => (
          <motion.div
            key={txn.id}
            className="transaction-item"
            variants={itemVariants}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="transaction-avatar"
              style={{ background: txn.avatarColor }}
            >
              {txn.initials}
            </div>

            <div className="transaction-info">
              <p className="transaction-name">{txn.name}</p>
              <p className="transaction-category">{txn.category}</p>
            </div>

            <div className="transaction-right">
              <p className={`transaction-amount ${txn.type}`}>
                {txn.formatted}
              </p>
              <p className="transaction-time">{txn.time}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
