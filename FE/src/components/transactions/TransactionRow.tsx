import type { Transaction } from "@/types";
import { capitalize, formatCurrency, formatDate } from "@/utils/format";
import { useStore } from "@/store";

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionRow({ transaction, onEdit }: TransactionRowProps) {
  const role = useStore((s) => s.role);
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const isIncome = transaction.type === "income";

  return (
    <tr className="border-b border-edge transition-colors hover:bg-surface-hover">
      <td className="px-4 py-3 text-sm text-muted">
        {formatDate(transaction.date)}
      </td>
      <td className="px-4 py-3 text-sm font-medium">
        {transaction.description}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
            isIncome
              ? "bg-positive-soft text-positive"
              : "bg-negative-soft text-negative"
          }`}
        >
          {capitalize(transaction.category)}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-muted">
        {capitalize(transaction.type)}
      </td>
      <td
        className={`px-4 py-3 text-right text-sm font-medium ${
          isIncome ? "text-positive" : "text-negative"
        }`}
      >
        {isIncome ? "+" : "-"}{formatCurrency(transaction.amount, true)}
      </td>
      {role === "admin" && (
        <td className="px-4 py-3 text-right">
          <div className="flex justify-end gap-1">
            <button
              onClick={() => onEdit(transaction)}
              className="rounded p-1 text-faint transition-colors hover:bg-surface-hover"
              aria-label="Edit transaction"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="rounded p-1 text-faint transition-colors hover:bg-negative-soft"
              aria-label="Delete transaction"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
