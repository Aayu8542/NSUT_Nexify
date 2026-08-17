import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReceiptCard from '../../components/ReceiptCard/ReceiptCard';
import './TransferSuccess.css';

export default function TransferSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;
  if (!state || !state.transaction) {
    return <Navigate to="/dashboard" replace />;
  }

  const { transaction } = state;

  const handleShareReceipt = () => {
    const receiptText = `Transfer Receipt\n\nTo: ${transaction.recipientName}\nAmount: ₹${transaction.amount}\nTransaction ID: ${transaction.id}\nTime: ${transaction.time}\nFee: ₹0.00`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(receiptText).then(() => {
      alert('Receipt copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy receipt');
    });
  };

  return (
    <div className="transfer-success-page">
      <motion.div
        className="success-animation-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M20 6L9 17l-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </svg>
      </motion.div>

      <motion.h1 
        className="success-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Transfer Successful
      </motion.h1>

      <ReceiptCard transaction={transaction} />

      <motion.div 
        className="success-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button className="btn-secondary" onClick={handleShareReceipt}>
          Share Receipt
        </button>
        <button className="btn-primary" onClick={() => navigate('/dashboard')}>
          Back Home
        </button>
      </motion.div>
    </div>
  );
}
