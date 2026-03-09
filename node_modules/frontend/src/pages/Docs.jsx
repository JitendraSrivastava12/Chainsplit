import React, { useState } from 'react';
import { Copy, Terminal, Server, Shield, Coins, Clock, ChevronRight, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

const Docs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const tabs = ['Protocol API', 'Admin Controls', 'Settlement Rules'];

  return (
    <div className="max-w-6xl mx-auto py-20 px-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Protocol Interaction Guide</h1>
        <p className="text-xl text-gray-500">How platforms, admins, and creators interact with the ChainSplit backend relayer and smart contract.</p>
      </div>

      {/* API & Contract Context */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-8 border border-gray-100 rounded-3xl bg-blue-50/20">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Server size={18} />
            <p className="text-xs font-bold uppercase tracking-widest">Backend Base URL</p>
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-100 font-mono text-xs">
            <code>http://localhost:5000/api</code>
            <Copy size={14} className="text-gray-400 cursor-pointer hover:text-black" onClick={() => copyToClipboard('http://localhost:5000/api')} />
          </div>
        </div>
        
        <div className="p-8 border border-gray-100 rounded-3xl bg-purple-50/20">
          <div className="flex items-center gap-2 mb-4 text-purple-600">
            <Shield size={18} />
            <p className="text-xs font-bold uppercase tracking-widest">Contract (Sepolia)</p>
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-purple-100 font-mono text-xs">
            <code>0x452D78Cee3f5c67ead028225FBcF11CF504B8549</code>
            <Copy size={14} className="text-gray-400 cursor-pointer hover:text-black" onClick={() => copyToClipboard('0x452D78Cee3f5c67ead028225FBcF11CF504B8549')} />
          </div>
        </div>

        <div className="p-8 border border-gray-100 rounded-3xl bg-orange-50/20">
          <div className="flex items-center gap-2 mb-4 text-orange-600">
            <Coins size={18} />
            <p className="text-xs font-bold uppercase tracking-widest">Protocol Fee</p>
          </div>
          <h3 className="text-xl font-bold text-orange-900">200 BPS (2%)</h3>
          <p className="text-gray-400 text-xs mt-1">Deducted on deposit to fund automated daily relayers.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-100 mb-12 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveTab(idx)}
            className={`pb-4 text-sm font-bold whitespace-nowrap transition-all ${activeTab === idx ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        
        {/* TAB 0: CREATE DEAL */}
        {activeTab === 0 && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">1. Initialize Escrow</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Call the <code>/create</code> endpoint to initiate a new revenue split. Our backend manages the 2% fee and executes the on-chain deposit.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={18} className="text-orange-500" /> 
                    <span><b>New Rule:</b> Shares must total 9800 BPS (leaving 2% for protocol).</span>
                  </li>
                  <li className="flex gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={18} className="text-green-500" /> 
                    <span>Funds are locked on Sepolia until mutual approval or deadline.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#0a0b0d] p-6 rounded-2xl shadow-xl">
                <p className="text-gray-500 text-[10px] font-mono mb-2 uppercase">POST /payments/create</p>
                <pre className="text-blue-300 font-mono text-xs overflow-x-auto">
{`{
  "dealId": 2026,
  "amount": 0.5,
  "creatorAddress": "0x...",
  "platformAddress": "0x...",
  "deadline": 1741344000,
  "platformShare": 7000,
  "creatorShare": 2800 // Total must be 9800
}`}
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* TAB 1: ADMIN CONTROL */}
        {activeTab === 1 && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">2. Manage Two-Key Approvals</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The protocol uses a dual-flag system. When you approve both parties, the backend triggers an <b>immediate push payout</b>.
                </p>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-black">
                    <Zap size={16} className="text-yellow-500 fill-yellow-500"/> Instant Release Logic:
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    If <code>approvePlatform</code> and <code>approveCreator</code> are both set to true, the API calls <code>autoRelease</code> immediately.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-2 font-medium">
                    <li>• User Gas: $0 (Paid by Backend)</li>
                    <li>• Payout Speed: Instant after block confirmation</li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#0a0b0d] p-6 rounded-2xl shadow-xl">
                <p className="text-gray-500 text-[10px] font-mono mb-2 uppercase">POST /payments/approve</p>
                <pre className="text-green-400 font-mono text-xs overflow-x-auto">
{`{
  "dealId": 2026,
  "approvePlatform": true,
  "approveCreator": true
}`}
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: SETTLEMENT LOGIC */}
        {activeTab === 2 && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">3. Automated "Zero-Touch" Settlement</h3>
              <p className="text-gray-600 mb-10 leading-relaxed">
                ChainSplit operates an autonomous 24-hour relayer. We manage the blockchain state and pay gas fees to ensure funds land directly in user wallets.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 border border-blue-100 bg-blue-50/20 rounded-3xl">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Clock size={20}/> Daily Cron Job
                  </h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Every 24 hours at midnight, our backend relayer scans the blockchain for expired or approved deals and executes the <code>autoRelease</code> function.
                  </p>
                </div>

                <div className="p-8 border border-red-100 bg-red-50/20 rounded-3xl">
                  <h4 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                    <AlertTriangle size={20}/> Stalling Penalty
                  </h4>
                  <p className="text-sm text-red-800 leading-relaxed">
                    If a deadline expires without platform approval, the relayer automatically redirects <b>5% of the Platform's share</b> to the admin wallet.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-3xl p-8 shadow-inner">
                <div className="flex items-center justify-between mb-6 text-gray-400">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest">Relayer Architecture</span>
                  <Terminal size={18} />
                </div>
                <div className="space-y-4">
                   <p className="text-gray-400 text-sm italic">"Users never pay gas. The 2% protocol fee funds the daily automated push of ETH to their addresses."</p>
                   <div className="bg-black/50 p-4 rounded-xl border border-gray-800 font-mono text-xs text-blue-300">
                     await contract.autoRelease(dealId); // Signed by Backend Wallet
                   </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Docs;