import React from 'react';
import { TrendingUp, Users, FileCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          <span className="text-gray-400">🛡️</span> Trusted by 3+ platforms • Processing 736.6 ETH
        </div>
        <h1 className="text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
          Decentralized Escrow for <br /> Content Revenue Splits
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-12">
          ChainSplit is a third-party payment infrastructure that enables platforms to enforce 
          milestone-based revenue agreements between creators and platform operators. We charge just 1% + gas.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/docs" className="border border-gray-200 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
            View Integration Docs
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-8 mb-24 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Volume Processed", value: "736.6 ETH" },
          { label: "Active Platforms", value: "3" },
          { label: "Revenue Agreements", value: "131" },
          { label: "Transactions Processed", value: "1,847" },
        ].map((stat, i) => (
          <div key={i} className="p-8 border border-gray-100 rounded-2xl text-center">
            <p className="text-gray-400 text-sm font-medium mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="bg-[#0a0b0d] rounded-[2.5rem] p-16 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Start Using ChainSplit Today</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join platforms already using ChainSplit to handle their creator revenue splits. 
            Connect your wallet and register your platform to get started.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/docs" className="bg-transparent border border-gray-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;