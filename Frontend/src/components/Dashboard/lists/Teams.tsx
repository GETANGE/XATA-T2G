import React, { useState } from 'react';

const CreateTeamForm: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [userIds, setUserIds] = useState<string[]>(['']); // Initially one userId field

  const handleUserIdChange = (index: number, value: string) => {
    const updatedUserIds = [...userIds];
    updatedUserIds[index] = value;
    setUserIds(updatedUserIds);
  };

  const addUserIdField = () => {
    setUserIds([...userIds, '']); // Add a new empty userId input field
  };

  const removeUserIdField = (index: number) => {
    const updatedUserIds = userIds.filter((_, i) => i !== index);
    setUserIds(updatedUserIds);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ teamName, description, userIds });
    // Handle form submission logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Create a Team</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter team name"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter team description"
              rows={4}
              required
            />
          </div>

          {/* Dynamic User ID Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-600">User IDs</label>
            {userIds.map((userId, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => handleUserIdChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter user ID #${index + 1}`}
                  required
                />
                {userIds.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUserIdField(index)}
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addUserIdField}
              className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              + Add another user ID
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamForm;
