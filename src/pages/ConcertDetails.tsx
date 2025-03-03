import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Music, Ticket, Clock, Users } from 'lucide-react';
import { concerts } from '../data/concerts';

const ConcertDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const concert = concerts.find(c => c.id === id);
  
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
  
  const formattedDate = new Date(concert.date).toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="h-64 md:h-80 rounded-xl overflow-hidden mb-6">
        <img 
          src={concert.image} 
          alt={concert.artist} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{concert.artist}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-700">
            <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{concert.time}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{concert.venue}, {concert.city}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Music className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{concert.genre}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">{concert.description}</p>
        
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <div className="flex items-center mb-2">
              <Ticket className="h-5 w-5 mr-2 text-indigo-600" />
              <span className="text-gray-700">{concert.availableTickets} tickets available</span>
            </div>
            <div className="text-2xl font-bold text-indigo-600">${concert.price.toFixed(2)}</div>
          </div>
          
          <button
            onClick={() => navigate(`/checkout/${concert.id}`)}
            className="w-full md:w-auto mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Buy Tickets
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Venue Information</h2>
        
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(concert.venue + ' ' + concert.city)}`}
            className="w-full h-64 rounded-lg border-0"
            allowFullScreen
            loading="lazy"
            title="Map"
          ></iframe>
        </div>
        
        <div className="flex items-start space-x-2 text-gray-700">
          <Users className="h-5 w-5 mt-0.5 text-indigo-600 flex-shrink-0" />
          <p>
            Please arrive at least 30 minutes before the show starts. Doors open 1 hour before the event.
            No professional cameras or recording equipment allowed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConcertDetails;