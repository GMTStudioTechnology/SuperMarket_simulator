import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Users, ShoppingCart } from 'lucide-react';

export const CustomerQueue: React.FC = () => {
  const { customers, serveCustomer } = useGameStore();

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Customer Queue 
            <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
              {customers.length}
            </span>
          </h2>
        </div>
        
        <div className="p-4">
          {customers.length > 0 ? (
            <div className="space-y-4">
              {customers.slice(0, 5).map((customer, index) => (
                <div
                  key={customer.id}
                  className="border rounded-lg p-4 flex items-center justify-between hover:border-blue-500 transition-all duration-200 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Shopping List:</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {customer.shoppingList.join(', ')}
                    </div>
                    
                    {/* Patience Progress Bar */}
                    <div className="mt-2">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 rounded-full ${
                            customer.patience > 60 ? 'bg-green-500' :
                            customer.patience > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          } animate-pulse`}
                          style={{ 
                            width: `${customer.patience}%`,
                            animationDuration: '2s',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => serveCustomer()}
                    className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Serve
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 animate-pulse">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              No customers in queue
            </div>
          )}
        </div>
      </div>
    </div>
  );
};