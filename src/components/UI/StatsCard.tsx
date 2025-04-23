import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon,
  change,
  positive
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {change && (
          <div className="flex items-center mt-1">
            {positive !== undefined && (
              positive ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )
            )}
            <span className={`text-xs ${positive ? 'text-green-500' : positive === false ? 'text-red-500' : 'text-gray-500'}`}>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;