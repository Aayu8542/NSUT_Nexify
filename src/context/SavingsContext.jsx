import { createContext, useContext, useState } from 'react';
import { savingsGoals as initialGoals } from '../data/mockData';

const SavingsContext = createContext(null);

export function SavingsProvider({ children }) {
  const [goals, setGoals] = useState(initialGoals);

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: `goal_${Date.now()}`,
      saved: 0,
      percentage: 0,
    };
    setGoals((prev) => [newGoal, ...prev]);
    return newGoal;
  };

  const getGoalById = (id) => goals.find((g) => g.id === id);

  const updateGoal = (id, updates) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              ...updates,
              percentage: Math.round(((updates.saved || goal.saved) / goal.target) * 100),
            }
          : goal
      )
    );
  };

  const calculateSuggestions = (goal) => {
    const deadlineDate = new Date(goal.deadline);
    const today = new Date();
    const daysRemaining = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    const monthsRemaining = Math.ceil(daysRemaining / 30);
    const amountRemaining = goal.target - goal.saved;
    const monthlySavings = Math.ceil(amountRemaining / Math.max(monthsRemaining, 1));

    return {
      monthlySavings,
      monthsRemaining: Math.max(monthsRemaining, 0),
      achievable: daysRemaining > 0,
    };
  };

  return (
    <SavingsContext.Provider value={{ goals, addGoal, getGoalById, updateGoal, calculateSuggestions }}>
      {children}
    </SavingsContext.Provider>
  );
}

export function useSavings() {
  const ctx = useContext(SavingsContext);
  if (!ctx) throw new Error('useSavings must be used within SavingsProvider');
  return ctx;
}
