import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType, icon: Icon }) => {
  return (
    <div className="glass-effect p-6 rounded-xl shadow-xl border border-white/20 hover-lift transition-all duration-300 group">
      <div className="flex items-center">
        <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">{title}</h3>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full transition-all duration-300 ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </span>
          </div>
          <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mt-1 group-hover:scale-105 transition-transform duration-300">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;