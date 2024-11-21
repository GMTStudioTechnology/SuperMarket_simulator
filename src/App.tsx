import  { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/ProductList';
import { CustomerQueue } from './components/CustomerQueue';
import { Store, Settings } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { SettingsModal } from './components/SettingsModal';
import { StaffManagement } from './components/StaffManagement';
import { motion } from 'framer-motion';
import { Tutorial } from './components/Tutorial';

function App() {
  const { gameStarted, initGame, loadGame, showTutorial } = useGameStore();

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md w-full mx-4"
        >
          <Store className="w-20 h-20 mx-auto mb-6 text-indigo-600" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Supermarket Simulator
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Build and manage your retail empire! Handle customers, manage inventory, and grow your business.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initGame}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:shadow-lg transition-shadow w-full"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Store className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Supermarket Simulator
              </h1>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => useGameStore.setState({ isSettingsOpen: true })}
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Dashboard />
            <div className="mt-6">
              <ProductList />
            </div>
          </div>
          <div className="space-y-6">
            <CustomerQueue />
            <StaffManagement />
          </div>
        </div>
      </main>

      <SettingsModal />
      {showTutorial && <Tutorial />}
    </div>
  );
}

export default App;