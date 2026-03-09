import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Share2, Code } from 'lucide-react';
import { ethers } from 'ethers';

const Navbar = () => {
  const [account, setAccount] = useState(null);

  // Logic to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-black p-1.5 rounded-lg">
            <Share2 className="text-white w-6 h-6 rotate-90" />
          </div>
          <span className="text-2xl font-bold tracking-tight">ChainSplit</span>
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/docs" className="hover:text-black flex items-center gap-1 transition-colors">
            <Code size={16} className="opacity-40" /> Integration
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Wallet Connection Button */}
        <button 
          onClick={connectWallet}
          className="flex items-center gap-2 bg-[#0a0b0d] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition shadow-sm active:scale-95"
        >
          <Wallet className="w-4 h-4" />
          {account ? `${account.substring(0, 6)}...${account.substring(38)}` : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;