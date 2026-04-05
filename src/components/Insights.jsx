import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Insights = () => {
  const { breakdown, transactions } = useContext(FinanceContext);

  // Highest spending category
  const highest = breakdown.reduce((max, c) => c.amount > max.amount ? c : max, breakdown[0] || { amount: 0, category: "-" });

  // Monthly comparison (current vs previous month)
  const now = new Date();
  const thisMonth = now.toISOString().slice(0, 7);
  now.setMonth(now.getMonth() - 1);
  const prevMonth = now.toISOString().slice(0, 7);
  const sum = (month, type) => transactions.filter(t => t.date.startsWith(month) && t.type === type).reduce((s, t) => s + t.amount, 0);
  const incomeNow = sum(thisMonth, "income");
  const incomePrev = sum(prevMonth, "income");
  const expenseNow = sum(thisMonth, "expense");
  const expensePrev = sum(prevMonth, "expense");

  return (
    <div className="w-full flex flex-col">
      <h2 className="mb-6 font-bold text-2xl text-yellow-400">💡 Insights</h2>
      <div className="space-y-5">
        <div className="bg-red-600/20 rounded-xl p-4 border-l-4 border-red-500">
          <span className="font-bold text-red-300 block mb-2">🔝 Highest Spending Category</span>
          <span className="text-2xl font-extrabold text-red-200">{highest.category}</span>
          <span className="text-sm text-red-300/70 ml-2">₹{highest.amount}</span>
        </div>
        <div className="bg-indigo-600/20 rounded-xl p-4 border-l-4 border-indigo-500">
          <span className="font-bold text-indigo-300 block mb-3">📊 This Month vs Last Month</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-300">Income</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-xl font-bold ${incomeNow >= incomePrev ? 'text-green-400' : 'text-red-400'}`}>₹{incomeNow}</span>
                <span className="text-xs text-indigo-300/70">vs ₹{incomePrev}</span>
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-indigo-300">Expenses</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-xl font-bold ${expenseNow <= expensePrev ? 'text-green-400' : 'text-red-400'}`}>₹{expenseNow}</span>
                <span className="text-xs text-indigo-300/70">vs ₹{expensePrev}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`rounded-xl p-4 border-l-4 ${expenseNow > incomeNow ? 'bg-red-600/20 border-red-500' : 'bg-green-600/20 border-green-500'}`}>
          <span className={`font-bold block mb-1 ${expenseNow > incomeNow ? 'text-red-300' : 'text-green-300'}`}>{expenseNow > incomeNow ? '⚠️ Warning' : '✅ Good News'}</span>
          <span className={expenseNow > incomeNow ? 'text-red-300/90' : 'text-green-300/90'}>{expenseNow > incomeNow ? '🚨 Expenses exceed income this month. Budget carefully!' : '💪 Income covers all expenses. Great financial health!'}</span>
        </div>
      </div>
    </div>
  );
};

export default Insights;
