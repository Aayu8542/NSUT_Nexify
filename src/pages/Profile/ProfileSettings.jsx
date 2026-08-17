import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import '../../styles/page-layout.css';
import './ProfileSettings.css';

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      className={`toggle ${enabled ? 'on' : ''}`}
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
    >
      <span className="toggle-thumb" />
    </button>
  );
}

const settingSections = [
  {
    title: 'Account',
    items: [
      { id: 'edit_profile', label: 'Edit Profile', type: 'link' },
      { id: 'change_pin', label: 'Change PIN', type: 'link' },
      { id: 'linked_accounts', label: 'Linked Bank Accounts', type: 'link' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { id: 'push', label: 'Push Notifications', type: 'toggle', default: true },
      { id: 'email', label: 'Email Alerts', type: 'toggle', default: true },
      { id: 'sms', label: 'SMS Alerts', type: 'toggle', default: false },
      { id: 'txn_alerts', label: 'Transaction Alerts', type: 'toggle', default: true },
    ],
  },
  {
    title: 'Security',
    items: [
      { id: 'biometric', label: 'Biometric Login', type: 'toggle', default: true },
      { id: 'two_factor', label: 'Two-Factor Authentication', type: 'toggle', default: false },
      { id: 'session', label: 'Active Sessions', type: 'link' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'language', label: 'Language', type: 'value', value: 'English' },
      { id: 'currency', label: 'Currency', type: 'value', value: 'INR (₹)' },
      { id: 'dark_mode', label: 'Dark Mode', type: 'toggle', default: false },
    ],
  },
];

export default function ProfileSettings() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [toggles, setToggles] = useState(() => {
    const initial = {};
    settingSections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.type === 'toggle') {
          initial[item.id] = item.default;
        }
      });
    });
    return initial;
  });

  const handleToggle = (id, value) => {
    setToggles((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="profile-settings-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/profile')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">Settings</h1>
      </div>

      <motion.div
        className="settings-user-chip"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="settings-avatar">{currentUser.name.charAt(0)}</div>
        <div>
          <p className="settings-user-name">{currentUser.fullName}</p>
          <p className="settings-user-email">{currentUser.email || 'aarav.sharma@email.com'}</p>
        </div>
      </motion.div>

      {settingSections.map((section, si) => (
        <motion.div
          key={section.title}
          className="settings-section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * si }}
        >
          <h3 className="settings-section-title">{section.title}</h3>
          <div className="settings-list">
            {section.items.map((item) => (
              <div key={item.id} className="settings-item">
                <span className="settings-item-label">{item.label}</span>
                {item.type === 'toggle' && (
                  <Toggle
                    enabled={toggles[item.id]}
                    onChange={(v) => handleToggle(item.id, v)}
                  />
                )}
                {item.type === 'value' && (
                  <span className="settings-item-value">{item.value}</span>
                )}
                {item.type === 'link' && (
                  <svg className="settings-item-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <p className="settings-version">Clarity Bank v1.0.0</p>
    </div>
  );
}
