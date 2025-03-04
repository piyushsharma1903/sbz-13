import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Ticket className="h-6 w-6" />
          <span className="font-bold text-xl">ConcertTix</span>
        </Link>
        <div className="relative w-full max-w-md mx-4">
          {/* ... search input remains the same ... */}
        </div>
        <div className="flex items-center space-x-4">
          {/* Add Register link here */}
          <Link 
            to="/register" 
            className="hover:text-indigo-200 transition-colors"
          >
            Register
          </Link>
          <Link to="/profile" className="hover:text-indigo-200">
            <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center">
              <span className="font-medium text-sm">JD</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
