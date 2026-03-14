import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Docs from './pages/Docs';
import Dashboard from './pages/Dashboard'; // Import your new Dashboard

function App() {
  // We lift the account state here so all pages can see who is logged in
  const [account, setAccount] = useState(null);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased bg-white">
      {/* Pass account and setAccount to Navbar so it can handle the login */}
      <Navbar account={account} setAccount={setAccount} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/docs" element={<Docs />} />
          
          {/* Dashboard Route: If not logged in, it sends them Home */}
          <Route 
            path="/dashboard" 
            element={account ? <Dashboard account={account} /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;