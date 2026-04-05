import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import type { CategoryBreakdown } from "@/types";
import { capitalize, formatCurrency } from "@/utils/format";

interface SpendingBreakdownProps {
  data: CategoryBreakdown[];
}

const COLORS = [
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#0891b2",
  "#ca8a04",
  "#dc2626",
  "#4f46e5",
  "#059669",
  "#9333ea",
  "#e11d48",
];

export function SpendingBreakdown({ data }: SpendingBreakdownProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-edge bg-surface p-4">
        <p className="text-sm text-faint">No spending data</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-edge bg-surface p-4 lg:p-5">
      <h3 className="mb-4 text-sm font-semibold">Spending Breakdown</h3>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--edge)",
                  borderRadius: 8,
                  fontSize: 13,
                }}
                formatter={(value) => formatCurrency(Number(value))}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {data.map((item, i) => (
            <div key={item.category} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-xs text-muted">
                {capitalize(item.category)} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
