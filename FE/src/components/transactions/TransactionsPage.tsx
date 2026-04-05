import { useState } from "react";
import { useStore } from "@/store";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionRow } from "./TransactionRow";
import { TransactionModal } from "./TransactionModal";
import { exportToCSV, exportToJSON } from "@/utils/export";
import type { Transaction } from "@/types";

export function TransactionsPage() {
  const role = useStore((s) => s.role);
  const addTransaction = useStore((s) => s.addTransaction);
  const updateTransaction = useStore((s) => s.updateTransaction);
  const transactions = useFilteredTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  function handleSave(data: Omit<Transaction, "id">) {
    if (editing) {
      updateTransaction(editing.id, data);
    } else {
      addTransaction({ ...data, id: `t-${Date.now()}` });
    }
    setModalOpen(false);
    setEditing(null);
  }

  function handleEdit(transaction: Transaction) {
    setEditing(transaction);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditing(null);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold lg:text-2xl">Transactions</h1>
        <div className="flex gap-2">
          <ExportMenu transactions={transactions} />
          {role === "admin" && (
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <TransactionFilters />

      {transactions.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-xl border border-edge bg-surface">
          <p className="text-sm text-faint">No transactions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-edge bg-surface">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-edge text-xs font-medium text-faint">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Amount</th>
                {role === "admin" && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <TransactionRow
                  key={t.id}
                  transaction={t}
                  onEdit={handleEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <TransactionModal
          transaction={editing}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function ExportMenu({ transactions }: { transactions: Transaction[] }) {
  const [open, setOpen] = useState(false);

  if (transactions.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-edge px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover"
      >
        Export
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-32 rounded-lg border border-edge bg-surface py-1 shadow-lg">
            <button
              onClick={() => { exportToCSV(transactions); setOpen(false); }}
              className="block w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-surface-hover"
            >
              CSV
            </button>
            <button
              onClick={() => { exportToJSON(transactions); setOpen(false); }}
              className="block w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-surface-hover"
            >
              JSON
            </button>
          </div>
        </>
      )}
    </div>
  );
}
