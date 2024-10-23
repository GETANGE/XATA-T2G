/* eslint-disable @typescript-eslint/no-unused-vars */
import { Users } from 'lucide-react';
import { User } from '../../../types'; 
import StatsCard from '../cards/StatsCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';


const userUrl = 'http://localhost:5000/api/v1/auth/users'

const UserList = () => {
  const [error, setError] = useState('');
  const [userss, setUsers] = useState<User[]>([]);

  // function to fetch all users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get(userUrl);
      console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8 ">
      <Toaster position="top-right"></Toaster>
        <div className="mb-1 ">
        <StatsCard title="Users" value={userss.length} Icon={Users} />
        </div>

      <div className="space-y-4">
        {userss.length === 0 ? (
          <p className="text-gray-500">No users available.</p>
        ) : (
          userss.map(user => (
            <div 
              key={user.xataId} 
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
              <span className="text-sm text-gray-400">UniqueID: {user.xata_id}</span>
              <button 
              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
              onClick={() => toast(`Deleting ${user.name}`)}
            >
              Delete
            </button>
            </div>
          ))
        )}
        {/* Display Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      </div>
    </div>
  );
};

export default UserList;
