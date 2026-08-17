import { motion } from 'framer-motion';
import './ReceiptCard.css';

export default function ReceiptCard({ transaction }) {
  return (
    <motion.div
      className="receipt-card"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="receipt-dash-line"></div>
      
      <div className="receipt-amount-container">
        <p className="text-secondary">Amount Sent</p>
        <h2 className="receipt-amount">
          <span className="currency">₹</span>
          {transaction.amount}
        </h2>
      </div>

      <div className="receipt-details">
        <div className="receipt-row">
          <span className="receipt-label">To</span>
          <span className="receipt-value">{transaction.recipientName}</span>
        </div>
        <div className="receipt-row">
          <span className="receipt-label">Transaction ID</span>
          <span className="receipt-value">{transaction.id}</span>
        </div>
        <div className="receipt-row">
          <span className="receipt-label">Time</span>
          <span className="receipt-value">{transaction.time}</span>
        </div>
        <div className="receipt-row">
          <span className="receipt-label">Fee</span>
          <span className="receipt-value">₹0.00</span>
        </div>
      </div>
    </motion.div>
  );
}
