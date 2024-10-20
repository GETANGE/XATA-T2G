/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Task {
    id: number;
    title: string;
    status: 'pending' | 'completed' | 'started';
    assignedTo: string;
    dueDate: string;
  }
  
  export interface Project {
    id: number;
    name: string;
    tasksCount: number;
    admin:string;
    description: string;
  }
  
  export interface StatsCardProps {
    title: string;
    value: number | any[];
    Icon: React.ComponentType<any>;
  }