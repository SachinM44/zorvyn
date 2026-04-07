# Zorvyn Finance (frontend)

Small finance dashboard: summaries, charts, transactions, and a simple insights page. Data is mock and stored in the browser (localStorage) so it survives refresh.

**Repo:** https://github.com/SachinM44/zorvyn  
**Live:** https://zync-ruddy.vercel.app/

## What it uses

React 19 and TypeScript, Vite, Tailwind CSS v4, Zustand (with persist), Recharts, React Router.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173. Production build: `npm run build` and `npm run preview`.

## What’s in the app

- **Dashboard:** Balance, income, expenses, count; balance over time; spending by category; income vs expense by month.
- **Transactions:** Table with search, filters (type and category), sort (date, amount, category). Admins can add, edit, delete; viewers read-only. Export filtered list as CSV or JSON.
- **Insights:** A few derived stats (savings rate, averages, top category, comparisons).
- **Header:** Switch Admin / Viewer, light / dark theme. Sidebar collapses on small screens.

## Code layout

`src/components` is grouped by area (layout, dashboard, transactions, insights). Shared state lives in `src/store`. Mock seed data is in `src/data`. Filtering and aggregates use `src/hooks` and `src/utils`.
