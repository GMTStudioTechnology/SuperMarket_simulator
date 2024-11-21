import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { X } from 'lucide-react';

export const Tutorial: React.FC = () => {
  const steps = [
    {
      title: "Welcome to Your Supermarket!",
      content: "Learn the basics of running your store in this quick tutorial."
    },
    {
      title: "Managing Inventory",
      content: "Buy products at supplier prices and set your selling prices. Watch out for perishable items!"
    },
    {
      title: "Serving Customers",
      content: "Customers will queue up with shopping lists. Serve them quickly before they lose patience!"
    },
    {
      title: "Staff Management",
      content: "Hire employees to help with restocking and checkout. Each employee costs a daily salary."
    }
  ];

  const [currentStep, setCurrentStep] = React.useState(0);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      useGameStore.setState({ showTutorial: false });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Tutorial</h2>
          <button
            onClick={() => useGameStore.setState({ showTutorial: false })}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <motion.div
          key={currentStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-6"
        >
          <h3 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h3>
          <p className="text-gray-600">{steps[currentStep].content}</p>
        </motion.div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextStep}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};