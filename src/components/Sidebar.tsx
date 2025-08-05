import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BookOpen, 
  Settings,
  
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[2] || 'dashboard';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'content', label: 'Content Management', icon: FileText, path: '/admin/content' },
    { id: 'users', label: 'User Management', icon: Users, path: '/admin/users' },
    { id: 'blog', label: 'Blog & News', icon: BookOpen, path: '/admin/blog' },
  ];

  return (
    <div className="w-64 glass-effect shadow-2xl border-r border-white/20 animate-fadeInLeft">
      <div className="p-6 border-b border-white/20">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-float">
          HURE ADMIN PANEL
        </h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                w-full flex items-center px-6 py-3 text-left transition-all duration-300 transform hover:scale-105 
                smooth-appear stagger-${index + 1} 
                ${isActive || activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-r-4 border-blue-600 shadow-lg'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:shadow-md'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 rounded-lg transition-all duration-300 hover-lift smooth-appear stagger-6">
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;