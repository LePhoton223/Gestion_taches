import { create } from 'zustand';
import { Task } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  toggleImportant: (id: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  filteredTasks: Task[];
  setFilter: (filter: string) => void;
  currentFilter: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Finaliser le rapport mensuel',
    completed: false,
    important: true,
    inProgress: true,
    archived: false,
    dueDate: new Date('2024-02-25'),
  },
  {
    id: '2',
    title: 'Préparer la présentation client',
    completed: false,
    important: false,
    inProgress: false,
    archived: false,
    dueDate: new Date('2024-02-26'),
  },
  {
    id: '3',
    title: 'Réviser les objectifs trimestriels',
    completed: true,
    important: false,
    inProgress: false,
    archived: false,
    dueDate: new Date('2024-02-24'),
  },
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,
  currentFilter: 'all',
  filteredTasks: initialTasks,
  addTask: (task) => set((state) => {
    const newTasks = [...state.tasks, task];
    return {
      tasks: newTasks,
      filteredTasks: state.currentFilter === 'all' ? newTasks : newTasks.filter(t => {
        switch (state.currentFilter) {
          case 'today':
            return !t.completed;
          case 'inProgress':
            return t.inProgress;
          case 'important':
            return t.important;
          case 'archived':
            return t.archived;
          default:
            return true;
        }
      })
    };
  }),
  toggleTask: (id) => set((state) => {
    const newTasks = state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    return {
      tasks: newTasks,
      filteredTasks: state.currentFilter === 'all' ? newTasks : newTasks.filter(t => {
        switch (state.currentFilter) {
          case 'today':
            return !t.completed;
          case 'inProgress':
            return t.inProgress;
          case 'important':
            return t.important;
          case 'archived':
            return t.archived;
          default:
            return true;
        }
      })
    };
  }),
  toggleImportant: (id) => set((state) => {
    const newTasks = state.tasks.map((task) =>
      task.id === id ? { ...task, important: !task.important } : task
    );
    return {
      tasks: newTasks,
      filteredTasks: state.currentFilter === 'all' ? newTasks : newTasks.filter(t => {
        switch (state.currentFilter) {
          case 'today':
            return !t.completed;
          case 'inProgress':
            return t.inProgress;
          case 'important':
            return t.important;
          case 'archived':
            return t.archived;
          default:
            return true;
        }
      })
    };
  }),
  removeTask: (id) => set((state) => {
    const newTasks = state.tasks.filter((task) => task.id !== id);
    return {
      tasks: newTasks,
      filteredTasks: state.currentFilter === 'all' ? newTasks : newTasks.filter(t => {
        switch (state.currentFilter) {
          case 'today':
            return !t.completed;
          case 'inProgress':
            return t.inProgress;
          case 'important':
            return t.important;
          case 'archived':
            return t.archived;
          default:
            return true;
        }
      })
    };
  }),
  updateTask: (id, updates) => set((state) => {
    const newTasks = state.tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    return {
      tasks: newTasks,
      filteredTasks: state.currentFilter === 'all' ? newTasks : newTasks.filter(t => {
        switch (state.currentFilter) {
          case 'today':
            return !t.completed;
          case 'inProgress':
            return t.inProgress;
          case 'important':
            return t.important;
          case 'archived':
            return t.archived;
          default:
            return true;
        }
      })
    };
  }),
  setFilter: (filter) => set((state) => {
    const filtered = state.tasks.filter(t => {
      switch (filter) {
        case 'today':
          return !t.completed;
        case 'inProgress':
          return t.inProgress;
        case 'important':
          return t.important;
        case 'archived':
          return t.archived;
        default:
          return true;
      }
    });
    return {
      currentFilter: filter,
      filteredTasks: filtered
    };
  }),
}));