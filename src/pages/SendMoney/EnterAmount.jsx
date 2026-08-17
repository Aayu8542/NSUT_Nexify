import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './EnterAmount.css';

export default function EnterAmount() {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const contact = location.state?.contact;

  if (!contact) {
    return <Navigate to="/send" replace />;
  }

  const handleContinue = () => {
    if (Number(amount) > 0) {
      navigate('/send/review', { 
        state: { 
          contact, 
          amount: Number(amount), 
          note 
        } 
      });
    }
  };

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setAmount(val);
  };

  return (
    <div className="enter-amount-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <motion.div 
        className="selected-contact-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          className="contact-avatar"
          style={{ background: contact.avatarColor, width: 40, height: 40, fontSize: 14 }}
        >
          {contact.initials}
        </div>
        <div className="contact-info">
          <p className="contact-name">{contact.name}</p>
          <p className="contact-upi">{contact.upi}</p>
        </div>
      </motion.div>

      <motion.div 
        className="amount-input-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span className="amount-currency">₹</span>
        <input
          type="text"
          inputMode="numeric"
          className="amount-input"
          placeholder="0"
          value={amount}
          onChange={handleAmountChange}
          autoFocus
        />
      </motion.div>

      <motion.div 
        className="note-input-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          className="note-input"
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </motion.div>

      <motion.div 
        className="bottom-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button 
          className="btn-primary" 
          onClick={handleContinue}
          disabled={!amount || Number(amount) <= 0}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
