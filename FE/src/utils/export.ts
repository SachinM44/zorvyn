import type { Transaction } from "@/types";

export function exportToCSV(transactions: Transaction[]): void {
  const headers = ["Date", "Description", "Amount", "Type", "Category"];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    t.amount.toString(),
    t.type,
    t.category,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadFile(csv, "transactions.csv", "text/csv");
}

export function exportToJSON(transactions: Transaction[]): void {
  const json = JSON.stringify(transactions, null, 2);
  downloadFile(json, "transactions.json", "application/json");
}

function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
