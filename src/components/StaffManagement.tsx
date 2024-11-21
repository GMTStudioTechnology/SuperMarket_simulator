import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const StaffManagement: React.FC = () => {
  const { employees, hireEmployee, cash } = useGameStore();

  const availableEmployees = [
    {
      id: 'alice',
      name: 'Alice',
      role: 'Stocking',
      salary: 500,
      efficiency: 0.8,
      description: 'Efficient at restocking inventory',
    },
    {
      id: 'bob',
      name: 'Bob',
      role: 'Checkout',
      salary: 600,
      efficiency: 0.9,
      description: 'Fast at processing customers',
    },
    {
      id: 'charlie',
      name: 'Charlie',
      role: 'Manager',
      salary: 800,
      efficiency: 1,
      description: 'Improves overall store efficiency',
    },
  ] as const;

  const handleHire = (employee: typeof availableEmployees[number]) => {
    if (cash >= employee.salary * 30) {
      hireEmployee({
        name: employee.name,
        role: employee.role as 'Stocking' | 'Checkout',
        salary: employee.salary,
        hireDate: new Date(),
      });
      toast.success(`${employee.name} has been hired!`);
    } else {
      toast.error('Not enough cash to hire this employee!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Staff Management
        </h2>
      </div>

      <div className="p-4">
        <div className="grid gap-4">
          {availableEmployees.map((employee) => (
            <motion.div
              key={employee.id}
              whileHover={{ scale: 1.02 }}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{employee.description}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-4 h-4" />
                  <span>{employee.salary}/day</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600 mr-2">Efficiency:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 rounded-full h-2"
                      style={{ width: `${employee.efficiency * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleHire(employee)}
                  disabled={cash < employee.salary * 30 || employees.some(e => e.name === employee.name)}
                  className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {employees.some(e => e.name === employee.name)
                    ? 'Already Hired'
                    : `Hire (${employee.salary * 30} upfront)`}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {employees.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Current Staff</h3>
            <div className="space-y-2">
              {employees.map((employee) => (
                <div
                  key={employee.name}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <div>
                    <span className="font-medium">{employee.name}</span>
                    <span className="text-sm text-gray-600 ml-2">({employee.role})</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ${employee.salary}/day
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};