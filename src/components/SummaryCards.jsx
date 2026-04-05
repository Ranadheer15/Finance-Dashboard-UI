import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const icons = {
  'Total Balance': '💰',
  'Income': '⬆️',
  'Expenses': '⬇️',
};

const gradients = {
  'Total Balance': 'from-blue-400 via-blue-300 to-blue-200',
  'Income': 'from-green-400 via-green-300 to-green-200',
  'Expenses': 'from-pink-400 via-pink-300 to-pink-200',
};

const Card = ({ label, value }) => {
  const bgGradients = {
    'Total Balance': 'from-indigo-600/40 to-indigo-800/40',
    'Income': 'from-green-600/40 to-green-800/40',
    'Expenses': 'from-red-600/40 to-red-800/40',
  };
  const borders = {
    'Total Balance': 'border-indigo-500/50',
    'Income': 'border-green-500/50',
    'Expenses': 'border-red-500/50',
  };
  return (
    <div className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-2xl transform hover:scale-105 bg-gradient-to-br ${bgGradients[label]} shadow-lg border ${borders[label]}`}>
      <div className="relative z-10">
        <span className="text-3xl mb-2 block">{icons[label]}</span>
        <span className="text-slate-300 text-xs font-bold uppercase tracking-widest block mb-2">{label}</span>
        <span className="text-3xl font-extrabold tracking-tight text-white">{value}</span>
      </div>
    </div>
  );
};

const SummaryCards = () => {
  const { summary } = useContext(FinanceContext);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
      <Card label="Total Balance" value={`₹${summary.balance}`} />
      <Card label="Income" value={`₹${summary.income}`} />
      <Card label="Expenses" value={`₹${summary.expenses}`} />
    </div>
  );
};

export default SummaryCards;
