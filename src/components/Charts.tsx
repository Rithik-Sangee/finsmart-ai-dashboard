import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ChartsProps {
  transactions: Transaction[];
}

export const Charts = ({ transactions }: ChartsProps) => {
  // Generate spending projection for next 3 months
  const generateSpendingProjection = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Calculate average spending for recent months
    const recentSpending = transactions.reduce((sum, t) => sum + t.amount, 0);
    const avgMonthlySpending = recentSpending / 3; // Assume 3 months of data
    const projectedIncrease = 1.05; // 5% increase trend
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels = [];
    const data = [];
    
    for (let i = 0; i < 3; i++) {
      const monthIndex = (currentMonth + i + 1) % 12;
      labels.push(months[monthIndex]);
      data.push(avgMonthlySpending * Math.pow(projectedIncrease, i + 1));
    }
    
    return { labels, data };
  };

  // Generate category spending for current month
  const generateCategorySpending = () => {
    const categoryTotals: { [key: string]: number } = {};
    
    transactions.forEach(transaction => {
      categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
    });
    
    return {
      labels: Object.keys(categoryTotals),
      data: Object.values(categoryTotals)
    };
  };

  const projectionData = generateSpendingProjection();
  const categoryData = generateCategorySpending();

  const lineChartData = {
    labels: projectionData.labels,
    datasets: [
      {
        label: 'Projected Spending',
        data: projectionData.data,
        borderColor: 'hsl(220, 85%, 47%)',
        backgroundColor: 'hsl(220, 85%, 47%, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toFixed(0);
          }
        }
      }
    }
  };

  const doughnutChartData = {
    labels: categoryData.labels,
    datasets: [
      {
        data: categoryData.data,
        backgroundColor: [
          'hsl(220, 85%, 47%)',
          'hsl(142, 76%, 36%)',
          'hsl(38, 92%, 50%)',
          'hsl(0, 84%, 60%)',
          'hsl(270, 85%, 47%)',
          'hsl(200, 85%, 47%)',
          'hsl(320, 85%, 47%)',
          'hsl(60, 85%, 47%)',
        ],
        borderWidth: 2,
        borderColor: 'hsl(var(--background))',
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle>Spending Projection</CardTitle>
          <p className="text-sm text-muted-foreground">Next 3 months forecast</p>
        </CardHeader>
        <CardContent>
          <Line data={lineChartData} options={lineChartOptions} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <p className="text-sm text-muted-foreground">Current month breakdown</p>
        </CardHeader>
        <CardContent>
          <Doughnut data={doughnutChartData} options={doughnutOptions} />
        </CardContent>
      </Card>
    </div>
  );
};