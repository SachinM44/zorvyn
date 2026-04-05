import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { MonthlyData } from "@/types";
import { formatCurrency } from "@/utils/format";

interface BalanceTrendProps {
  data: MonthlyData[];
}

export function BalanceTrend({ data }: BalanceTrendProps) {
  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-xl border border-edge bg-surface p-4 lg:p-5">
      <h3 className="mb-4 text-sm font-semibold">Balance Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--edge)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--faint)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--faint)" }}
              tickFormatter={(v) => formatCurrency(v)}
              width={70}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--edge)",
                borderRadius: 8,
                fontSize: 13,
              }}
              formatter={(value) => [formatCurrency(Number(value)), "Balance"]}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--accent)"
              strokeWidth={2}
              fill="url(#balanceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-edge bg-surface">
      <p className="text-sm text-faint">No data available</p>
    </div>
  );
}
