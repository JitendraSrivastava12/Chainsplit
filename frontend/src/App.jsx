// Remove the "Router" import and tags!
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Docs from './pages/Docs';

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;