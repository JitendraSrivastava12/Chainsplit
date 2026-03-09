import React from 'react';
import { Github, Twitter, FileText, Share2, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-black p-1 rounded-lg">
              <Share2 className="text-white w-5 h-5 rotate-90" />
            </div>
            <span className="text-xl font-bold tracking-tight">ChainSplit</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Decentralized revenue escrow protocol for fair content monetization.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Platform</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li className="hover:text-black cursor-pointer transition-colors">Marketplace</li>
            <li className="hover:text-black cursor-pointer transition-colors">Create Content</li>
            <li className="hover:text-black cursor-pointer transition-colors">Dashboard</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li className="hover:text-black cursor-pointer transition-colors">Documentation</li>
            <li className="hover:text-black cursor-pointer transition-colors">Smart Contract</li>
            <li className="hover:text-black cursor-pointer transition-colors">Whitepaper</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Community</h4>
          <div className="flex gap-3">
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all"><Github size={18}/></button>
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all"><Twitter size={18}/></button>
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all"><FileText size={18}/></button>
          </div>
        </div>
      </div>
      
      <div className="text-center border-t border-gray-50 pt-8">
        <p className="text-gray-400 text-xs flex items-center justify-center gap-1">
          Created with <Heart size={12} className="text-red-500 fill-red-500" /> by <span className="text-gray-900 font-bold italic">Jitendra Srivastava</span>
        </p>
        <p className="text-gray-400 text-[10px] mt-3 uppercase tracking-widest">
          Solidity • Hardhat • Ethers.js • React • Tailwind • Sepolia Testnet
        </p>
        <p className="text-gray-400 text-[10px] mt-2">© 2026 ChainSplit Protocol. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;