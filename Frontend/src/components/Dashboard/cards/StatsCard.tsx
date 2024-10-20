import { StatsCardProps } from './../../../types';

const StatsCard = ({ title, value, Icon }: StatsCardProps) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <Icon className="h-5 w-5 text-gray-500" />
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatsCard;