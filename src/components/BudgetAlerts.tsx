import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface BudgetAlert {
  category: string;
  budgetLimit: number;
  currentSpending: number;
  overBy: number;
}

interface BudgetAlertsProps {
  transactions: Transaction[];
  onDismissAlert?: (category: string) => void;
}

export const BudgetAlerts = ({ transactions, onDismissAlert }: BudgetAlertsProps) => {
  // Define budget limits for each category
  const budgetLimits = {
    'Groceries': 600,
    'Dining': 300,
    'Entertainment': 200,
    'Transportation': 250,
    'Shopping': 400,
    'Utilities': 350,
    'Healthcare': 150,
    'Other': 200
  };

  // Calculate current spending by category
  const categorySpending: { [key: string]: number } = {};
  
  transactions.forEach(transaction => {
    const currentMonth = new Date().getMonth();
    const transactionMonth = new Date(transaction.date).getMonth();
    
    // Only include current month transactions
    if (transactionMonth === currentMonth) {
      categorySpending[transaction.category] = (categorySpending[transaction.category] || 0) + transaction.amount;
    }
  });

  // Generate alerts for categories over budget
  const alerts: BudgetAlert[] = [];
  
  Object.entries(budgetLimits).forEach(([category, limit]) => {
    const spending = categorySpending[category] || 0;
    if (spending > limit) {
      alerts.push({
        category,
        budgetLimit: limit,
        currentSpending: spending,
        overBy: spending - limit
      });
    }
  });

  if (alerts.length === 0) {
    return (
      <Card className="bg-gradient-success border-success/20 shadow-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              ✓
            </div>
            <span>Budget Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">Great job! You're staying within budget for all categories this month.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-danger">
          <AlertTriangle className="h-5 w-5" />
          <span>Budget Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Alert key={alert.category} className="border-danger/20 bg-danger-light">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-danger">
                    {alert.category} Budget Exceeded
                  </p>
                  <p className="text-sm text-danger/80">
                    You've spent ${alert.currentSpending.toFixed(2)} of your ${alert.budgetLimit.toFixed(2)} budget. 
                    Over by ${alert.overBy.toFixed(2)}.
                  </p>
                </div>
                {onDismissAlert && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismissAlert(alert.category)}
                    className="hover:bg-danger/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};