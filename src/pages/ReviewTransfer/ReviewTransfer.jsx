import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ReviewTransfer.css';

export default function ReviewTransfer() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state;
  if (!state || !state.contact || !state.amount) {
    return <Navigate to="/send" replace />;
  }

  const { contact, amount, note } = state;

  const handleConfirm = () => {
    // Simulate API call and success
    navigate('/send/success', { 
      state: { 
        transaction: {
          id: 'TRX' + Math.floor(Math.random() * 1000000000),
          amount: amount.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
          recipientName: contact.name,
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          note
        }
      },
      replace: true
    });
  };

  return (
    <div className="review-transfer-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">Review Transfer</h1>
      </div>

      <motion.div 
        className="review-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="review-amount-section">
          <p className="review-amount-label">Amount</p>
          <h2 className="review-amount">
            <span className="currency">₹</span>
            {amount.toLocaleString('en-IN')}
          </h2>
        </div>

        <div className="review-details">
          <div className="review-row">
            <span className="review-label">To</span>
            <span className="review-value">{contact.name}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Transfer Fee</span>
            <span className="review-value free">₹0 (Free)</span>
          </div>
          <div className="review-row">
            <span className="review-label">Bank</span>
            <span className="review-value">Clarity Savings</span>
          </div>
          <div className="review-row">
            <span className="review-label">Expected Delivery</span>
            <span className="review-value">Instant</span>
          </div>
          {note && (
            <div className="review-row">
              <span className="review-label">Note</span>
              <span className="review-value">{note}</span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div 
        className="bottom-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button className="btn-primary" onClick={handleConfirm}>
          Confirm Transfer
        </button>
      </motion.div>
    </div>
  );
}
