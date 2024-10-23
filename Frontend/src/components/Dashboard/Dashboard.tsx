/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListTodo, Users, Folder, Settings, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from './layout/Header';
import StatsCard from './cards/StatsCard';
import TaskList from './lists/TaskList';
import ProjectList from './lists/ProjectList';
import axios from 'axios';
import {Task} from '../../types/index'
import { Project } from '../../types';
import Teams from './lists/Teams';
import CreateProject from './lists/CreateProject';
import UsersList from './lists/UsersList';

// Dialog Component 
const Dialog = ({ open, onOpenChange, children }: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  children: React.ReactNode 
}) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end">
          <button 
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2">{children}</div>
);

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const projectUrl = "http://localhost:5000/api/v1/project";
const taskUrl = "http://localhost:5000/api/v1/task";
const teamUrl = "http://localhost:5000/api/v1/teams";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePopup, setActivePopup] = useState<'createTeam' | 'createProject' | 'viewTasks' | 'settings' | null>(null);

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
      console.error(err);
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
      console.error(err);
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
          adminId: project.adminId.adminId.name,
          description: project.adminId.description,
        }));
        setProjects(fetchedProjects);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch projects');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchTeams(),
        fetchTasks(),
        fetchProjects()
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div className="w-2/12 h-full bg-white fixed shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-8">Dashboard</h2>
            <nav className="space-y-4">
              <button
                onClick={() => setActivePopup('createTeam')}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg"
              >
                <Users className="h-5 w-5" />
                <span>Create Team</span>
              </button>
              
              <button
                onClick={() => setActivePopup('createProject')}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg"
              >
                <Folder className="h-5 w-5" />
                <span>Create Project</span>
              </button>
              
              <button
                onClick={() => setActivePopup('viewTasks')}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg"
              >
                <ListTodo className="h-5 w-5" />
                <span>View Tasks</span>
              </button>
              
              <button
                onClick={() => setActivePopup('settings')}
                className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>
          
          <div className="mt-auto p-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-6/12 ml-80">
        <div className="max-w-6xl mx-auto p-4">
          <Header />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatsCard title="Total Tasks" value={tasks.length} Icon={ListTodo} />
            <StatsCard title="Total Projects" value={projects.length} Icon={Folder} />
            <StatsCard title="Total Teams" value={teams.length} Icon={Users} />
          </div>

          <TaskList tasks={tasks} />
          <ProjectList projects={projects} />
        </div>
      </div>
      {/* Users List */}
      {/* <div className= "w-4/12 h-screen">
        <StatsCard title={'Users'} value={undefined} Icon={Users}/>
      </div> */}
      <div className= "w-4/12 h-3/6 mt-28 mr-6">
    <UsersList/>
  </div>

      {/* Popups */}
      <Dialog open={activePopup !== null} onOpenChange={(open) => !open && setActivePopup(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {activePopup === 'createTeam' && 'Create New Team'}
              {activePopup === 'createProject' && 'Create New Project'}
              {activePopup === 'viewTasks' && 'View Tasks'}
              {activePopup === 'settings' && 'Settings'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 w-12/12">
            {activePopup === 'createTeam' && (
              <div>
                <Teams/>
              </div>
            )}
            {activePopup === 'createProject' && (
              <div>
                <CreateProject />
              </div>
            )}
            {activePopup === 'viewTasks' && (
              <div className="max-h-96 overflow-y-auto">
                <TaskList tasks={tasks} />
              </div>
            )}
            {activePopup === 'settings' && (
              <div>Settings content will go here</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;