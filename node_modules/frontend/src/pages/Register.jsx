import React, { useState } from 'react';
import { Wallet, Globe, Mail, FileText } from 'lucide-react';

const Register = () => {
  return (
    <div className="max-w-3xl mx-auto py-20 px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-3">Register Your Platform</h1>
        <p className="text-gray-500 text-lg">Connect your platform to ChainSplit and start processing creator revenue splits</p>
      </div>

      {/* Wallet Alert */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4 mb-10">
        <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-100">
          <Wallet className="text-blue-600 w-5 h-5" />
        </div>
        <p className="text-blue-800 text-sm font-medium pt-1">
          Please connect your wallet to register your platform. This wallet will be the owner address for your platform.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-sm">
        <h3 className="text-xl font-bold mb-8">Platform Details</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Platform Name *</label>
            <input type="text" placeholder="e.g., LearnHub Academy" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Platform URL *</label>
            <div className="relative">
              <Globe className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="https://yourplatform.com" className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Contact Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <input type="email" placeholder="contact@yourplatform.com" className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>
        </div>

        <button className="w-full mt-10 bg-gray-300 text-white font-bold py-5 rounded-2xl cursor-not-allowed transition hover:bg-gray-400">
          Register Platform
        </button>
      </div>
    </div>
  );
};

export default Register;