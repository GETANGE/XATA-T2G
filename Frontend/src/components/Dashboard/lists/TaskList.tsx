import { Task } from '../../../types';

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
            </div>
            <div>
              <h3 className="font-medium"><span style={{color:'green'}}>Due date </span>: {task.dueDate}</h3>
            </div>
            <span 
              className={`px-2 py-1 rounded-full text-sm ${
                task.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;