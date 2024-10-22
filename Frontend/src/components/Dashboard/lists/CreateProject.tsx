/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios';

const CreateProjectForm: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const projectUrl = `http://localhost:5000/api/v1/project`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const projectData = {
      name: projectName,
      adminId: userId,
    };

    try {
      const response = await axios.post(projectUrl, projectData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Response:', response.data);

      // Clear form on success
      setProjectName('');
      setUserId('');
      setSuccessMessage('Project created successfully!');
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'An error occurred while creating the project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Create a Project</h2>

        {/* Display Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Display Success Message */}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* User ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Team ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter leader ID"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
