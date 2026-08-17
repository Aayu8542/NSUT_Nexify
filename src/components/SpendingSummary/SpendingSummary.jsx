import { motion } from 'framer-motion';
import { monthlySpending } from '../../data/mockData';
import './SpendingSummary.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SpendingSummary() {
  return (
    <div className="spending-summary">
      <motion.div
        className="spending-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="spending-header">
          <div className="spending-header-left">
            <h3>Spent This Month</h3>
            <p className="spending-total">{monthlySpending.formatted}</p>
          </div>
          <span className="spending-badge">↑ 12%</span>
        </div>

        <motion.div
          className="spending-categories"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {monthlySpending.categories.map((cat) => (
            <motion.div key={cat.id} className="spending-category" variants={itemVariants}>
              <div
                className="spending-cat-icon"
                style={{ background: `${cat.color}14` }}
              >
                {cat.icon}
              </div>
              <div className="spending-cat-info">
                <div className="spending-cat-row">
                  <span className="spending-cat-name">{cat.name}</span>
                  <span className="spending-cat-amount">{cat.formatted}</span>
                </div>
                <div className="spending-bar-track">
                  <motion.div
                    className="spending-bar-fill"
                    style={{ background: cat.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: cat.percentage / 100 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
