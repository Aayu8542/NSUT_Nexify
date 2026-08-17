import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSplits } from '../../context/SplitContext';
import { user } from '../../data/mockData';
import '../../styles/page-layout.css';
import './SplitResult.css';

function formatAmount(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function SplitResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addSplit } = useSplits();

  const { billName, totalAmount, selectedContacts } = location.state || {};

  if (!billName || !totalAmount || !selectedContacts?.length) {
    return <Navigate to="/split/create" replace />;
  }

  const participantCount = selectedContacts.length;
  const shareAmount = Math.round(totalAmount / participantCount);

  const participants = selectedContacts.map((contact) => ({
    id: contact.id,
    name: contact.isMe ? 'Me' : contact.name.split(' ')[0],
    paid: contact.isMe,
    amount: shareAmount,
    isMe: contact.isMe || false,
    avatarColor: contact.avatarColor,
    initials: contact.initials,
  }));

  const paidCount = participants.filter((p) => p.paid).length;

  const handleSendRequests = () => {
    const newSplit = {
      id: `split_${Date.now()}`,
      title: billName,
      totalAmount,
      formatted: formatAmount(totalAmount),
      participants,
      paidCount,
      totalCount: participantCount,
      createdBy: user.name,
      date: new Date().toISOString().split('T')[0],
    };

    addSplit(newSplit);
    navigate('/split', { replace: true });
  };

  return (
    <div className="split-result-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">Split Result</h1>
      </div>

      <motion.div
        className="split-result-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="result-header">
          <h2 className="result-bill-name">{billName}</h2>
          <p className="result-total">{formatAmount(totalAmount)}</p>
        </div>

        <div className="result-share">
          <span className="share-label">Each person pays</span>
          <span className="share-amount">{formatAmount(shareAmount)}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <h3 className="section-label">Participants</h3>
        <div className="participants-list">
          {participants.map((p, i) => (
            <motion.div
              key={p.id}
              className="participant-row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="participant-left">
                <div
                  className="participant-avatar"
                  style={{ background: p.avatarColor }}
                >
                  {p.initials}
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

      <motion.div
        className="bottom-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button className="btn-primary" onClick={handleSendRequests}>
          Send Requests
        </button>
      </motion.div>
    </div>
  );
}
