import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Transactions = () => {
  const { filteredTransactions, filter, setFilter, role, addTransaction, editTransaction } = useContext(FinanceContext);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ date: "", amount: "", category: "", type: "expense" });

  const handleEdit = (tx) => {
    setEditing(tx.id);
    setForm({ ...tx });
  };

  const handleSave = () => {
    if (editing) {
      editTransaction(editing, form);
      setEditing(null);
    } else {
      addTransaction(form);
    }
    setForm({ date: "", amount: "", category: "", type: "expense" });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="font-bold text-2xl text-white">💳 Transactions</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="🔍 Search transactions..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full border-2 border-indigo-500/40 rounded-lg px-4 py-2 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 transition-all duration-300"
          />
        </div>
      </div>
      {role === "admin" && (
        <div className="bg-indigo-600/20 rounded-lg p-4 md:p-6 mb-6 border-2 border-indigo-500/40">
          <h3 className="font-bold text-white mb-4">➕ Add Transaction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="border-2 border-indigo-500/40 rounded-lg px-3 py-2 bg-slate-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50" placeholder="Date" />
            <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} className="border-2 border-indigo-500/40 rounded-lg px-3 py-2 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50" />
            <input type="text" placeholder="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="border-2 border-indigo-500/40 rounded-lg px-3 py-2 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50" />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="border-2 border-indigo-500/40 rounded-lg px-3 py-2 bg-slate-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold transition-all duration-300 border border-indigo-500">{editing ? "Save" : "Add"}</button>
            {editing && <button onClick={() => setEditing(null)} className="bg-red-600/70 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300">Cancel</button>}
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-600/30 border-b-2 border-indigo-500/40">
              <th className="p-3 text-left font-bold text-indigo-300">📅 Date</th>
              <th className="p-3 text-left font-bold text-green-300">💵 Amount</th>
              <th className="p-3 text-left font-bold text-yellow-300">🏷️ Category</th>
              <th className="p-3 text-left font-bold text-blue-300">📊 Type</th>
              {role === "admin" && <th className="p-3 text-center font-bold text-purple-300">⚙️ Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4} className="text-center py-8 text-gray-400 dark:text-gray-500 font-medium">No transactions found.</td>
              </tr>
            ) : filteredTransactions.map((tx, idx) => (
              <tr key={tx.id} className={`border-b border-slate-700 hover:bg-indigo-500/10 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white/3' : 'bg-white/1'}`}>
                <td className="p-3 text-slate-300">{tx.date}</td>
                <td className={`p-3 font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>₹{tx.amount}</td>
                <td className="p-3 text-slate-300">{tx.category}</td>
                <td className="p-3 capitalize"><span className={`px-3 py-1 rounded-full text-xs font-bold ${tx.type === 'income' ? 'bg-green-600/40 text-green-300 border border-green-500/50' : 'bg-red-600/40 text-red-300 border border-red-500/50'}`}>{tx.type}</span></td>
                {role === "admin" && (
                  <td className="p-3 text-center">
                    <button onClick={() => handleEdit(tx)} className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-all duration-300 text-xs font-semibold border border-indigo-500">Edit</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
