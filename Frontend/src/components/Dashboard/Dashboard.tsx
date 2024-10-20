import { ListTodo, Users, Folder } from 'lucide-react';
import Header from './layout/Header';
import StatsCard from './cards/StatsCard';
import TaskList from './lists/TaskList';
import ProjectList from './lists/ProjectList';
import { mockTasks, mockProjects, totalTeamMembers } from '../../data/mockData';

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <Header />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Total Tasks" value={mockTasks.length} Icon={ListTodo} />
        <StatsCard title="Total Projects" value={mockProjects.length} Icon={Folder} />
        <StatsCard title="Team Members" value={totalTeamMembers} Icon={Users} />
      </div>

      {/* Tasks and Projects */}
      <TaskList tasks={mockTasks} />
      <ProjectList projects={mockProjects} />
    </div>
  );
};

export default Dashboard;