import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSavings } from '../../context/SavingsContext';
import ProgressRing from '../../components/ProgressRing/ProgressRing';
import './GoalDetails.css';

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getGoalById, updateGoal, calculateSuggestions } = useSavings();

  const goal = getGoalById(id);
  const [addAmount, setAddAmount] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!goal) {
    return (
      <div className="goal-details-page">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate('/savings')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="page-title">Goal Not Found</h1>
        </div>
      </div>
    );
  }

  const suggestions = calculateSuggestions(goal);
  const amountRemaining = goal.target - goal.saved;

  const handleAddAmount = (e) => {
    e.preventDefault();
    const amount = parseFloat(addAmount);

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    updateGoal(id, {
      saved: goal.saved + amount,
    });

    setAddAmount('');
    setShowAddForm(false);
  };

  return (
    <div className="goal-details-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button className="back-btn" onClick={() => navigate('/savings')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="page-title">{goal.name}</h1>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        className="progress-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="progress-ring-container">
          <ProgressRing
            radius={80}
            stroke={8}
            progress={goal.percentage}
            color="#1F5C4A"
          >
            <div className="progress-content">
              <span className="progress-icon">{goal.icon}</span>
              <span className="progress-percentage">{goal.percentage}%</span>
            </div>
          </ProgressRing>
        </div>

        <div className="progress-info">
          <h3 className="progress-amount">
            ₹{goal.saved.toLocaleString('en-IN')} / ₹{goal.target.toLocaleString('en-IN')}
          </h3>
          <p className="progress-label">Saved towards your goal</p>
        </div>
      </motion.div>

      {/* Target Info */}
      <motion.div
        className="target-info"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="info-row">
          <span className="info-label">Target Amount</span>
          <span className="info-value">₹{goal.target.toLocaleString('en-IN')}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Target Date</span>
          <span className="info-value">
            {new Date(goal.deadline).toLocaleDateString('en-IN', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Remaining</span>
          <span className="info-value remaining">
            ₹{amountRemaining.toLocaleString('en-IN')}
          </span>
        </div>
      </motion.div>

      {/* Smart Suggestions Card */}
      {suggestions.achievable ? (
        <motion.div
          className="suggestions-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="suggestions-header">
            <span className="suggestions-icon">💡</span>
            <h3 className="suggestions-title">Smart Suggestion</h3>
          </div>

          <div className="suggestions-content">
            <p className="suggestion-amount">
              Save <span className="amount">₹{suggestions.monthlySavings.toLocaleString('en-IN')}</span> / month
            </p>
            <p className="suggestion-text">
              Goal achievable in {suggestions.monthsRemaining} month{suggestions.monthsRemaining !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="suggestion-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${goal.percentage}%` }}></div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="suggestions-card warning"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="suggestions-header">
            <span className="suggestions-icon">⏰</span>
            <h3 className="suggestions-title">Goal Deadline Passed</h3>
          </div>
          <p className="suggestion-text">This goal's deadline has passed. Consider updating the target date.</p>
        </motion.div>
      )}

      {/* Add Funds Section */}
      <motion.div
        className="add-funds-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {!showAddForm ? (
          <button
            className="btn-primary add-funds-btn"
            onClick={() => setShowAddForm(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Funds
          </button>
        ) : (
          <form onSubmit={handleAddAmount} className="add-funds-form">
            <div className="form-row">
              <div className="input-wrapper">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="Amount"
                  className="amount-input"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn-primary">
                Add
              </button>
            </div>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setShowAddForm(false);
                setAddAmount('');
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </motion.div>

      {/* Milestone Progress */}
      <motion.div
        className="milestones-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="section-title">Progress Milestones</h3>
        <div className="milestones-list">
          {[25, 50, 75, 100].map((milestone) => (
            <div key={milestone} className="milestone">
              <div className="milestone-marker" style={{
                background: goal.percentage >= milestone ? 'var(--color-accent-green)' : 'var(--color-border-light)',
              }}>
                {goal.percentage >= milestone && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                )}
              </div>
              <p className="milestone-label">{milestone}%</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
