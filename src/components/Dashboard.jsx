import React from "react";
import SummaryCards from "./SummaryCards";
import BalanceTrend from "./BalanceTrend";
import SpendingBreakdown from "./SpendingBreakdown";
import RoleSwitcher from "./RoleSwitcher";
import Transactions from "./Transactions";
import Insights from "./Insights";

const Dashboard = () => {
  return (
    <div className="w-full space-y-6">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700">
        <RoleSwitcher />
        <SummaryCards />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-700">
          <BalanceTrend />
        </div>
        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-700">
          <SpendingBreakdown />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-700">
          <Transactions />
        </div>
        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-700">
          <Insights />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
