import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Share2, Code, LayoutDashboard } from 'lucide-react';

const Navbar = ({ account, setAccount }) => {

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
    <nav className="w-full flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-8 py-4 border-b border-gray-100 bg-white sticky top-0 z-50 overflow-x-hidden">
      <div className="flex flex-1 min-w-0 items-center gap-4 sm:gap-8 flex-wrap">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-black p-1.5 rounded-lg">
            <Share2 className="text-white w-6 h-6 rotate-90" />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight truncate">ChainSplit</span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-6 text-sm font-medium text-gray-600 flex-wrap">
          {/* Dashboard: show icon only on small screens */}
          <Link
            to="/dashboard"
            className="flex items-center gap-1 transition-colors font-bold text-black truncate"
          >
            <LayoutDashboard size={20} className="text-black" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <Link
            to="/docs"
            className="flex items-center gap-1 transition-colors truncate"
          >
            <Code size={16} className="opacity-40" />
            <span className="hidden sm:inline">Integration</span>
          </Link>
        </div>
      </div>

      {/* Wallet Button */}
      <div className="flex flex-shrink-0 items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
        <button 
          onClick={connectWallet}
          className="flex items-center gap-2 bg-[#0a0b0d] text-white px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-800 transition shadow-sm active:scale-95 max-w-[180px] truncate"
        >
          <Wallet className="w-4 h-4" />
          <span className="truncate">
            {account ? `${account.substring(0,6)}...${account.substring(account.length - 4)}` : "Connect Wallet"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;