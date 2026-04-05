import { useSummary } from "@/hooks/useSummary";
import { useStore } from "@/store";
import { capitalize, formatCurrency } from "@/utils/format";

export function InsightsPage() {
  const transactions = useStore((s) => s.transactions);
  const { totalIncome, totalExpenses, categoryBreakdown, monthlyData } = useSummary();

  const topCategory = categoryBreakdown[0] ?? null;

  const savingsRate =
    totalIncome > 0
      ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
      : 0;

  const avgMonthlyExpense =
    monthlyData.length > 0
      ? Math.round(
          monthlyData.reduce((sum, m) => sum + m.expenses, 0) / monthlyData.length,
        )
      : 0;

  const avgMonthlyIncome =
    monthlyData.length > 0
      ? Math.round(
          monthlyData.reduce((sum, m) => sum + m.income, 0) / monthlyData.length,
        )
      : 0;

  const highestExpense = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0] ?? null;

  const monthlyComparison = getMonthlyComparison(monthlyData);

  if (transactions.length === 0) {
    return (
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Insights</h1>
        <div className="flex h-40 items-center justify-center rounded-xl border border-edge bg-surface">
          <p className="text-sm text-faint">Add transactions to see insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-xl font-semibold lg:text-2xl">Insights</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InsightCard title="Savings Rate" value={`${savingsRate}%`}>
          {savingsRate >= 20
            ? "You are saving a healthy portion of your income."
            : "Consider reducing expenses to improve your savings rate."}
        </InsightCard>

        <InsightCard title="Avg. Monthly Income" value={formatCurrency(avgMonthlyIncome)}>
          Based on {monthlyData.length} month{monthlyData.length !== 1 ? "s" : ""} of data.
        </InsightCard>

        <InsightCard title="Avg. Monthly Expenses" value={formatCurrency(avgMonthlyExpense)}>
          Spread across {categoryBreakdown.length} spending categories.
        </InsightCard>

        {topCategory && (
          <InsightCard
            title="Top Spending Category"
            value={capitalize(topCategory.category)}
          >
            {formatCurrency(topCategory.amount)} total ({topCategory.percentage}% of all expenses).
          </InsightCard>
        )}

        {highestExpense && (
          <InsightCard
            title="Largest Single Expense"
            value={formatCurrency(highestExpense.amount)}
          >
            {highestExpense.description} in {capitalize(highestExpense.category)}.
          </InsightCard>
        )}

        {monthlyComparison && (
          <InsightCard
            title="Monthly Comparison"
            value={monthlyComparison.direction}
          >
            {monthlyComparison.text}
          </InsightCard>
        )}
      </div>

      <div className="rounded-xl border border-edge bg-surface p-4 lg:p-5">
        <h3 className="mb-4 text-sm font-semibold">Category Ranking</h3>
        <div className="space-y-3">
          {categoryBreakdown.map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-sm text-muted">
                {capitalize(item.category)}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-hover">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right text-sm font-medium">
                {formatCurrency(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightCard({
  title,
  value,
  children,
}: {
  title: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-edge bg-surface p-4 lg:p-5">
      <p className="text-xs font-medium text-faint">{title}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function getMonthlyComparison(
  monthlyData: { month: string; expenses: number }[],
): { direction: string; text: string } | null {
  if (monthlyData.length < 2) return null;
  const current = monthlyData[monthlyData.length - 1];
  const previous = monthlyData[monthlyData.length - 2];
  const diff = current.expenses - previous.expenses;
  const pct = previous.expenses > 0 ? Math.round((Math.abs(diff) / previous.expenses) * 100) : 0;

  if (diff > 0) {
    return {
      direction: `Up ${pct}%`,
      text: `Spending increased by ${formatCurrency(diff)} compared to ${previous.month}.`,
    };
  }
  if (diff < 0) {
    return {
      direction: `Down ${pct}%`,
      text: `Spending decreased by ${formatCurrency(Math.abs(diff))} compared to ${previous.month}.`,
    };
  }
  return {
    direction: "No change",
    text: `Spending was the same as ${previous.month}.`,
  };
}
