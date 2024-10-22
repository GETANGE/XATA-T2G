import { Users } from 'lucide-react';
import { User } from '../../../types'; 
import StatsCard from '../cards/StatsCard';

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="mb-1 ">
        <StatsCard title="Users" value={users.length} Icon={Users} />
        </div>

      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-gray-500">No users available.</p>
        ) : (
          users.map(user => (
            <div 
              key={user.xataId} 
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
              <span className="text-sm text-gray-400">UniqueID: {user.xataId}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
