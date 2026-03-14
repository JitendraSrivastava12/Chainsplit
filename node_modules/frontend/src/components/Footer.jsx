import React from 'react';
import { Github, Twitter, FileText, Share2, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
        {/* Brand */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4 flex-shrink-0">
            <div className="bg-black p-1 rounded-lg">
              <Share2 className="text-white w-5 h-5 rotate-90" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight truncate">ChainSplit</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Decentralized revenue escrow protocol for fair content monetization.
          </p>
        </div>
        
        {/* Platform Links */}
        <div className="flex flex-col">
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Platform</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li className="hover:text-black cursor-pointer transition-colors truncate max-w-[120px]">Marketplace</li>
            <li className="hover:text-black cursor-pointer transition-colors truncate max-w-[120px]">Create Content</li>
            <li className="hover:text-black cursor-pointer transition-colors truncate max-w-[120px]">Dashboard</li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="flex flex-col">
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li className="hover:text-black cursor-pointer transition-colors truncate max-w-[120px]">Documentation</li>
            <li className="hover:text-black cursor-pointer transition-colors truncate max-w-[120px]">Smart Contract</li>
            <li className="hover:text-black cursor-pointer transition-colors truncate max-w-[120px]">Whitepaper</li>
          </ul>
        </div>

        {/* Community */}
        <div className="flex flex-col">
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Community</h4>
          <div className="flex gap-3 flex-wrap">
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
              <Github size={18}/>
            </button>
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
              <Twitter size={18}/>
            </button>
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
              <FileText size={18}/>
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="text-center border-t border-gray-50 pt-6 sm:pt-8 flex flex-col items-center gap-2">
        <p className="text-gray-400 text-xs flex items-center justify-center gap-1 flex-wrap">
          Created with <Heart size={12} className="text-red-500 fill-red-500" /> by 
          <span className="text-gray-900 font-bold italic"> Jitendra Srivastava</span>
        </p>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest flex flex-wrap justify-center">
          Solidity • Hardhat • Ethers.js • React • Tailwind • Sepolia Testnet
        </p>
        <p className="text-gray-400 text-[10px] mt-1">© 2026 ChainSplit Protocol. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;