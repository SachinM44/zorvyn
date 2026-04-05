import { useState, useEffect } from "react";
import type { Transaction, Category, TransactionType } from "@/types";
import { capitalize } from "@/utils/format";

interface TransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onSave: (data: Omit<Transaction, "id">) => void;
}

const categories: Category[] = [
  "salary",
  "freelance",
  "investments",
  "rent",
  "groceries",
  "utilities",
  "transport",
  "entertainment",
  "dining",
  "healthcare",
  "shopping",
  "subscriptions",
];

const inputClasses =
  "w-full rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-content outline-none";

export function TransactionModal({ transaction, onClose, onSave }: TransactionModalProps) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<Category>("groceries");

  useEffect(() => {
    if (transaction) {
      setDate(transaction.date);
      setDescription(transaction.description);
      setAmount(transaction.amount.toString());
      setType(transaction.type);
      setCategory(transaction.category);
    } else {
      setDate(new Date().toISOString().split("T")[0]);
      setDescription("");
      setAmount("");
      setType("expense");
      setCategory("groceries");
    }
  }, [transaction]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!date || !description || isNaN(parsedAmount) || parsedAmount <= 0) return;
    onSave({ date, description, amount: parsedAmount, type, category });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-xl border border-edge bg-surface p-6 shadow-lg"
      >
        <h2 className="mb-5 text-lg font-semibold">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <div className="space-y-4">
          <Field label="Date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClasses}
              required
            />
          </Field>

          <Field label="Description">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this for?"
              className={inputClasses}
              required
            />
          </Field>

          <Field label="Amount">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className={inputClasses}
              required
            />
          </Field>

          <Field label="Type">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              className={inputClasses}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </Field>

          <Field label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputClasses}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {capitalize(cat)}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-edge px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            {transaction ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
