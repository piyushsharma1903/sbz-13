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
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-indigo-300" />
          </div>
          <input
            type="text"
            placeholder="Search concerts..."
            className="block w-full pl-10 pr-3 py-2 rounded-lg bg-indigo-700 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div className="flex items-center space-x-4">
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