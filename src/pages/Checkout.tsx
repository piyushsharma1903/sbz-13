import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, User, Lock } from 'lucide-react';
import { concerts } from '../data/concerts';

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const concert = concerts.find(c => c.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  
  if (!concert) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Concert not found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/face-auth');
  };
  
  const subtotal = concert.price * quantity;
  const serviceFee = subtotal * 0.15;
  const total = subtotal + serviceFee;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="flex items-start mb-4">
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={concert.image} 
                  alt={concert.artist} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="ml-4">
                <h3 className="font-bold text-gray-800">{concert.artist}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(concert.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })} • {concert.time}
                </p>
                <p className="text-sm text-gray-600">{concert.venue}, {concert.city}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-gray-700 mr-3">Quantity:</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l-md"
                  >
                    -
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center bg-gray-100">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(concert.availableTickets, prev + 1))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="font-medium">${(concert.price * quantity).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Proceed to Face Verification
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Total</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
              <p className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-indigo-600" />
                Secure checkout with face verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;