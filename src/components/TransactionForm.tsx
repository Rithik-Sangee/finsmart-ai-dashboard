import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

export const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categorizeTransaction = (description: string): string => {
    const desc = description.toLowerCase();
    
    if (desc.includes('grocery') || desc.includes('food') || desc.includes('supermarket')) {
      return 'Groceries';
    } else if (desc.includes('gas') || desc.includes('fuel') || desc.includes('electric') || desc.includes('water')) {
      return 'Utilities';
    } else if (desc.includes('restaurant') || desc.includes('dining') || desc.includes('coffee') || desc.includes('lunch')) {
      return 'Dining';
    } else if (desc.includes('movie') || desc.includes('game') || desc.includes('entertainment') || desc.includes('netflix')) {
      return 'Entertainment';
    } else if (desc.includes('transport') || desc.includes('uber') || desc.includes('taxi') || desc.includes('bus')) {
      return 'Transportation';
    } else if (desc.includes('health') || desc.includes('medical') || desc.includes('doctor') || desc.includes('pharmacy')) {
      return 'Healthcare';
    } else if (desc.includes('clothes') || desc.includes('clothing') || desc.includes('fashion') || desc.includes('shoes')) {
      return 'Shopping';
    } else {
      return 'Other';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const transaction = {
      description,
      amount: parseFloat(amount),
      date,
      category: categorizeTransaction(description)
    };

    onAddTransaction(transaction);
    setDescription("");
    setAmount("");
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-primary" />
          <span>Add New Transaction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Grocery shopping at Walmart"
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-gradient-primary hover:bg-primary-hover">
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};