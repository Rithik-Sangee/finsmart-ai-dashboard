import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Zap, 
  UtensilsCrossed, 
  Gamepad2, 
  Car, 
  Heart, 
  ShoppingBag, 
  MoreHorizontal 
} from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Groceries':
      return <ShoppingCart className="h-4 w-4" />;
    case 'Utilities':
      return <Zap className="h-4 w-4" />;
    case 'Dining':
      return <UtensilsCrossed className="h-4 w-4" />;
    case 'Entertainment':
      return <Gamepad2 className="h-4 w-4" />;
    case 'Transportation':
      return <Car className="h-4 w-4" />;
    case 'Healthcare':
      return <Heart className="h-4 w-4" />;
    case 'Shopping':
      return <ShoppingBag className="h-4 w-4" />;
    default:
      return <MoreHorizontal className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Groceries':
      return 'bg-success-light text-success border-success/20';
    case 'Utilities':
      return 'bg-warning-light text-warning border-warning/20';
    case 'Dining':
      return 'bg-primary-light text-primary border-primary/20';
    case 'Entertainment':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Transportation':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Healthcare':
      return 'bg-danger-light text-danger border-danger/20';
    case 'Shopping':
      return 'bg-pink-100 text-pink-700 border-pink-200';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No transactions yet. Add your first transaction above!</p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-card rounded-lg border border-border">
                    {getCategoryIcon(transaction.category)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getCategoryColor(transaction.category)}>
                        {transaction.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${transaction.amount.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};