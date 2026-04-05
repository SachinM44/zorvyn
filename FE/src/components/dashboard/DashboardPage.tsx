import { useSummary } from "@/hooks/useSummary";
import { SummaryCards } from "./SummaryCards";
import { BalanceTrend } from "./BalanceTrend";
import { SpendingBreakdown } from "./SpendingBreakdown";
import { IncomeExpenseChart } from "./IncomeExpenseChart";

export function DashboardPage() {
  const { balance, totalIncome, totalExpenses, transactionCount, monthlyData, categoryBreakdown } =
    useSummary();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-xl font-semibold lg:text-2xl">Dashboard</h1>

      <SummaryCards
        balance={balance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        transactionCount={transactionCount}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <BalanceTrend data={monthlyData} />
        <SpendingBreakdown data={categoryBreakdown} />
      </div>

      <IncomeExpenseChart data={monthlyData} />
    </div>
  );
}
