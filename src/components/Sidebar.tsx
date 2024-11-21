import React, { useState } from 'react';
import { CheckCircle2, Calendar, Clock, Star, Archive, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';
import { NewTaskDialog } from './NewTaskDialog';

export const Sidebar = () => {
  const tasks = useTaskStore(state => state.tasks);
  const setFilter = useTaskStore(state => state.setFilter);
  const currentFilter = useTaskStore(state => state.currentFilter);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  
  const categories = [
    { id: 'all', icon: CheckCircle2, label: 'Toutes les tâches', count: tasks.length },
    { id: 'today', icon: Calendar, label: "Aujourd'hui", count: tasks.filter(t => !t.completed).length },
    { id: 'inProgress', icon: Clock, label: 'En cours', count: tasks.filter(t => t.inProgress).length },
    { id: 'important', icon: Star, label: 'Important', count: tasks.filter(t => t.important).length },
    { id: 'archived', icon: Archive, label: 'Archivées', count: tasks.filter(t => t.archived).length },
  ];

  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white border-r border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold text-gray-800"
          >
            TaskFlow
          </motion.h1>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsNewTaskOpen(true)}
          className="w-full bg-purple-600 text-white rounded-lg p-3 flex items-center justify-center space-x-2 mb-8 hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          <span>Nouvelle tâche</span>
        </motion.button>

        <nav className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                currentFilter === category.id
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <category.icon size={20} />
                <span>{category.label}</span>
              </div>
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
              >
                {category.count}
              </motion.span>
            </motion.button>
          ))}
        </nav>
      </motion.div>

      <NewTaskDialog
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
      />
    </>
  );
};