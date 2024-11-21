import React from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { TaskList } from './TaskList';
import { motion } from 'framer-motion';

export const TaskBoard = () => {
  return (
    <div className="flex-1 overflow-hidden">
      <header className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Mes tâches</h2>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Filter size={20} className="text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <MoreVertical size={20} className="text-gray-600" />
            </motion.button>
          </div>
        </div>
        
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une tâche..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </header>

      <main className="p-6 overflow-auto h-[calc(100vh-136px)]">
        <TaskList />
      </main>
    </div>
  );
};