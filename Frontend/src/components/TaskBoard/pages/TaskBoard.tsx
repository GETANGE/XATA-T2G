import React, { useState, useEffect } from 'react';
import { Task } from '../../../types';
import KanbanColumn from '../lists/KanbanColumn';
import { mockTasks, mockTeamMembers } from '../../../data/mockData';

interface TeamMember {
  name: string;
  role: string;
}

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Fetch tasks and team members from mock data
    setTasks(mockTasks);
    setTeamMembers(mockTeamMembers);
  }, []);

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

      {/* Main Content Section */}
      <div className="flex justify-between px-8 py-6 bg-white h-full">
        
        {/* My Tasks Section */}
        <div className="my-tasks bg-gray-100 p-4 flex-1 mr-3 rounded-lg shadow-md">
          <h2 className="font-bold text-gray-700 text-lg mb-4">My Tasks</h2>
          <ul className="space-y-4">
            {tasks.map(task => (
              <li key={task.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Due: {task.dueDate ? task.dueDate : 'N/A'} | Assigned to: {task.assignedTo ? task.assignedTo : 'Unassigned'}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Kanban Columns Section */}
        <div className="flex justify-center gap-4 flex-2">
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

        {/* Team Members Section */}
        <div className="team-members bg-gray-100 p-4 flex-1 ml-2 rounded-lg shadow-md">
          <h2 className="font-bold text-gray-700 text-lg mb-4">Team Members</h2>
          <ul className="space-y-4">
            {teamMembers.map((member) => (
              <li key={member.name} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
