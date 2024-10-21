/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Task } from '../../../types';
import KanbanColumn from '../lists/KanbanColumn';
import axios from 'axios';

const taskUrl = "http://localhost:5000/api/v1/task";
const teamUrl = "http://localhost:5000/api/v1/teams";
interface TeamMember {
  name: string;
  role: string;
}

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(taskUrl);
      if (response.data.status === 'success') {
        const fetchedTasks = response.data.data.map((task: any) => ({
          id: task.xata_id,
          title: task.description,
          status: task.status,
          assignedTo: task.assignedToo?.name || 'Unassigned',
          dueDate: task['Due date'],
        }));
        setTasks(fetchedTasks);
      }
    } catch (err) {
      console.log(err);
      setError('Failed to fetch tasks');
    }
  };

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${teamUrl}`);
      if (response.data.status === 'success') {
        setTeamMembers(response.data.data);
      }
    } catch (err) {
      console.log(err);
      setError('Failed to fetch team members');
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchTasks();
      await fetchTeamMembers();
    };
    initializeData();
  }, []);

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    
    // Log taskId to debug
    console.log('Dropped taskId:', taskId);
    
    if (isNaN(taskId)) {
      setError('Invalid task ID');
      return;
    }

    // Update task status in frontend
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );

    // Send PATCH request to update task status in backend
    try {
      const token = localStorage.getItem('token'); 

      const response = await axios.patch(`${taskUrl}/${taskId}`, {
        status, // Update status to the new one
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status !== 'success') {
        throw new Error('Failed to update task status');
      }
    } catch (err) {
      console.log(err);
      setError('Failed to update task status');
    }
  };

  const getTasksByStatus = (status: Task['status']) =>
    tasks.filter((task) => task.status === status);

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
        <div className="my-tasks bg-gray-100 p-4 flex-1 mr-4 rounded-lg shadow-md">
          <h2 className="font-bold text-gray-700 text-lg mb-4">My Tasks</h2>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-800">{task.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Due: {task.dueDate ? task.dueDate : 'N/A'} | Assigned to: {task.assignedTo}
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
            tasks={getTasksByStatus("pending")}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
          
          <KanbanColumn
            title="In Progress"
            status="inProgress"
            tasks={getTasksByStatus("inProgress")}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />

          <KanbanColumn
            title="Completed"
            status="completed"
            tasks={getTasksByStatus("completed")}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
          />
        </div>

        {/* Team Members Section */}
        <div className="team-members bg-gray-100 p-4 flex-1 ml-2 rounded-lg shadow-md">
          <h2 className="font-bold text-gray-700 text-lg mb-4">Work Teams</h2>
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

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default TaskBoard;
