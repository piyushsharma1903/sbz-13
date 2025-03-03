import React, { useState } from 'react';
import { User, Camera, Settings, Shield, CreditCard, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'payment':
        return <PaymentTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <button className="mt-4 flex items-center text-indigo-600 text-sm">
                <Camera className="h-4 w-4 mr-1" />
                Change Photo
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'profile' 
                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Profile Information</span>
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'security' 
                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Shield className="h-5 w-5 mr-3" />
                <span>Security & Face ID</span>
              </button>
              
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex items-center px-4 py-3 text-left ${
                  activeTab === 'payment' 
                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Payment Methods</span>
              </button>
              
              <button
                className="flex items-center px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Preferences</span>
              </button>
              
              <button
                className="flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow-md p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>
      
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            defaultValue="123 Main Street"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-2"
          />
          <input
            type="text"
            defaultValue="Apt 4B"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              defaultValue="New York"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              defaultValue="NY"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
            <input
              type="text"
              defaultValue="10001"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const SecurityTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Security & Face ID</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Face Authentication</h3>
        <div className="bg-indigo-50 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-indigo-700">
                Face authentication is enabled for your account. This provides an additional layer of security for ticket purchases.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">Face ID for Purchases</h4>
            <p className="text-sm text-gray-600">Require face verification for all ticket purchases</p>
          </div>
          <div className="relative inline-block w-12 h-6">
            <input 
              type="checkbox" 
              id="toggle-face-id" 
              className="sr-only" 
              defaultChecked 
            />
            <label 
              htmlFor="toggle-face-id"
              className="block h-6 w-12 rounded-full bg-indigo-600 cursor-pointer"
            >
              <span 
                className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"
              ></span>
            </label>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Reset Face ID
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Password</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
            Update Password
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Two-Factor Authentication</h3>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">Enable 2FA</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <div className="relative inline-block w-12 h-6">
            <input 
              type="checkbox" 
              id="toggle-2fa" 
              className="sr-only" 
            />
            <label 
              htmlFor="toggle-2fa"
              className="block h-6 w-12 rounded-full bg-gray-300 cursor-pointer"
            >
              <span 
                className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"
              ></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Methods</h2>
      
      <div className="mb-6">
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold mr-3">
                Visa
              </div>
              <div>
                <p className="font-medium text-gray-800">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/25</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Remove
              </button>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-green-600 rounded-md flex items-center justify-center text-white font-bold mr-3">
                MC
              </div>
              <div>
                <p className="font-medium text-gray-800">•••• •••• •••• 8888</p>
                <p className="text-sm text-gray-600">Expires 09/26</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
        <CreditCard className="h-5 w-5 mr-2" />
        Add New Payment Method
      </button>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Billing Address</h3>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="font-medium text-gray-800">John Doe</p>
          <p className="text-gray-600">123 Main Street, Apt 4B</p>
          <p className="text-gray-600">New York, NY 10001</p>
          <p className="text-gray-600">United States</p>
          
          <button className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Edit Billing Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;