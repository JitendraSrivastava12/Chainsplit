import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Coins, 
  FileText, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck,
  Zap,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const Dashboard = ({ account }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/payments/dashboard/${account}`);
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError("Unable to sync with protocol.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) fetchDashboardData();
  }, [account]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">Securing Protocol Connection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-7xl mx-auto py-10 px-6">
        
        {/* Top Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Network: Sepolia Mainnet</p>
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Financial Overview</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden lg:flex flex-col items-end mr-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Vault Address</p>
                <p className="text-xs font-mono text-slate-600">{account.substring(0, 8)}...{account.substring(34)}</p>
             </div>
             <button 
               onClick={fetchDashboardData}
               className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
             >
               <RefreshCw size={18} className="text-slate-600" />
             </button>
          </div>
        </div>

        {/* Hero Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Main Balance Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-10 rounded-[1.5rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-blue-300/70 text-xs font-bold uppercase tracking-widest mb-6">Aggregate Escrow Balance</p>
                <div className="flex items-baseline gap-4">
                  <h2 className="text-6xl font-light text-white tracking-tighter">
                    {stats?.totalActiveMoneyETH || "0.00"}
                  </h2>
                  <span className="text-xl font-medium text-blue-400">ETH</span>
                </div>
              </div>
              <div className="mt-12 flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
                  <Zap size={16} /> Instant Settlement
                </button>
              </div>
            </div>
            {/* Subtle Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-rows-2 gap-6">
            <div className="bg-white border border-slate-200 p-8 rounded-[1.5rem] shadow-sm flex flex-col justify-between">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Agreements</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl font-semibold text-slate-900">{stats?.activeDealsCount || 0}</h3>
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                   <FileText size={20} />
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-8 rounded-[1.5rem] shadow-sm flex flex-col justify-between">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Protocol Status</p>
              <div className="flex items-center gap-3 text-green-600">
                <ShieldCheck size={24} />
                <span className="text-sm font-semibold tracking-tight">V3 Secure Core</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table Section */}
        <div className="bg-white border border-slate-200 rounded-[1.5rem] shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Pending Distributions</h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full uppercase">Queue: Live</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deal Identifier</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Allocation</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Legal Role</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto-Release</th>
                  <th className="px-8 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats?.deals && stats.deals.length > 0 ? stats.deals.map((deal) => (
                  <tr key={deal.dealId} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-mono text-xs font-semibold text-slate-500">ID-{deal.dealId}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-slate-900">{deal.myShareETH} ETH</span>
                        <span className="text-[10px] text-slate-400 font-medium">Of {deal.totalAmount} ETH total</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                        deal.role === 'Creator' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-700/10' : 'bg-slate-100 text-slate-700 ring-1 ring-slate-700/10'
                      }`}>
                        {deal.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm font-medium">{new Date(deal.deadline * 1000).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-blue-600 hover:text-white rounded-lg text-slate-400">
                        <ExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 text-sm font-medium italic">
                       No active settlement records found for this entity.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;