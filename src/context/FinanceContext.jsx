import React, { createContext, useState } from "react";

// Mock data for demonstration
const initialTransactions = [
  { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
  { id: 2, date: "2026-04-02", amount: 1200, category: "Groceries", type: "expense" },
  { id: 3, date: "2026-04-03", amount: 800, category: "Transport", type: "expense" },
  { id: 4, date: "2026-04-03", amount: 2000, category: "Freelance", type: "income" },
  { id: 5, date: "2026-04-04", amount: 1500, category: "Shopping", type: "expense" },
];

const roles = ["viewer", "admin"];

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("");

  // Summary calculations
  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  // Trend (last 7 days)
  const trend = (() => {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().slice(0, 10);
      const dayIncome = transactions.filter(t => t.date === dateStr && t.type === "income").reduce((sum, t) => sum + t.amount, 0);
      const dayExpense = transactions.filter(t => t.date === dateStr && t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
      const prev = i === 0 ? 0 : arr[i - 1];
      arr.push(prev + dayIncome - dayExpense);
    }
    return arr;
  })();

  // Breakdown by category (expenses only)
  const breakdown = Array.from(
    transactions.filter(t => t.type === "expense").reduce((map, t) => {
      map.set(t.category, (map.get(t.category) || 0) + t.amount);
      return map;
    }, new Map()),
    ([category, amount]) => ({ category, amount })
  );

  // Filtered transactions
  const filteredTransactions = transactions.filter(t =>
    t.category.toLowerCase().includes(filter.toLowerCase()) ||
    t.type.toLowerCase().includes(filter.toLowerCase()) ||
    t.amount.toString().includes(filter)
  );

  // Add transaction (admin only)
  const addTransaction = (tx) => {
    setTransactions(ts => [
      ...ts,
      { ...tx, id: ts.length ? Math.max(...ts.map(t => t.id)) + 1 : 1 }
    ]);
  };

  // Edit transaction (admin only)
  const editTransaction = (id, updated) => {
    setTransactions(ts => ts.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        filteredTransactions,
        summary: { income, expenses, balance },
        trend,
        breakdown,
        filter,
        setFilter,
        role,
        setRole,
        roles,
        addTransaction,
        editTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
