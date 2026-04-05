export type Role = "admin" | "viewer";

export type TransactionType = "income" | "expense";

export type Category =
  | "salary"
  | "freelance"
  | "investments"
  | "rent"
  | "groceries"
  | "utilities"
  | "transport"
  | "entertainment"
  | "dining"
  | "healthcare"
  | "shopping"
  | "subscriptions";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryBreakdown {
  category: Category;
  amount: number;
  percentage: number;
}

export type SortField = "date" | "amount" | "category";
export type SortDirection = "asc" | "desc";

export interface TransactionFilters {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  sortField: SortField;
  sortDirection: SortDirection;
}
