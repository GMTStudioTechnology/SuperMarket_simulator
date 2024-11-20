import { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/ProductList';
import { CustomerQueue } from './components/CustomerQueue';
import { Store, DollarSign, Clock, Star, Users } from 'lucide-react';

function App() {
  const { gameStarted, initGame, loadGame, cash, day, customers } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  const handleStartGame = async () => {
    setIsLoading(true);
    await initGame();
    setIsLoading(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-white/20">
          <div className="relative">
            <Store className="w-24 h-24 mx-auto mb-6 text-indigo-600" />
            <div className="absolute -top-2 -right-2 animate-ping">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Supermarket Simulator
          </h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Build your retail empire! Manage inventory, serve customers, and grow your business from a small shop to a thriving supermarket chain.
          </p>
          <button
            onClick={handleStartGame}
            disabled={isLoading}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl
              hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting Game...
              </span>
            ) : (
              'Start Your Journey'
            )}
            {showTooltip && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Click to begin your retail adventure!
              </div>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Store className="w-10 h-10 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Supermarket Simulator
                </h1>
                <p className="text-sm text-gray-500">Welcome back, Manager!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">${cash.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-700">Day {day}</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-700">{customers.length} Customers</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 space-y-8">
        <Dashboard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductList />
          <CustomerQueue />
        </div>
      </main>
    </div>
  );
}

export default App;