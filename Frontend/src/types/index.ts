/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface Task {
    id: number;
    title: string;
    status: 'pending' | 'inProgress' | 'completed';
    assignedTo: string;
    description: string;
    dueDate: string;
    projectId:number;
    xata_id: string;
    
  }
  
  export interface Project {
    description: ReactNode;
    id: number;
    name: string;
    tasksCount: number;
    adminId: number;
    xata_id: string;
  }
  
  export interface StatsCardProps {
    title: string;
    value: number | any;
    Icon: React.ComponentType<any>;
  }
  export interface Comment {
    id: number;
    taskId: number;
    author: string;
    content: string;
    createdAt: string;
  }
  
  export interface TaskDetail extends Task {
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
  }
  export interface Comment {
    id: number;
    taskId: number;
    author: string;
    content: string;
    createdAt: string;
  }
  
  export interface TaskDetail extends Task {
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    id: number;
  }

  export interface User{
    xata_id: ReactNode;
    name: string;
    role: string;
    xataId:string;
  }