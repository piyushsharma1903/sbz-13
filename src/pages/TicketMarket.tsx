import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Filter, Tag, ShoppingBag } from 'lucide-react';
import { concerts, marketTickets } from '../data/concerts';

const TicketMarket: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [cityFilter, setCityFilter] = useState<string>('');
  
  const cities = Array.from(new Set(concerts.map(concert => concert.city)));
  
  const marketListings = marketTickets.map(ticket => {
    const concertDetails = concerts.find(c => c.id === ticket.concertId);
    return { ...ticket, concert: concertDetails };
  });
  
  const filteredListings = marketListings.filter(listing => {
    if (cityFilter && listing.concert?.city !== cityFilter) return false;
    if (listing.price < priceRange[0] || listing.price > priceRange[1]) return false;
    return true;
  });
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };
  
  const clearFilters = () => {
    setCityFilter('');
    setPriceRange([0, 300]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ticket Marketplace</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-1 bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">$</span>
                <input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-gray-500">to</span>
                <span className="text-gray-500">$</span>
                <input
                  type="number"
                  min={priceRange[0]}
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Clear
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Resale Tickets</h2>
          <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Sell Your Tickets
          </Link>
        </div>
        
        {filteredListings.length > 0 ? (
          <div className="space-y-4">
            {filteredListings.map(listing => (
              <div key={listing.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors duration-200">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-16 h-16 rounded-md overflow-hidden mb-4 md:mb-0">
                    <img 
                      src={listing.concert?.image} 
                      alt={listing.concert?.artist} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:ml-4 flex-grow">
                    <h3 className="font-bold text-gray-800">{listing.concert?.artist}</h3>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {listing.concert?.date && new Date(listing.concert.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{listing.concert?.venue}, {listing.concert?.city}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center text-gray-600 text-sm">
                      <Tag className="h-4 w-4 mr-1" />
                      <span>Section {listing.section} • Row {listing.row} • Seat {listing.seat}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end justify-between">
                    <div className="text-sm text-gray-500">
                      Listed by {listing.seller}
                    </div>
                    
                    <div className="mt-2 md:mt-0">
                      <div className="text-xl font-bold text-indigo-600">${listing.price.toFixed(2)}</div>
                      <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No tickets found matching your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-indigo-50 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-indigo-800 mb-4">Sell Your Tickets</h2>
        <p className="text-indigo-700 mb-4">
          Need to sell your tickets? List them on our marketplace and reach thousands of fans.
        </p>
        <Link 
          to="/dashboard" 
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          List Your Tickets
        </Link>
      </div>
    </div>
  );
};

export default TicketMarket;