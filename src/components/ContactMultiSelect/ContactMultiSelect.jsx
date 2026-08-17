import { motion } from 'framer-motion';
import './ContactMultiSelect.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactMultiSelect({ contacts, selectedIds, onToggle }) {
  return (
    <motion.div
      className="contact-multi-select"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {contacts.map((contact) => {
        const isSelected = selectedIds.includes(contact.id);
        const displayName = contact.isMe ? 'Me' : contact.name.split(' ')[0];

        return (
          <motion.div
            key={contact.id}
            className={`contact-multi-item ${isSelected ? 'selected' : ''}`}
            variants={itemVariants}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(contact.id)}
          >
            <div
              className="contact-avatar"
              style={{ background: contact.avatarColor }}
            >
              {contact.initials}
            </div>
            <div className="contact-info">
              <p className="contact-name">{displayName}</p>
              {!contact.isMe && (
                <p className="contact-upi">{contact.upi}</p>
              )}
            </div>
            <div className={`contact-checkbox ${isSelected ? 'checked' : ''}`}>
              {isSelected && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
