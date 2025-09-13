import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, CreditCard } from "lucide-react";

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

interface DashboardProps {
  transactions: Transaction[];
  goals: Goal[];
}

export const Dashboard = ({ transactions, goals }: DashboardProps) => {
  // Calculate metrics
  const currentMonth = new Date().getMonth();
  const currentMonthSpending = transactions
    .filter(t => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSavings = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalGoalTargets = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const savingsProgress = totalGoalTargets > 0 ? (totalSavings / totalGoalTargets) * 100 : 0;

  const averageTransaction = transactions.length > 0 
    ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-primary text-white shadow-elevated border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            Monthly Spending
          </CardTitle>
          <DollarSign className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${currentMonthSpending.toFixed(2)}</div>
          <p className="text-xs opacity-75">
            {transactions.filter(t => new Date(t.date).getMonth() === currentMonth).length} transactions
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-success text-white shadow-elevated border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            Total Savings
          </CardTitle>
          <TrendingUp className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalSavings.toFixed(2)}</div>
          <p className="text-xs opacity-75">
            {savingsProgress.toFixed(1)}% of goals
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Goals
          </CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{goals.length}</div>
          <p className="text-xs text-muted-foreground">
            ${totalGoalTargets.toFixed(2)} target
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg Transaction
          </CardTitle>
          <CreditCard className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">${averageTransaction.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {transactions.length} total
          </p>
        </CardContent>
      </Card>
    </div>
  );
};