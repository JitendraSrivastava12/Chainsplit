import React, { useState } from 'react';
import { 
  Copy, Terminal, Server, Shield, Coins, Clock, CheckCircle2, 
  AlertTriangle, Zap, Code2, Globe, ExternalLink, Menu, X, ChevronUp,
  Cpu, Activity, Layers
} from 'lucide-react';

const Docs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const tabs = [
    { name: 'Protocol API', icon: <Server size={16}/> },
    { name: 'Admin Controls', icon: <Shield size={16}/> },
    { name: 'Settlement Rules', icon: <Clock size={16}/> },
    { name: 'Events & Hooks', icon: <Activity size={16}/> }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:py-16 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-blue-600" size={20} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Developer Documentation</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-4 lg:mb-6 tracking-tight">Protocol Interaction Guide</h1>
          <p className="text-base lg:text-lg text-slate-500 leading-relaxed">
            Integrate the ChainSplit infrastructure. Our API manages complex on-chain revenue splits and gas-free settlements for your platform.
          </p>
        </div>

        {/* Global Configuration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <Globe size={14} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Base API Endpoint</p>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[11px] text-slate-600">
              <code>http://localhost:5000/api</code>
              <button onClick={() => copyToClipboard('http://localhost:5000/api')} className="hover:text-blue-600">
                <Copy size={14} />
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <Shield size={14} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Contract (Sepolia)</p>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[11px] text-slate-600">
              <code>0x45...8549</code>
              <button onClick={() => copyToClipboard('0x452D78Cee3f5c67ead028225FBcF11CF504B8549')} className="hover:text-blue-600">
                <Copy size={14} />
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <Coins size={14} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Protocol Fee</p>
            </div>
            <div className="flex items-baseline gap-2">
               <h3 className="text-xl font-semibold text-slate-900">200 BPS</h3>
               <span className="text-xs text-slate-400">(2.0%)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start relative">
          
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:flex lg:w-64 sticky top-28 flex-col space-y-1">
            {tabs.map((tab, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveTab(idx)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === idx 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </aside>

          {/* MOBILE TABS OVERLAY */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm">
            {isMobileMenuOpen && (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl mb-3 p-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {tabs.map((tab, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => {
                      setActiveTab(idx);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm font-semibold transition-all mb-1 last:mb-0 ${
                      activeTab === idx ? 'bg-slate-50 text-blue-600' : 'text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {tab.icon}
                      {tab.name}
                    </div>
                  </button>
                ))}
              </div>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-[#0F172A] text-white flex items-center justify-between px-6 py-4 rounded-2xl shadow-xl active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-3">
                <Menu size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">{tabs[activeTab].name}</span>
              </div>
              <ChevronUp size={18} className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Main Doc Window */}
          <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] p-6 lg:p-12 shadow-sm min-h-[500px] w-full">
            
            {activeTab === 0 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-6 font-sans">Initialize Smart Escrow</h2>
                <p className="text-sm lg:text-base text-slate-500 leading-relaxed mb-8">
                  Issue a POST request to our secure relayer to lock funds on-chain. This handles the 2% protocol fee and begins the settlement timer.
                </p>
                <div className="bg-[#0F172A] rounded-2xl overflow-hidden shadow-lg mb-8">
                  <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Endpoint: /payments/create</span>
                    <Terminal size={14} className="text-slate-500" />
                  </div>
                  <pre className="p-4 lg:p-6 text-blue-300 font-mono text-[10px] lg:text-xs overflow-x-auto">
{`{
  "dealId": 2026,
  "amount": 0.5,           // Amount in ETH
  "creatorAddress": "0x...",
  "platformAddress": "0x...",
  "deadline": 1741344000,  // Unix timestamp
  "platformShare": 7000,   // 70.00%
  "creatorShare": 2800    // 28.00% (Total 9800)
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-6">Dual-Key Governance</h2>
                <p className="text-sm lg:text-base text-slate-500 leading-relaxed mb-8">
                  Control the flow of funds. Approving both keys triggers an instant push payout to all parties.
                </p>
                <div className="bg-[#0F172A] rounded-2xl overflow-hidden shadow-lg">
                   <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Endpoint: /payments/approve</span>
                    <Terminal size={14} className="text-slate-500" />
                  </div>
                  <pre className="p-4 lg:p-6 text-green-400 font-mono text-[10px] lg:text-xs">
{`{
  "dealId": 2026,
  "approvePlatform": true,
  "approveCreator": true
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-6 font-sans">Automated Settlement Engine</h2>
                <div className="grid gap-4">
                  <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                        <Clock className="text-blue-600" size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">24h Batch Processing</h4>
                        <p className="text-[11px] text-slate-500 mt-1">Our relayer executes the 'autoRelease' function every midnight UTC for all expired deals.</p>
                    </div>
                  </div>
                  <div className="p-6 bg-red-50/50 rounded-[1.5rem] border border-red-100 flex gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                        <AlertTriangle className="text-red-600" size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-red-900">Inactivity Enforcement</h4>
                        <p className="text-[11px] text-red-600/70 mt-1">Deals released via deadline expiration incur a 5% platform penalty to the protocol treasury.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-6">On-Chain Event Listeners</h2>
                <p className="text-sm text-slate-500 mb-6 italic">Listen to these events on your frontend to provide real-time UI updates.</p>
                <div className="bg-[#0F172A] rounded-2xl overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-blue-400">ethers.js / wagmi hooks</span>
                  </div>
                  <pre className="p-6 text-blue-300 font-mono text-[10px] lg:text-xs leading-relaxed">
{`// Listen for New Deposits
contract.on("FundsDeposited", (id, amount, creator) => {
  console.log(\`Vault #\${id} created for \${creator}\`);
});

// Listen for Payouts
contract.on("FundsReleased", (id, platformAmt, creatorAmt) => {
  toast.success("Revenue distributed successfully!");
});`}
                  </pre>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;