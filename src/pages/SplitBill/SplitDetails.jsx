import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSplits } from '../../context/SplitContext';
import Navbar from '../../components/Navbar/Navbar';
import '../../styles/page-layout.css';
import './SplitDetails.css';

function formatAmount(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function SplitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSplitById } = useSplits();

  const split = getSplitById(id);

  if (!split) {
    return (
      <div className="split-details-page">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate('/split')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="page-title">Split Not Found</h1>
        </div>
        <Navbar />
      </div>
    );
  }

  const shareAmount = Math.round(split.totalAmount / split.totalCount);

  return (
    <div className="split-details-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/split')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">{split.title}</h1>
      </div>

      <motion.div
        className="split-details-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="details-amount-section">
          <p className="details-amount-label">Total Bill</p>
          <h2 className="details-amount">{split.formatted}</h2>
          <p className="details-share">{formatAmount(shareAmount)} each</p>
        </div>

        <div className="details-meta">
          <div className="details-row">
            <span className="details-label">Created by</span>
            <span className="details-value">{split.createdBy}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Date</span>
            <span className="details-value">
              {new Date(split.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="details-row">
            <span className="details-label">Status</span>
            <span className="details-value">
              {split.paidCount} of {split.totalCount} paid
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <h3 className="section-label">Participants</h3>
        <div className="participants-list">
          {split.participants.map((p, i) => (
            <motion.div
              key={p.id || i}
              className="participant-row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="participant-left">
                <div className="participant-avatar">
                  {(p.name === 'Me' ? 'M' : p.name.charAt(0)).toUpperCase()}
                </div>
                <div>
                  <p className="participant-name">{p.name}</p>
                  <p className="participant-amount">{formatAmount(p.amount)}</p>
                </div>
              </div>
              <span className={`status-badge ${p.paid ? 'paid' : 'pending'}`}>
                {p.paid ? 'Paid' : 'Pending'}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {split.paidCount < split.totalCount && (
        <motion.div
          className="bottom-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button className="btn-primary" onClick={() => {}}>
            Send Reminders
          </button>
        </motion.div>
      )}

      <Navbar />
    </div>
  );
}
