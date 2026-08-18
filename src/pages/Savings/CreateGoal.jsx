import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSavings } from '../../context/SavingsContext';
import './CreateGoal.css';

const goalEmojis = [
  { emoji: '💻', name: 'Laptop' },
  { emoji: '🏖️', name: 'Vacation' },
  { emoji: '🏠', name: 'Home' },
  { emoji: '📚', name: 'Education' },
  { emoji: '🚗', name: 'Car' },
  { emoji: '💍', name: 'Ring' },
  { emoji: '🎮', name: 'Gaming' },
  { emoji: '✈️', name: 'Travel' },
  { emoji: '📱', name: 'Phone' },
  { emoji: '👗', name: 'Fashion' },
  { emoji: '🏋️', name: 'Fitness' },
  { emoji: '🎸', name: 'Music' },
];

export default function CreateGoal() {
  const navigate = useNavigate();
  const { addGoal } = useSavings();

  const [formData, setFormData] = useState({
    name: '',
    target: '',
    deadline: '',
    icon: '🎯',
  });

  const [selectedEmoji, setSelectedEmoji] = useState('🎯');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setFormData((prev) => ({
      ...prev,
      icon: emoji,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.target || !formData.deadline) {
      alert('Please fill in all fields');
      return;
    }

    const newGoal = {
      name: formData.name,
      target: parseInt(formData.target),
      deadline: formData.deadline,
      icon: formData.icon,
      saved: 0,
      percentage: 0,
    };

    addGoal(newGoal);
    navigate('/savings');
  };

  return (
    <div className="create-goal-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">Create New Goal</h1>
      </motion.div>

      <motion.form
        className="create-goal-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Goal Icon Selection */}
        <div className="form-section">
          <label className="form-label">Choose an Icon</label>
          <div className="emoji-grid">
            {goalEmojis.map((item) => (
              <motion.button
                key={item.emoji}
                type="button"
                className={`emoji-button ${selectedEmoji === item.emoji ? 'active' : ''}`}
                onClick={() => handleEmojiSelect(item.emoji)}
                whileTap={{ scale: 0.9 }}
              >
                <span className="emoji-text">{item.emoji}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Goal Name */}
        <div className="form-section">
          <label htmlFor="name" className="form-label">
            Goal Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., MacBook Air"
            className="form-input"
          />
        </div>

        {/* Target Amount */}
        <div className="form-section">
          <label htmlFor="target" className="form-label">
            Target Amount (₹)
          </label>
          <div className="input-with-prefix">
            <span className="currency-symbol">₹</span>
            <input
              type="number"
              id="target"
              name="target"
              value={formData.target}
              onChange={handleInputChange}
              placeholder="80,000"
              className="form-input"
            />
          </div>
        </div>

        {/* Target Date */}
        <div className="form-section">
          <label htmlFor="deadline" className="form-label">
            Target Date
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        {/* Preview */}
        {formData.name && formData.target && (
          <motion.div
            className="goal-preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="preview-title">Preview</h3>
            <div className="preview-card">
              <div className="preview-icon">{formData.icon}</div>
              <div className="preview-content">
                <p className="preview-name">{formData.name}</p>
                <p className="preview-amount">₹{parseInt(formData.target).toLocaleString('en-IN')}</p>
                {formData.deadline && (
                  <p className="preview-date">
                    Target: {new Date(formData.deadline).toLocaleDateString('en-IN', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Goal
          </button>
        </div>
      </motion.form>
    </div>
  );
}
