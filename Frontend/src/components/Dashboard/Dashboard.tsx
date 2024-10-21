/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListTodo, Users, Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from './layout/Header';
import StatsCard from './cards/StatsCard';
import TaskList from './lists/TaskList';
import ProjectList from './lists/ProjectList';
import axios from 'axios';

const projectUrl = "http://localhost:5000/api/v1/project";
const taskUrl = "http://localhost:5000/api/v1/task";
const teamUrl = "http://localhost:5000/api/v1/teams";

const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(taskUrl);
      if (response.data.status === 'success') {
        const fetchedTasks = response.data.data.map((task: any) => ({
          id: task.xata_id,
          title: task.description,
          status: task.status,
          assignedTo: task.assignedToo.name,
          dueDate: task['Due date'],
        }));
        setTasks(fetchedTasks);
      }
    } catch (err) {
      console.log(err);
      setError('Failed to fetch tasks');
    }
  };

  // Fetch teams
  const fetchTeams = async () => {
    try {
      const response = await axios.get(teamUrl);
      if (response.data.status === 'success') {
        const fetchedTeams = response.data.results;
        setTeams(fetchedTeams);
      }
    } catch (err) {
      console.log(err);
      setError('Failed to fetch teams');
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(projectUrl);
      if (response.data.status === 'success') {
        const fetchedProjects = response.data.data.map((project: any) => ({
          id: project.xata_id,
          name: project.name,
          tasksCount: response.data.results,
          admin: project.adminId.adminId.name,
          description: project.adminId.description,
        }));
        setProjects(fetchedProjects);
      }
    } catch (err) {
      console.log(err);
      setError('Failed to fetch projects');
    }
  };

  // UseEffect to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchTeams();
      await fetchTasks();
      await fetchProjects();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Header />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Total Tasks" value={tasks.length} Icon={ListTodo} />
        <StatsCard title="Total Projects" value={projects.length} Icon={Folder} />
        <StatsCard title="Team Members" value={teams.length} Icon={Users} />

      </div>

      {/* Tasks and Projects */}
      <TaskList tasks={tasks} />
      <ProjectList projects={projects} />
    </div>
  );
};

export default Dashboard;
