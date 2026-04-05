# Zorvyn Finance Dashboard

A frontend finance dashboard built with React, TypeScript, and Tailwind CSS. Users can view financial summaries, explore transactions, and understand spending patterns through charts and insights.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **Zustand** for state management
- **Recharts** for data visualization
- **React Router** for client-side routing

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    layout/        Shell, Sidebar, Header
    dashboard/     Summary cards, charts, Dashboard page
    transactions/  Transaction list, filters, modal, Transactions page
    insights/      Insights page with spending analysis
  store/           Zustand store (transactions, role, theme, filters)
  hooks/           useFilteredTransactions, useSummary
  types/           TypeScript interfaces and types
  data/            Mock transaction data
  utils/           Formatting and export helpers
```

## Features

### Dashboard Overview
- Summary cards showing total balance, income, expenses, and transaction count
- Area chart for monthly balance trend
- Bar chart comparing income vs expenses by month
- Donut chart breaking down spending by category

### Transactions
- Sortable, filterable transaction list
- Search by description or category
- Filter by type (income/expense) and category
- Sort by date, amount, or category
- Add, edit, and delete transactions (admin only)
- Export to CSV or JSON

### Insights
- Savings rate calculation
- Average monthly income and expenses
- Top spending category with percentage
- Largest single expense
- Month-over-month spending comparison
- Category ranking with visual progress bars

### Role-Based UI
A dropdown in the header switches between Admin and Viewer roles:
- **Admin**: Can add, edit, and delete transactions
- **Viewer**: Read-only access to all data

Role state is managed in the Zustand store and persisted to local storage.

### Dark Mode
Toggle between light and dark themes using the header button. The preference is saved to local storage.

### Data Persistence
All transaction data, theme preference, and role selection persist across sessions using local storage via Zustand's persist middleware.

## Design Approach

The dashboard uses CSS custom properties for theming, which makes the light/dark mode switch straightforward without duplicating Tailwind classes. Layout is responsive with a collapsible sidebar on mobile. Components are structured by feature rather than by type, keeping related files together.

State is centralized in a single Zustand store with selectors to minimize re-renders. Filtering and summary computations are memoized in custom hooks. The transaction modal handles both create and edit flows through the same component.
