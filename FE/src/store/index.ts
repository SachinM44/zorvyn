import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role, Transaction, TransactionFilters } from "@/types";
import { initialTransactions } from "@/data/transactions";

interface AppState {
  role: Role;
  darkMode: boolean;
  transactions: Transaction[];
  filters: TransactionFilters;
  sidebarOpen: boolean;
  setRole: (role: Role) => void;
  toggleDarkMode: () => void;
  setSidebarOpen: (open: boolean) => void;
  setFilter: <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => void;
  resetFilters: () => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const defaultFilters: TransactionFilters = {
  search: "",
  type: "all",
  category: "all",
  sortField: "date",
  sortDirection: "desc",
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      role: "admin",
      darkMode: false,
      transactions: initialTransactions,
      filters: defaultFilters,
      sidebarOpen: false,

      setRole: (role) => set({ role }),

      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t,
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "Zorvyn-finance",
      partialize: (state) => ({
        role: state.role,
        darkMode: state.darkMode,
        transactions: state.transactions,
      }),
    },
  ),
);
