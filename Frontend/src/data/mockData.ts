import { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Design Homepage',
    description: 'Create the homepage design for the website',
    status: 'pending',
    assignedTo: '',
    dueDate: '',
    projectId: 0,
    xata_id: ''
  },
  {
    id: 2,
    title: 'Develop API',
    description: 'Develop the backend API for user authentication',
    status: 'inProgress',
    assignedTo: '',
    dueDate: '',
    projectId: 0,
    xata_id: ''
  },
  {
    id: 3,
    title: 'Test Application',
    description: 'Perform unit and integration tests',
    status: 'pending',
    assignedTo: '',
    dueDate: '',
    projectId: 0,
    xata_id: ''
  },
  {
    id: 4,
    title: 'Deploy to Production',
    description: 'Deploy the final version of the app to the production server',
    status: 'completed',
    assignedTo: '',
    dueDate: '',
    projectId: 0,
    xata_id: ''
  }
]

export const mockTeamMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Frontend Developer',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Backend Developer',
  },
  {
    id: 3,
    name: 'Charlie Davis',
    role: 'Project Manager',
  },
  {
    id: 4,
    name: 'Diana Lee',
    role: 'UX Designer',
  },
];

export default mockTasks;
