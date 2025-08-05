import React from 'react';
import { Clock, User, FileText, Mail } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'user',
      message: 'New user registration: Alice Johnson',
      time: '2 minutes ago',
      icon: User
    },
    {
      id: 2,
      type: 'content',
      message: 'Hero section updated',
      time: '15 minutes ago',
      icon: FileText
    },
    {
      id: 3,
      type: 'lead',
      message: 'New lead submission from Tech Corp',
      time: '1 hour ago',
      icon: Mail
    },
    {
      id: 4,
      type: 'content',
      message: 'New testimonial added',
      time: '2 hours ago',
      icon: FileText
    }
  ];

  return (
    <div className="glass-effect p-6 rounded-xl shadow-xl border border-white/20 hover-lift">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 animate-fadeInUp">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-all duration-300 cursor-pointer group smooth-appear stagger-${index + 1}`}>
              <div className="p-2 bg-gradient-to-br from-gray-100 to-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 group-hover:text-blue-900 transition-colors duration-300">{activity.message}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="w-3 h-3 mr-1 group-hover:text-blue-500 transition-colors duration-300" />
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;