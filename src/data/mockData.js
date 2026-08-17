/* Mock data for Clarity Bank Phase 1 */

export const user = {
  id: 'usr_001',
  name: 'Aarav',
  fullName: 'Aarav Sharma',
  phone: '+91 98765 43210',
  avatar: null,
  greeting: 'Good Morning',
};

export const balance = {
  available: 42680.50,
  formatted: '₹42,680.50',
  currency: 'INR',
  symbol: '₹',
};

export const monthlySpending = {
  total: 18240,
  formatted: '₹18,240',
  month: 'August',
  categories: [
    {
      id: 'cat_food',
      name: 'Food',
      amount: 5640,
      formatted: '₹5,640',
      color: '#EF8B4F',
      icon: '🍔',
      percentage: 31,
    },
    {
      id: 'cat_shopping',
      name: 'Shopping',
      amount: 4980,
      formatted: '₹4,980',
      color: '#6C63FF',
      icon: '🛍️',
      percentage: 27,
    },
    {
      id: 'cat_travel',
      name: 'Travel',
      amount: 4120,
      formatted: '₹4,120',
      color: '#3B82F6',
      icon: '✈️',
      percentage: 23,
    },
    {
      id: 'cat_bills',
      name: 'Bills',
      amount: 3500,
      formatted: '₹3,500',
      color: '#F59E0B',
      icon: '📄',
      percentage: 19,
    },
  ],
};

export const transactions = [
  {
    id: 'txn_001',
    name: 'Rahul Sharma',
    type: 'debit',
    amount: 2500,
    formatted: '- ₹2,500',
    date: '2026-08-17',
    time: '2:30 PM',
    category: 'Transfer',
    initials: 'RS',
    avatarColor: '#6C63FF',
  },
  {
    id: 'txn_002',
    name: 'Netflix',
    type: 'debit',
    amount: 649,
    formatted: '- ₹649',
    date: '2026-08-16',
    time: '10:00 AM',
    category: 'Entertainment',
    initials: 'NF',
    avatarColor: '#E50914',
  },
  {
    id: 'txn_003',
    name: 'Salary Credited',
    type: 'credit',
    amount: 45000,
    formatted: '+ ₹45,000',
    date: '2026-08-15',
    time: '9:00 AM',
    category: 'Income',
    initials: 'SC',
    avatarColor: '#22C55E',
  },
  {
    id: 'txn_004',
    name: 'Amazon',
    type: 'debit',
    amount: 1299,
    formatted: '- ₹1,299',
    date: '2026-08-14',
    time: '4:15 PM',
    category: 'Shopping',
    initials: 'AZ',
    avatarColor: '#FF9900',
  },
  {
    id: 'txn_005',
    name: 'Uber',
    type: 'debit',
    amount: 342,
    formatted: '- ₹342',
    date: '2026-08-13',
    time: '8:45 PM',
    category: 'Travel',
    initials: 'UB',
    avatarColor: '#1E1E1E',
  },
  {
    id: 'txn_006',
    name: 'Swiggy',
    type: 'debit',
    amount: 486,
    formatted: '- ₹486',
    date: '2026-08-12',
    time: '1:20 PM',
    category: 'Food',
    initials: 'SW',
    avatarColor: '#EF8B4F',
  },
];

export const quickActions = [
  {
    id: 'qa_send',
    label: 'Send Money',
    icon: 'send',
    route: '/send',
    color: '#1F5C4A',
  },
  {
    id: 'qa_request',
    label: 'Request',
    icon: 'request',
    route: '/send',
    color: '#D9A441',
  },
  {
    id: 'qa_split',
    label: 'Split Bill',
    icon: 'split',
    route: '/split',
    color: '#6C63FF',
  },
];

export const savingsGoals = [
  {
    id: 'goal_001',
    name: 'Vacation Fund',
    target: 50000,
    saved: 32500,
    percentage: 65,
    icon: '🏖️',
    deadline: '2026-12-31',
  },
  {
    id: 'goal_002',
    name: 'New Laptop',
    target: 80000,
    saved: 24000,
    percentage: 30,
    icon: '💻',
    deadline: '2027-03-15',
  },
];

export const activeSplits = [
  {
    id: 'split_001',
    title: 'Dinner at Olive',
    totalAmount: 4800,
    formatted: '₹4,800',
    participants: [
      { name: 'Aarav', paid: true, amount: 1200 },
      { name: 'Rahul', paid: true, amount: 1200 },
      { name: 'Priya', paid: false, amount: 1200 },
      { name: 'Neha', paid: false, amount: 1200 },
    ],
    paidCount: 2,
    totalCount: 4,
    createdBy: 'Aarav',
    date: '2026-08-16',
  },
];

export const navItems = [
  { id: 'home', label: 'Home', route: '/dashboard', icon: 'home' },
  { id: 'send', label: 'Send', route: '/send', icon: 'send' },
  { id: 'split', label: 'Split', route: '/split', icon: 'split' },
  { id: 'savings', label: 'Savings', route: '/savings', icon: 'savings' },
  { id: 'profile', label: 'Profile', route: '/dashboard', icon: 'profile' },
];

export const contacts = [
  {
    id: 'cnt_001',
    name: 'Rahul Sharma',
    upi: 'rahul.s@okhdfc',
    phone: '+91 9876543210',
    initials: 'RS',
    avatarColor: '#6C63FF',
    recent: true
  },
  {
    id: 'cnt_002',
    name: 'Priya Desai',
    upi: 'priya.d@okicici',
    phone: '+91 8765432109',
    initials: 'PD',
    avatarColor: '#EF8B4F',
    recent: true
  },
  {
    id: 'cnt_003',
    name: 'Aman Singh',
    upi: 'aman.s@okaxis',
    phone: '+91 7654321098',
    initials: 'AS',
    avatarColor: '#3B82F6',
    recent: true
  }
];
