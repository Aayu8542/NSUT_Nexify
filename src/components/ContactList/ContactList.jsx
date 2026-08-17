import { motion } from 'framer-motion';
import './ContactList.css';

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

export default function ContactList({ contacts, onSelect }) {
  return (
    <motion.div
      className="contact-list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {contacts.map((contact) => (
        <motion.div
          key={contact.id}
          className="contact-item"
          variants={itemVariants}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(contact)}
        >
          <div
            className="contact-avatar"
            style={{ background: contact.avatarColor }}
          >
            {contact.initials}
          </div>
          <div className="contact-info">
            <p className="contact-name">{contact.name}</p>
            <p className="contact-upi">{contact.upi}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
