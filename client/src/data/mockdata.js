export const userProfile = {
    id: 'usr_123456',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    profileImage: null,
    phoneNumber: '+1 (555) 123-4567',
    joinDate: '2024-05-15',
  };
  
  export const accountBalance = {
    balance: 8459.32,
    currency: 'USD',
    lastUpdated: '2025-05-20 09:32 AM',
  };
  
  export const recentTransactions = [
    {
      id: 'txn_12345',
      type: 'outgoing',
      amount: 42.99,
      currency: 'USD',
      description: 'Monthly subscription',
      merchant: 'Netflix',
      category: 'Entertainment',
      date: 'May 19, 2025',
      icon: 'wifi',
    },
    {
      id: 'txn_12346',
      type: 'outgoing',
      amount: 85.43,
      currency: 'USD',
      description: 'Grocery shopping',
      merchant: 'Whole Foods',
      category: 'Groceries',
      date: 'May 17, 2025',
      icon: 'card',
    },
    {
      id: 'txn_12347',
      type: 'incoming',
      amount: 2500.00,
      currency: 'USD',
      description: 'Salary deposit',
      merchant: 'ABC Company',
      category: 'Income',
      date: 'May 15, 2025',
      icon: 'calendar',
    },
    {
      id: 'txn_12348',
      type: 'outgoing',
      amount: 9.99,
      currency: 'USD',
      description: 'App subscription',
      merchant: 'Spotify',
      category: 'Entertainment',
      date: 'May 12, 2025',
      icon: 'mobile',
    },
    {
      id: 'txn_12349',
      type: 'outgoing',
      amount: 35.29,
      currency: 'USD',
      description: 'Transportation',
      merchant: 'Uber',
      category: 'Transport',
      date: 'May 10, 2025',
      icon: 'mobile',
    }
  ];
  
  export const cards = [
    {
      id: 'card_123',
      type: 'visa',
      last4: '4582',
      expiry: '05/28',
      color: 'bg-gray-800',
    },
    {
      id: 'card_124',
      type: 'mastercard',
      last4: '9845',
      expiry: '11/26',
      color: 'bg-black',
    }
  ];
  
  export const expenseAnalytics = {
    totalSpent: 1239.74,
    currency: 'USD',
    comparedToLastMonth: 12,
    categories: [
      {
        category: 'Housing',
        amount: 450.00,
        percentage: 36,
        color: '#374151',
      },
      {
        category: 'Food & Dining',
        amount: 320.50,
        percentage: 26,
        color: '#6B7280',
      },
      {
        category: 'Entertainment',
        amount: 145.99,
        percentage: 12,
        color: '#9CA3AF',
      },
      {
        category: 'Transport',
        amount: 110.25,
        percentage: 9,
        color: '#D1D5DB',
      },
      {
        category: 'Others',
        amount: 213.00,
        percentage: 17,
        color: '#F3F4F6',
      }
    ]
  };
  
  export const upcomingPayments = [
    {
      id: 'pmt_123',
      title: 'Netflix',
      amount: 15.99,
      currency: 'USD',
      dueDate: 'May 26',
      logo: 'https://images.pexels.com/photos/12009/netflix-logo-2015-transparent.png',
      type: 'subscription',
    },
    {
      id: 'pmt_124',
      title: 'Internet',
      amount: 79.99,
      currency: 'USD',
      dueDate: 'May 28',
      logo: 'https://images.pexels.com/photos/12009/at-t-logo.png',
      type: 'bill',
    },
    {
      id: 'pmt_125',
      title: 'Apple Music',
      amount: 9.99,
      currency: 'USD',
      dueDate: 'Jun 02',
      logo: 'https://images.pexels.com/photos/12009/apple-music-logo.png',
      type: 'subscription',
    }
  ];