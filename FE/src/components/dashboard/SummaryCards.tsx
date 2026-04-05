import { formatCurrency } from "@/utils/format";

interface SummaryCardsProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
}

export function SummaryCards({
  balance,
  totalIncome,
  totalExpenses,
  transactionCount,
}: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance),
      color: "var(--accent)",
    },
    {
      label: "Income",
      value: formatCurrency(totalIncome),
      color: "var(--positive)",
    },
    {
      label: "Expenses",
      value: formatCurrency(totalExpenses),
      color: "var(--negative)",
    },
    {
      label: "Transactions",
      value: transactionCount.toString(),
      color: "var(--muted)",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-edge bg-surface p-4 lg:p-5"
        >
          <p className="text-xs font-medium text-faint">{card.label}</p>
          <p
            className="mt-2 text-xl font-semibold lg:text-2xl"
            style={{ color: card.color }}
          >
            {card.value}
          </p>
          <div className="mt-3 h-1 w-10 rounded-full" />
        </div>
      ))}
    </div>
  );
}
