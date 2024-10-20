// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Task, Project } from '../types';
// import axios from 'axios';

// const projectUrl = "http://localhost:5000/api/v1/project";
// const taskUrl = "http://localhost:5000/api/v1/task";

// export let mockTasks: Task[] = [];
// export let mockProjects: Project[] = [];

// export const totalTeamMembers = 5;

// // Function to fetch tasks from the API
// export const fetchTasks = async () => {
//   try {
//     const response = await axios.get(taskUrl);
//     if (response.data && response.data.status === 'success') {
//       mockTasks = response.data.data.map((task: any) => ({
//         id: task.xata_id,
//         title: task.description,
//         status: task.status,
//         assignedTo: task.assignedToo.name,
//         dueDate: task["Due date"],
//       }));
//       console.log('Tasks fetched and stored:', mockTasks);
//     } else {
//       console.error('Failed to fetch tasks:', response.data);
//     }
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//   }
// };

// // Function to fetch projects from the API
// export const fetchProjects = async () => {
//   try {
//     const response = await axios.get(projectUrl);
//     if (response.data && response.data.status === 'success') {
//       const taskCount = response.data.results;

//       mockProjects = response.data.data.map((project: any) => ({
//         id: project.xata_id,
//         name: project.name,
//         tasksCount: taskCount,
//         description: project.adminId.description,
//         admin: project.adminId.adminId.name,
//       }));

//       console.log('Projects fetched and stored:', mockProjects);
//     } else {
//       console.error('Failed to fetch projects:', response.data);
//     }
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//   }
// };

// // Fetch data when the module is imported/loaded
// (async () => {
//   await fetchTasks();
//   await fetchProjects();
// })();
