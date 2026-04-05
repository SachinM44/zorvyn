import { useStore } from "@/store";
import { capitalize } from "@/utils/format";
import type { Category, TransactionType, SortField, SortDirection } from "@/types";

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
  "rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-content outline-none";

export function TransactionFilters() {
  const filters = useStore((s) => s.filters);
  const setFilter = useStore((s) => s.setFilter);
  const resetFilters = useStore((s) => s.resetFilters);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.type !== "all" ||
    filters.category !== "all";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search transactions..."
        value={filters.search}
        onChange={(e) => setFilter("search", e.target.value)}
        className={`w-full sm:w-56 ${inputClasses}`}
      />

      <select
        value={filters.type}
        onChange={(e) => setFilter("type", e.target.value as TransactionType | "all")}
        className={inputClasses}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => setFilter("category", e.target.value as Category | "all")}
        className={inputClasses}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {capitalize(cat)}
          </option>
        ))}
      </select>

      <select
        value={`${filters.sortField}-${filters.sortDirection}`}
        onChange={(e) => {
          const [field, dir] = e.target.value.split("-") as [SortField, SortDirection];
          setFilter("sortField", field);
          setFilter("sortDirection", dir);
        }}
        className={inputClasses}
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
        <option value="category-asc">Category A-Z</option>
        <option value="category-desc">Category Z-A</option>
      </select>

      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover"
        >
          Clear
        </button>
      )}
    </div>
  );
}
