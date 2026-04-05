import { useMemo } from "react";
import { useStore } from "@/store";
import type { CategoryBreakdown, MonthlyData } from "@/types";

export function useSummary() {
  const transactions = useStore((s) => s.transactions);

  return useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    const monthlyMap = new Map<
      string,
      { income: number; expenses: number }
    >();

    for (const t of transactions) {
      const month = t.date.slice(0, 7);
      const entry = monthlyMap.get(month) ?? { income: 0, expenses: 0 };
      if (t.type === "income") {
        entry.income += t.amount;
      } else {
        entry.expenses += t.amount;
      }
      monthlyMap.set(month, entry);
    }

    const monthlyData: MonthlyData[] = Array.from(monthlyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        income: data.income,
        expenses: data.expenses,
        balance: data.income - data.expenses,
      }));

    const categoryMap = new Map<string, number>();
    for (const t of transactions) {
      if (t.type === "expense") {
        categoryMap.set(
          t.category,
          (categoryMap.get(t.category) ?? 0) + t.amount,
        );
      }
    }

    const categoryBreakdown: CategoryBreakdown[] = Array.from(
      categoryMap.entries(),
    )
      .map(([category, amount]) => ({
        category: category as CategoryBreakdown["category"],
        amount,
        percentage:
          totalExpenses > 0
            ? Math.round((amount / totalExpenses) * 100)
            : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      totalIncome,
      totalExpenses,
      balance,
      monthlyData,
      categoryBreakdown,
      transactionCount: transactions.length,
    };
  }, [transactions]);
}
