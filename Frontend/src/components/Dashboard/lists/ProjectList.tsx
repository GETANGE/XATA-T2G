import { Project } from '../../../types';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <div className="space-y-4">
        {projects.map(project => (
          <div 
            key={project.id} 
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <span className="font-medium">{project.name}</span>
              <p className="text-sm text-gray-500">{project.tasksCount} tasks</p>
            </div>
            <button 
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
              onClick={() => alert(`Viewing ${project.name}`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;