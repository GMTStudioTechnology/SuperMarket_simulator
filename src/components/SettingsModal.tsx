import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useGameStore } from '../store/gameStore';
import { Volume2, VolumeX, Save, Trash2 } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, soundEnabled } = useGameStore();

  const toggleSound = () => {
    useGameStore.setState({ soundEnabled: !soundEnabled });
  };

  const saveGame = () => {
    useGameStore.getState().saveGame();
  };

  const resetGame = () => {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      localStorage.removeItem('supermarket-game');
      window.location.reload();
    }
  };

  return (
    <Transition.Root show={isSettingsOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => useGameStore.setState({ isSettingsOpen: false })}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Settings
              </Dialog.Title>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Sound Effects</span>
                  <button
                    onClick={toggleSound}
                    className={`p-2 rounded-lg ${
                      soundEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Save Game</span>
                  <button
                    onClick={saveGame}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Reset Game</span>
                  <button
                    onClick={resetGame}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => useGameStore.setState({ isSettingsOpen: false })}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Close Settings
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};