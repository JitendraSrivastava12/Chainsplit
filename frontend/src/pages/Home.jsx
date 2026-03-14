import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FileCheck, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Lock 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="bg-[#F8FAFC] overflow-x-hidden"> {/* Prevent horizontal scroll */}
      {/* Hero Section */}
      <section className="pt-10 pb-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm mb-6 sm:mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Protocol Live: 736.6 ETH Processed
          </p>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 sm:mb-8 leading-snug sm:leading-tight">
          The Infrastructure for <br /> 
          <span className="text-blue-600">Trustless Revenue Splits</span>
        </h1>
        
        <p className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base text-slate-500 mb-8 sm:mb-12 leading-relaxed">
          ChainSplit is a secure third-party payment layer. We enable platforms to automate 
          milestone-based agreements between operators and creators—enforced by smart contracts.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/docs" className="bg-white border border-slate-200 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-slate-50 transition shadow-sm">
            View API Docs
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-slate-200 bg-white/50 backdrop-blur-sm py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 text-center md:text-left">
          {[
            { label: "Volume Processed", value: "736.6 ETH", icon: <TrendingUp size={16}/> },
            { label: "Active Nodes", value: "3 Platforms", icon: <Globe size={16}/> },
            { label: "Smart Agreements", value: "131 Total", icon: <FileCheck size={16}/> },
            { label: "Uptime", value: "99.99%", icon: <ShieldCheck size={16}/> },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 text-slate-400 mb-1 justify-center md:justify-start">
                {stat.icon}
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">{stat.value}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Feature / How it Works Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Why Industry Leaders Choose ChainSplit</h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-sm sm:max-w-xl mx-auto">Built for scale. Secured by Ethereum. Optimized for minimal gas consumption.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: <Lock size={24} />,
              title: "Immutably Locked",
              desc: "Funds are held in non-custodial smart contracts until mutual approval or deadline completion."
            },
            {
              icon: <Zap size={24} />,
              title: "2% Flat Fee",
              desc: "Transparent pricing with no hidden costs. Your platform keeps 98% of the revenue generated."
            },
            {
              icon: <Users size={24} />,
              title: "Auto-Relay",
              desc: "Our protocol automatically triggers payouts upon deadline expiration, even if one party is offline."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                {feature.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{feature.title}</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-8 pb-16 sm:pb-24">
        <div className="bg-[#0F172A] rounded-2xl sm:rounded-[3rem] p-8 sm:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">Scale Your Revenue Operations</h2>
            <p className="text-xs sm:text-sm md:text-lg text-slate-400 mb-6 sm:mb-10 max-w-sm sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
              Integrate ChainSplit into your existing checkout flow or dashboard in minutes. 
              Our SEPOLIA testnet environment is ready for your first deployment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/docs" className="bg-white text-[#0F172A] px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg">
                Get Started
              </Link>
            </div>
          </div>
          {/* Limit decoration width so it doesn't cause horizontal scroll */}
          <div className="absolute top-0 right-0 w-[200px] sm:w-[384px] h-[200px] sm:h-[384px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
      </section>
    </main>
  );
};

export default Home;