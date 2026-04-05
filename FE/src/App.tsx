import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@/store";
import { Shell } from "@/components/layout/Shell";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { TransactionsPage } from "@/components/transactions/TransactionsPage";
import { InsightsPage } from "@/components/insights/InsightsPage";

export default function App() {
  const darkMode = useStore((s) => s.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="insights" element={<InsightsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
