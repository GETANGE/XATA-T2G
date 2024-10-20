
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar,  ArrowLeft, Edit2, MessageSquare } from 'lucide-react';//removed Flag, from imports
import { TaskDetail ,Comment } from '../../../types';


// Mock data for demonstration
const mockTaskDetail: TaskDetail = {
    id: 1,
    title: 'Create login page',
    description: 'Implement user authentication flow with login and registration forms.',
    status: 'pending',
    assignedTo: 'Kibe',
    priority: 'high',
    dueDate: '2024-12-31',
    createdAt: '2024-10-20',
    updatedAt: '2024-10-20',
    comments: [
        {
            id: 1,
            taskId: 1,
            author: 'Sarah',
            content: 'Should we add social login options?',
            createdAt: '2024-10-20T10:00:00',
        },
        {
            id: 2,
            taskId: 1,
            author: 'Mike',
            content: 'I can help with the OAuth implementation.',
            createdAt: '2024-10-20T11:30:00',
        },
    ],
    projectId: 0,
    xata_id: ''
};

const TaskDetails: React.FC = () => {
  useParams<{ id: string; }>();
  const [task, setTask] = useState<TaskDetail>(mockTaskDetail);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    setTask(editedTask);
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: task.comments.length + 1,
      taskId: task.id,
      author: 'Current User',// get from auth context
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setTask({
      ...task,
      comments: [...task.comments, comment],
    });
    setNewComment('');
  };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high':
//         return 'text-red-500';
//       case 'medium':
//         return 'text-yellow-500';
//       default:
//         return 'text-blue-500';
//     }
//   };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </button>

        <div className="flex justify-between items-start">
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                className="text-2xl font-bold p-1 border rounded"
              />
            ) : (
              <h1 className="text-2xl font-bold">{task.title}</h1>
            )}
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Edit Task'}
          </button>
        </div>
      </div>

      {/* Task Details */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
              {isEditing ? (
                <select
                  value={editedTask.status}
                  onChange={(e) => setEditedTask({...editedTask, status: e.target.value as TaskDetail['status']})}
                  className="w-full p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {task.status}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Assigned To</label>
              {isEditing ? (
                <select
                  value={editedTask.assignedTo}
                  onChange={(e) => setEditedTask({...editedTask, assignedTo: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="Kibe">Kibe</option>
                  <option value="Sarah">Sarah</option>
                  <option value="Mike">Mike</option>
                  <option value="Shikuku">Shikuku</option>
                </select>
              ) : (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{task.assignedTo}</span>
                </div>
              )}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Priority</label>
              {isEditing ? (
                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({...editedTask, priority: e.target.value as TaskDetail['priority']})}
                  className="w-full p-2 border rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <div className="flex items-center">
                  <Flag className={`w-4 h-4 mr-2 ${getPriorityColor(task.priority)}`} />
                  <span className="capitalize">{task.priority}</span>
                </div>
              )}
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Due Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
            {isEditing ? (
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                className="w-full p-2 border rounded min-h-[100px]"
              />
            ) : (
              <p className="text-gray-700">{task.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Comments
          </h2>

          {/* Add Comment */}
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border rounded-lg resize-none min-h-[100px]"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Comment
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {task.comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-medium">{comment.author}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
