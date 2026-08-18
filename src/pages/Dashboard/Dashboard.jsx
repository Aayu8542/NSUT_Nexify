import { motion } from 'framer-motion';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import QuickActions from '../../components/QuickActions/QuickActions';
import SpendingSummary from '../../components/SpendingSummary/SpendingSummary';
import TransactionList from '../../components/TransactionList/TransactionList';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <BalanceCard />
      <QuickActions />
      <SpendingSummary />
      <TransactionList />
    </div>
  );
}
