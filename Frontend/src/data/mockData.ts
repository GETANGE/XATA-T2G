import { Task, Project } from '../types';

export const mockTasks: Task[] = [
  { id: 1, title: 'Create login page', status: 'pending', assignedTo: 'Kibe' },
  { id: 2, title: 'Design database', status: 'completed', assignedTo: 'Sarah' },
  { id: 3, title: 'Set up API routes', status: 'pending', assignedTo: 'Mike' },
  { id: 4, title: 'Write documentation', status: 'completed', assignedTo: 'Shikuku' },
];

export const mockProjects: Project[] = [
  { id: 1, name: 'Website Redesign', tasksCount: 8 },
  { id: 2, name: 'Mobile App', tasksCount: 5 },
  { id: 3, name: 'API Development', tasksCount: 12 },
];

export const totalTeamMembers = 5;