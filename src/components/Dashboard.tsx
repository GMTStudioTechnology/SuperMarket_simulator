import React from 'react';
import { useGameStore } from '../store/gameStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ShoppingCart, Users, Package, DollarSign } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { cash, customers, products, earnings, expenses } = useGameStore();

  const totalStock = Object.values(products).reduce((acc, product) => acc + product.stock, 0);
  const dailyEarnings = earnings.slice(-10).reduce((acc, earning) => acc + earning, 0);
  const dailyExpenses = expenses.slice(-10).reduce((acc, expense) => acc + expense, 0);

  const chartData = earnings.map((earning, index) => ({
    name: `Day ${index + 1}`,
    earnings: earning,
    expenses: expenses[index] || 0,
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign className="w-8 h-8 text-green-500" />}
          title="Cash"
          value={`$${cash.toFixed(2)}`}
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-blue-500" />}
          title="Customers in Queue"
          value={customers.length}
        />
        <StatCard
          icon={<Package className="w-8 h-8 text-purple-500" />}
          title="Total Stock"
          value={totalStock}
        />
        <StatCard
          icon={<ShoppingCart className="w-8 h-8 text-orange-500" />}
          title="Daily Profit"
          value={`$${(dailyEarnings - dailyExpenses).toFixed(2)}`}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Financial Overview</h2>
        <LineChart width={800} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="earnings" stroke="#10B981" name="Earnings" />
          <Line type="monotone" dataKey="expenses" stroke="#EF4444" name="Expenses" />
        </LineChart>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);