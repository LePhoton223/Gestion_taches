import React from 'react';
import { Sidebar } from './components/Sidebar';
import { TaskBoard } from './components/TaskBoard';

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <TaskBoard />
    </div>
  );
}

export default App;