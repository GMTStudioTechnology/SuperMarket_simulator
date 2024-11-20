import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Users, ShoppingCart } from 'lucide-react';

export const CustomerQueue: React.FC = () => {
  const { customers, serveCustomer } = useGameStore();

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Customer Queue ({customers.length})
          </h2>
        </div>
        <div className="p-4">
          {customers.length > 0 ? (
            <div className="space-y-4">
              {customers.slice(0, 5).map((customer) => (
                <div
                  key={customer.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="font-medium">Shopping List:</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {customer.shoppingList.join(', ')}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      Patience: {customer.patience}%
                    </div>
                    <button
                      onClick={serveCustomer}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Serve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No customers in queue
            </div>
          )}
        </div>
      </div>
    </div>
  );
};