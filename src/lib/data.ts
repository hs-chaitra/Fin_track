import {
  Car,
  Film,
  Heart,
  Home,
  Lightbulb,
  Shirt,
  ShoppingCart,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export const categories = [
  { name: "Groceries", icon: ShoppingCart, color: "hsl(var(--chart-1))" },
  { name: "Utilities", icon: Lightbulb, color: "hsl(var(--chart-2))" },
  { name: "Rent", icon: Home, color: "hsl(var(--chart-3))" },
  { name: "Transport", icon: Car, color: "hsl(var(--chart-4))" },
  { name: "Dining Out", icon: Utensils, color: "hsl(var(--chart-5))" },
  { name: "Entertainment", icon: Film, color: "hsl(var(--chart-1))" },
  { name: "Shopping", icon: Shirt, color: "hsl(var(--chart-2))" },
  { name: "Health", icon: Heart, color: "hsl(var(--chart-3))" },
];

export const spendingData = [
    { name: "Groceries", spending: 450, budget: 600, fill: "hsl(var(--chart-1))" },
    { name: "Utilities", spending: 120, budget: 150, fill: "hsl(var(--chart-2))" },
    { name: "Rent", spending: 1200, budget: 1200, fill: "hsl(var(--chart-3))" },
    { name: "Transport", spending: 180, budget: 200, fill: "hsl(var(--chart-4))" },
    { name: "Dining Out", spending: 250, budget: 300, fill: "hsl(var(--chart-5))" },
    { name: "Entertainment", spending: 80, budget: 100, fill: "hsl(var(--chart-1))" },
    { name: "Shopping", spending: 150, budget: 200, fill: "hsl(var(--chart-2))" },
    { name: "Health", spending: 50, budget: 100, fill: "hsl(var(--chart-3))" },
  ];
  
export const transactionsData = [
    { id: "txn1", name: "Grocery Run at Whole Foods", date: "June 24, 2024", amount: 124.50, category: "Groceries" },
    { id: "txn2", name: "Monthly Rent - June", date: "June 1, 2024", amount: 1200.00, category: "Rent" },
    { id: "txn3", name: "Dinner at The Italian Place", date: "June 22, 2024", amount: 78.00, category: "Dining Out" },
    { id: "txn4", name: "Gas Fill-up", date: "June 20, 2024", amount: 45.30, category: "Transport" },
    { id: "txn5", name: "New T-Shirt from H&M", date: "June 18, 2024", amount: 25.00, category: "Shopping" },
    { id: "txn6", name: "Electricity Bill", date: "June 15, 2024", amount: 75.00, category: "Utilities" },
    { id: "txn7", name: "Movie tickets for 'The Big Show'", date: "June 12, 2024", amount: 32.00, category: "Entertainment"},
];

const totalIncome = 4500;
const totalExpenses = spendingData.reduce((sum, item) => sum + item.spending, 0);
const netBalance = totalIncome - totalExpenses;

export const statsData = {
    income: totalIncome,
    expenses: totalExpenses,
    netBalance: netBalance,
}


export const getDashboardData = () => {
    return {
        stats: statsData,
        spending: spendingData,
        transactions: transactionsData,
        categories: categories,
    }
}
