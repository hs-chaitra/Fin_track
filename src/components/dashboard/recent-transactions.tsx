"use client";

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
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  category: string;
}

interface RecentTransactionsProps {
  data: Transaction[];
}

const categoryIcons: Record<string, LucideIcon> = {
  Groceries: ShoppingCart,
  Utilities: Lightbulb,
  Rent: Home,
  Transport: Car,
  "Dining Out": Utensils,
  Entertainment: Film,
  Shopping: Shirt,
  Health: Heart,
};

const categoryColors: Record<string, string> = {
  Groceries: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  Utilities: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  Rent: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  Transport: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  "Dining Out": "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  Entertainment: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300",
  Shopping: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
  Health: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
};


export function RecentTransactions({ data }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A list of your recent expenses this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction) => {
              const Icon = categoryIcons[transaction.category] || ShoppingCart;
              return (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{transaction.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("border-none", categoryColors[transaction.category])}>
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="text-right">
                    -${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
