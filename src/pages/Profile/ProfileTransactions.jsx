import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { transactions } from '../../data/mockData';
import '../../styles/page-layout.css';
import '../SendMoney/SendMoney.css';
import './ProfileTransactions.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProfileTransactions() {
  const navigate = useNavigate();

  const totalDeposits = transactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="profile-transactions-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/profile')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">Transactions</h1>
      </div>

      <motion.div
        className="txn-summary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="txn-summary-item">
          <span className="txn-summary-label">Deposits</span>
          <span className="txn-summary-value credit">
            + ₹{totalDeposits.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="txn-summary-divider" />
        <div className="txn-summary-item">
          <span className="txn-summary-label">Withdrawals</span>
          <span className="txn-summary-value debit">
            - ₹{totalWithdrawals.toLocaleString('en-IN')}
          </span>
        </div>
      </motion.div>

      <h3 className="section-label">All Transactions</h3>

      <motion.div
        className="txn-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {transactions.map((txn) => (
          <motion.div
            key={txn.id}
            className="txn-item"
            variants={itemVariants}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="txn-avatar"
              style={{ background: txn.avatarColor }}
            >
              {txn.initials}
            </div>
            <div className="txn-info">
              <p className="txn-name">{txn.name}</p>
              <p className="txn-meta">
                {txn.category} · {new Date(txn.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })}
              </p>
            </div>
            <div className="txn-right">
              <p className={`txn-amount ${txn.type}`}>{txn.formatted}</p>
              <p className="txn-time">{txn.time}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
