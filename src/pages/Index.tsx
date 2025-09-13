import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionsList } from "@/components/TransactionsList";
import { Charts } from "@/components/Charts";
import { GoalTracking } from "@/components/GoalTracking";
import { BudgetAlerts } from "@/components/BudgetAlerts";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  icon: string;
}

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('finsmartai-transactions');
    const savedGoals = localStorage.getItem('finsmartai-goals');
    const savedDarkMode = localStorage.getItem('finsmartai-darkmode');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Initialize with sample data
      const sampleTransactions: Transaction[] = [
        {
          id: '1',
          description: 'Grocery shopping at Walmart',
          amount: 85.50,
          date: '2024-01-15',
          category: 'Groceries'
        },
        {
          id: '2',
          description: 'Netflix subscription',
          amount: 15.99,
          date: '2024-01-14',
          category: 'Entertainment'
        },
        {
          id: '3',
          description: 'Electric bill payment',
          amount: 120.00,
          date: '2024-01-13',
          category: 'Utilities'
        },
        {
          id: '4',
          description: 'Lunch at Italian restaurant',
          amount: 32.75,
          date: '2024-01-12',
          category: 'Dining'
        },
        {
          id: '5',
          description: 'Uber ride to airport',
          amount: 45.20,
          date: '2024-01-11',
          category: 'Transportation'
        }
      ];
      setTransactions(sampleTransactions);
    }

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      // Initialize with sample goals
      const sampleGoals: Goal[] = [
        {
          id: '1',
          name: 'Emergency Fund',
          targetAmount: 10000,
          savedAmount: 3500,
          icon: 'emergency'
        },
        {
          id: '2',
          name: 'Vacation to Europe',
          targetAmount: 5000,
          savedAmount: 1200,
          icon: 'vacation'
        },
        {
          id: '3',
          name: 'New Car Down Payment',
          targetAmount: 8000,
          savedAmount: 2800,
          icon: 'car'
        }
      ];
      setGoals(sampleGoals);
    }

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('finsmartai-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finsmartai-goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('finsmartai-darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: "Transaction Added",
      description: `${transaction.description} categorized as ${transaction.category}`,
    });
  };

  const addGoal = (goal: Omit<Goal, "id">) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString()
    };
    setGoals(prev => [...prev, newGoal]);
    toast({
      title: "Goal Added",
      description: `${goal.name} goal created successfully`,
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const dismissAlert = (category: string) => {
    toast({
      title: "Alert Dismissed",
      description: `Budget alert for ${category} has been dismissed`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Dashboard Overview */}
          <Dashboard transactions={transactions} goals={goals} />
          
          {/* Budget Alerts */}
          <BudgetAlerts transactions={transactions} onDismissAlert={dismissAlert} />
          
          {/* Charts Section */}
          <Charts transactions={transactions} />
          
          {/* Add Transaction & Goals Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TransactionForm onAddTransaction={addTransaction} />
            <GoalTracking goals={goals} onAddGoal={addGoal} />
          </div>
          
          {/* Recent Transactions */}
          <TransactionsList transactions={transactions.slice(0, 10)} />
        </div>
      </main>
    </div>
  );
};

export default Index;
