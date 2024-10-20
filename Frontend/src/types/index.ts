export interface Task {
    id: number;
    title: string;
    status: 'pending' | 'completed';
    assignedTo: string;
  }
  
  export interface Project {
    id: number;
    name: string;
    tasksCount: number;
  }
  
  export interface StatsCardProps {
    title: string;
    value: number;
    Icon: React.ComponentType<any>;
  }