import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Calendar, Clock, Star } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { nanoid } from 'nanoid';

interface NewTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTaskDialog: React.FC<NewTaskDialogProps> = ({ isOpen, onClose }) => {
  const addTask = useTaskStore(state => state.addTask);
  const [title, setTitle] = useState('');
  const [important, setImportant] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      id: nanoid(),
      title: title.trim(),
      completed: false,
      important,
      inProgress,
      archived: false,
      dueDate: new Date(dueDate),
    });

    setTitle('');
    setImportant(false);
    setInProgress(false);
    setDueDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  Nouvelle tâche
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre de la tâche"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    autoFocus
                  />

                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setImportant(!important)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        important ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Star size={18} />
                      <span>Important</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInProgress(!inProgress)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        inProgress ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Clock size={18} />
                      <span>En cours</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                    <Calendar size={18} className="text-gray-500" />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="bg-transparent focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Créer
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};