import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Target, Plane, Home, Car } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  icon: string;
}

interface GoalTrackingProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, "id">) => void;
}

const getGoalIcon = (iconType: string) => {
  switch (iconType) {
    case 'vacation':
      return <Plane className="h-5 w-5" />;
    case 'emergency':
      return <Target className="h-5 w-5" />;
    case 'house':
      return <Home className="h-5 w-5" />;
    case 'car':
      return <Car className="h-5 w-5" />;
    default:
      return <Target className="h-5 w-5" />;
  }
};

export const GoalTracking = ({ goals, onAddGoal }: GoalTrackingProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("emergency");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName || !targetAmount) return;

    const goal = {
      name: goalName,
      targetAmount: parseFloat(targetAmount),
      savedAmount: parseFloat(savedAmount) || 0,
      icon: selectedIcon
    };

    onAddGoal(goal);
    setGoalName("");
    setTargetAmount("");
    setSavedAmount("");
    setSelectedIcon("emergency");
    setIsDialogOpen(false);
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Financial Goals</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-success hover:bg-success text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Add New Financial Goal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="goalName">Goal Name</Label>
                  <Input
                    id="goalName"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="e.g., Save for Vacation"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetAmount">Target Amount ($)</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      step="0.01"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      placeholder="5000"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="savedAmount">Current Amount ($)</Label>
                    <Input
                      id="savedAmount"
                      type="number"
                      step="0.01"
                      value={savedAmount}
                      onChange={(e) => setSavedAmount(e.target.value)}
                      placeholder="0"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Icon</Label>
                  <div className="flex space-x-2 mt-2">
                    {[
                      { value: 'emergency', icon: <Target className="h-4 w-4" /> },
                      { value: 'vacation', icon: <Plane className="h-4 w-4" /> },
                      { value: 'house', icon: <Home className="h-4 w-4" /> },
                      { value: 'car', icon: <Car className="h-4 w-4" /> },
                    ].map((iconOption) => (
                      <Button
                        key={iconOption.value}
                        type="button"
                        variant={selectedIcon === iconOption.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedIcon(iconOption.value)}
                      >
                        {iconOption.icon}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-gradient-primary hover:bg-primary-hover">
                  Add Goal
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No goals set yet. Add your first financial goal!</p>
          ) : (
            goals.map((goal) => {
              const progress = (goal.savedAmount / goal.targetAmount) * 100;
              return (
                <div key={goal.id} className="p-4 bg-secondary/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-card rounded-lg border border-border">
                        {getGoalIcon(goal.icon)}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{goal.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${goal.savedAmount.toFixed(2)} of ${goal.targetAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{progress.toFixed(1)}%</p>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};