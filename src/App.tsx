import React, { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/ProductList';
import { CustomerQueue } from './components/CustomerQueue';
import { Store } from 'lucide-react';

function App() {
  const { gameStarted, initGame, loadGame } = useGameStore();

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <Store className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
          <h1 className="text-3xl font-bold mb-4">Supermarket Simulator</h1>
          <p className="text-gray-600 mb-6">
            Manage your own supermarket, serve customers, and grow your business!
          </p>
          <button
            onClick={initGame}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Store className="w-8 h-8 text-indigo-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Supermarket Simulator</h1>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6">
        <Dashboard />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductList />
          <CustomerQueue />
        </div>
      </main>
    </div>
  );
}

export default App;