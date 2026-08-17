import { createContext, useContext, useState } from 'react';
import { activeSplits as initialSplits } from '../data/mockData';

const SplitContext = createContext(null);

export function SplitProvider({ children }) {
  const [splits, setSplits] = useState(initialSplits);

  const addSplit = (split) => {
    setSplits((prev) => [split, ...prev]);
  };

  const getSplitById = (id) => splits.find((s) => s.id === id);

  return (
    <SplitContext.Provider value={{ splits, addSplit, getSplitById }}>
      {children}
    </SplitContext.Provider>
  );
}

export function useSplits() {
  const ctx = useContext(SplitContext);
  if (!ctx) throw new Error('useSplits must be used within SplitProvider');
  return ctx;
}
