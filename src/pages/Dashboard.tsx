import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket, ShoppingBag } from 'lucide-react';
import { concerts, userTickets } from '../data/concerts';

const Dashboard: React.FC = () => {
  const userConcerts = userTickets.map(ticket => {
    const concertDetails = concerts.find(c => c.id === ticket.concertId);
    return { ...ticket, concert: concertDetails };
  });
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">My Tickets</h2>
          <Link to="/market" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Sell Tickets
          </Link>
        </div>
        
        {userConcerts.length > 0 ? (
          <div className="space-y-4">
            {userConcerts.map(ticket => (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="w-full md:w-16 h-16 rounded-md overflow-hidden mb-4 md:mb-0">
                    <img 
                      src={ticket.concert?.image} 
                      alt={ticket.concert?.artist} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:ml-4 flex-grow">
                    <h3 className="font-bold text-gray-800">{ticket.concert?.artist}</h3>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {ticket.concert?.date && new Date(ticket.concert.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{ticket.concert?.venue}, {ticket.concert?.city}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
                    <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {ticket.section} • Row {ticket.row} • Seat {ticket.seat}
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                      <Ticket className="h-4 w-4 mr-1" />
                      View Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Ticket className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">You don't have any tickets yet.</p>
            <Link 
              to="/" 
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Browse Concerts
            </Link>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Purchase History</h2>
        
        {userConcerts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Purchased
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userConcerts.map(ticket => (
                  <tr key={ticket.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            src={ticket.concert?.image} 
                            alt={ticket.concert?.artist} 
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {ticket.concert?.artist}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ticket.concert?.venue}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(ticket.purchaseDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${ticket.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No purchase history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;