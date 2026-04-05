import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const RoleSwitcher = () => {
  const { role, setRole, roles } = useContext(FinanceContext);
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-slate-700">
      <div>
        <span className="font-bold text-lg text-white">👤 Current Role:</span>
      </div>
      <div className="flex items-center gap-3">
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold cursor-pointer hover:bg-indigo-700 transition-all duration-300 border border-indigo-500"
        >
          {roles.map(r => (
            <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>
        <span className={`text-xs font-bold px-3 py-2 rounded-lg border ${role === 'admin' ? 'bg-red-500/30 border-red-500 text-red-300' : 'bg-indigo-500/30 border-indigo-500 text-indigo-300'}`}>
          {role === 'admin' ? '🔑 Full Access' : '👁️ View Only'}
        </span>
      </div>
    </div>
  );
};

export default RoleSwitcher;
