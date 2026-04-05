
import './App.css';
import { FinanceProvider } from "./context/FinanceContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 flex flex-col items-center">
        {/* Header */}
        <div className="w-full mb-8 mt-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl shadow-2xl p-1">
              <div className="bg-slate-900 rounded-2xl px-6 md:px-8 py-6 md:py-8">
                <h1 className="text-4xl md:text-5xl font-black text-white">💰 Finance Dashboard</h1>
                <p className="text-slate-400 mt-2 text-sm md:text-base">Track your financial activity with real-time insights</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl">
          <Dashboard />
        </div>
      </div>
    </FinanceProvider>
  );
}

export default App
