import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { contacts, meContact } from '../../data/mockData';
import ContactMultiSelect from '../../components/ContactMultiSelect/ContactMultiSelect';
import '../../styles/page-layout.css';
import '../SendMoney/SendMoney.css';
import './AddFriends.css';

const splitContacts = [
  meContact,
  ...contacts.filter((c) =>
    ['Rahul Sharma', 'Priya Desai', 'Ankit Verma'].includes(c.name)
  ),
];

export default function AddFriends() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState(['usr_001']);

  const { billName, totalAmount } = location.state || {};

  if (!billName || !totalAmount) {
    return <Navigate to="/split/create" replace />;
  }

  const filteredContacts = splitContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.upi && c.upi.toLowerCase().includes(search.toLowerCase()))
  );

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedIds.length >= 2) {
      const selectedContacts = splitContacts.filter((c) =>
        selectedIds.includes(c.id)
      );
      navigate('/split/create/result', {
        state: { billName, totalAmount, selectedContacts },
      });
    }
  };

  return (
    <div className="add-friends-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">Add Friends</h1>
      </div>

      <motion.div
        className="split-summary-chip"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="chip-name">{billName}</span>
        <span className="chip-amount">
          ₹{totalAmount.toLocaleString('en-IN')}
        </span>
      </motion.div>

      <motion.div
        className="search-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="search-input-wrapper">
          <div className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search contacts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="section-label">Select Friends</h3>
        <ContactMultiSelect
          contacts={filteredContacts}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />
      </motion.div>

      <motion.div
        className="bottom-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="selected-count">
          {selectedIds.length} selected
        </p>
        <button
          className="btn-primary"
          onClick={handleContinue}
          disabled={selectedIds.length < 2}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
