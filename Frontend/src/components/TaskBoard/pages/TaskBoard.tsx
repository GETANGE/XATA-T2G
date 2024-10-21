import React, { useState } from 'react';
import { Task } from '../../../types';
import KanbanColumn from '../lists/KanbanColumn';
import mockTasks from '../../../data/mockData';
//import mockTasks  from '../../../data/mockData';

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status }
        : task
    ));
  };

  const getTasksByStatus = (status: Task['status']) => 
    tasks.filter(task => task.status === status);

  return (
    <div className="h-screen bg-white">
      {/* Header Section */}
      <div className="py-6 px-8 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
        <p className="text-gray-600 mt-1">Drag and drop tasks to update their status</p>
      </div>

      {/* Board Section */}
      <div className="px-8 py-6">
        <div className="flex justify-center gap-6 h-full">
          <KanbanColumn
            title="Pending"
            status="pending"
            tasks={getTasksByStatus('pending')}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
          <KanbanColumn
            title="In Progress"
            status="inProgress"
            tasks={getTasksByStatus('inProgress')}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
          <KanbanColumn
            title="Completed"
            status="completed"
            tasks={getTasksByStatus('completed')}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;