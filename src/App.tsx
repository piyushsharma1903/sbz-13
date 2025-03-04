import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TicketMarket from './pages/TicketMarket';
import Profile from './pages/Profile';
import ConcertDetails from './pages/ConcertDetails';
import Checkout from './pages/Checkout';
import FaceAuth from './pages/FaceAuth';
import Registration from './pages/Registration'; // Add this import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6 mb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add this new route */}
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market" element={<TicketMarket />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/concert/:id" element={<ConcertDetails />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/face-auth" element={<FaceAuth />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
