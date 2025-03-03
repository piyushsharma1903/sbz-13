import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Filter } from 'lucide-react';
import { concerts, Concert } from '../data/concerts';

const Home: React.FC = () => {
  const [filteredConcerts, setFilteredConcerts] = useState<Concert[]>(concerts);
  const [cityFilter, setCityFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const cities = Array.from(new Set(concerts.map(concert => concert.city)));
  
  useEffect(() => {
    let result = concerts;
    
    if (cityFilter) {
      result = result.filter(concert => concert.city === cityFilter);
    }
    
    if (dateFilter) {
      result = result.filter(concert => concert.date >= dateFilter);
    }
    
    setFilteredConcerts(result);
  }, [cityFilter, dateFilter]);
  
  const clearFilters = () => {
    setCityFilter('');
    setDateFilter('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upcoming Concerts</h1>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcerts.map(concert => (
          <Link 
            to={`/concert/${concert.id}`} 
            key={concert.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={concert.image} 
                alt={concert.artist} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{concert.artist}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {new Date(concert.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })} • {concert.time}
                </span>
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{concert.venue}, {concert.city}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-600 font-bold">${concert.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">{concert.availableTickets} tickets left</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredConcerts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No concerts found matching your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;