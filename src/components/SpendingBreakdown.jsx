import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const COLORS = ["#f87171", "#34d399", "#60a5fa", "#fbbf24", "#a78bfa", "#f472b6"];

const SpendingBreakdown = () => {
  const { breakdown } = useContext(FinanceContext);
  const total = breakdown.reduce((sum, c) => sum + c.amount, 0);
  return (
    <div className="w-full flex flex-col">
      <h2 className="mb-6 font-bold text-2xl text-pink-400">🥧 Spending Breakdown</h2>
      <div className="flex flex-col items-center justify-center mb-4">
        <svg width="120" height="120" viewBox="0 0 32 32">
          {breakdown.reduce((acc, cat, i) => {
            const prev = acc.offset;
            const value = (cat.amount / total) * 100;
            const dash = `${value} ${100 - value}`;
            acc.segments.push(
              <circle
                key={cat.category}
                r="12"
                cx="16"
                cy="16"
                fill="none"
                stroke={COLORS[i % COLORS.length]}
                strokeWidth="7"
                strokeDasharray={dash}
                strokeDashoffset={100 - prev}
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.10))', transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
              />
            );
            acc.offset += value;
            return acc;
          }, { segments: [], offset: 0 }).segments}
          <circle r="7" cx="16" cy="16" fill="#18181b" />
        </svg>
      </div>
      <div className="mt-4 space-y-2 flex flex-col items-center">
        {breakdown.map((cat, i) => (
          <div key={cat.category} className="flex items-center gap-2 text-sm w-full justify-center max-w-xs px-3 py-2 bg-white/5 rounded-lg border border-slate-600 hover:border-indigo-500/50 transition-all">
            <span style={{ background: COLORS[i % COLORS.length] }} className="inline-block w-3 h-3 rounded-full flex-shrink-0"></span>
            <span className="font-medium text-slate-200">{cat.category}</span>
            <span className="ml-auto text-slate-400 font-bold text-sm">₹{cat.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingBreakdown;
