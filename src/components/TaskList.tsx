import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle, Star, Trash2 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const TaskList = () => {
  const tasks = useTaskStore(state => state.filteredTasks);
  const toggleTask = useTaskStore(state => state.toggleTask);
  const toggleImportant = useTaskStore(state => state.toggleImportant);
  const removeTask = useTaskStore(state => state.removeTask);

  return (
    <AnimatePresence mode="popLayout">
      <div className="space-y-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleTask(task.id)}
                className={`p-2 rounded-full transition-colors ${
                  task.completed
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <CheckCircle size={20} />
              </motion.button>

              <div className="flex-1">
                <h3 className={`font-medium ${
                  task.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}>
                  {task.title}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>
                      {format(new Date(task.dueDate), "d MMMM", { locale: fr })}
                    </span>
                  </div>
                  {task.inProgress && (
                    <div className="flex items-center space-x-1 text-sm text-blue-600">
                      <Clock size={14} />
                      <span>En cours</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleImportant(task.id)}
                  className={`p-2 rounded-full transition-colors ${
                    task.important
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <Star size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, color: '#EF4444' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeTask(task.id)}
                  className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};