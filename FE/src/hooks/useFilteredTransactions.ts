import { useMemo } from "react";
import { useStore } from "@/store";
import type { Transaction } from "@/types";

export function useFilteredTransactions(): Transaction[] {
  const transactions = useStore((s) => s.transactions);
  const filters = useStore((s) => s.filters);

  return useMemo(() => {
    let result = [...transactions];

    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query),
      );
    }

    result.sort((a, b) => {
      const dir = filters.sortDirection === "asc" ? 1 : -1;
      switch (filters.sortField) {
        case "date":
          return dir * (new Date(a.date).getTime() - new Date(b.date).getTime());
        case "amount":
          return dir * (a.amount - b.amount);
        case "category":
          return dir * a.category.localeCompare(b.category);
      }
    });

    return result;
  }, [transactions, filters]);
}
