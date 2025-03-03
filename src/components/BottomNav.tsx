import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, ShoppingBag, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/') ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        
        <Link 
          to="/market" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/market') ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Market</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive('/profile') ? 'text-indigo-600' : 'text-gray-500'
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;