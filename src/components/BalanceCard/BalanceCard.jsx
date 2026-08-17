import { motion } from 'framer-motion';
import { user, balance } from '../../data/mockData';
import './BalanceCard.css';

export default function BalanceCard() {
  return (
    <motion.div
      className="balance-card"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        className="balance-greeting"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.85, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {user.greeting}, {user.name} 👋
      </motion.p>

      <p className="balance-label">Available Balance</p>

      <motion.h2
        className="balance-amount"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="currency">₹</span>
        {balance.available.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </motion.h2>

      <motion.div
        className="balance-gold-line"
        initial={{ width: 0 }}
        animate={{ width: 40 }}
        transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="balance-card-dots">
        <span className="balance-dot active" />
        <span className="balance-dot" />
        <span className="balance-dot" />
      </div>
    </motion.div>
  );
}
