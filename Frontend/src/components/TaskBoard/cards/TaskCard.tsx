// secondbest
// src/components/cards/TaskCard.tsx
import React from 'react';
import { Task } from '../../../types';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card 
      className="mb-2 cursor-move hover:shadow-lg transition-shadow"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <CardHeader>
        <h3 className="text-sm font-medium">{task.title}</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-1" />
            {task.assignedTo}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;