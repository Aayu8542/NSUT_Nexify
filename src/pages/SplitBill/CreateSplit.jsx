import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/page-layout.css';
import './CreateSplit.css';

export default function CreateSplit() {
  const navigate = useNavigate();
  const [billName, setBillName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setAmount(val);
  };

  const handleContinue = () => {
    if (billName.trim() && Number(amount) > 0) {
      navigate('/split/create/friends', {
        state: {
          billName: billName.trim(),
          totalAmount: Number(amount),
        },
      });
    }
  };

  const isValid = billName.trim() && Number(amount) > 0;

  return (
    <div className="create-split-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">Create Split</h1>
      </div>

      <motion.div
        className="create-split-form"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="form-group">
          <label className="form-label">Bill Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Dinner at BBQ Nation"
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Total Amount</label>
          <div className="amount-field">
            <span className="amount-prefix">₹</span>
            <input
              type="text"
              inputMode="numeric"
              className="amount-field-input"
              placeholder="4,000"
              value={amount ? Number(amount).toLocaleString('en-IN') : ''}
              onChange={handleAmountChange}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bottom-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={!isValid}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
