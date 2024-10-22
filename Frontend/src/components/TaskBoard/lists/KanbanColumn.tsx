import React from 'react';
import { Task } from '../../../types';
import TaskCard from '../cards/TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: Task['status'];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: Task['status']) => void;
  onDragStart: (e: React.DragEvent, taskId: number) => void;
}

const KanbanColumn: React.FC<ColumnProps> = ({
  title,
  tasks,
  status,
  onDragOver,
  onDrop,
  onDragStart,
}) => {
  return (
    <div className="flex-1 min-w-[300px] max-w-[400px] bg-gray-100 rounded-1g">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-700">{title}</h2>
          <span className="bg-gray-200 px-1 py-1 rounded-full text-sm">
            {tasks.length}
          </span>
        </div>
      </div>
      <div
        className="p-2 min-h-[calc(100vh-220px)] overflow-y-auto"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
      >
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;