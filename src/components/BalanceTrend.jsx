import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const BalanceTrend = () => {
  const { trend } = useContext(FinanceContext);
  // Simple SVG line chart for demonstration
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const points = trend.map((v, i) => `${(i / (trend.length - 1)) * 200},${100 - ((v - min) / (max - min || 1)) * 80}`).join(" ");
  return (
    <div className="w-full flex flex-col">
      <h2 className="mb-6 font-bold text-2xl text-indigo-300">📈 Balance Trend (7 Days)</h2>
      <svg viewBox="0 0 200 100" className="w-full h-48">
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="url(#trendGradient)"
          strokeWidth="4"
          points={points}
        />
        <circle cx={((trend.length-1)/(trend.length-1))*200} cy={100-((trend[trend.length-1]-min)/(max-min||1))*80} r="4" fill="#6366f1" />
      </svg>
    </div>
  );
};

export default BalanceTrend;
