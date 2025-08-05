import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

interface NotificationsProps {
  notifications: Notification[];
  onRemove: (id: number) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onRemove }) => {
  useEffect(() => {
    const timers = notifications.map(notification => 
      setTimeout(() => onRemove(notification.id), 5000)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, onRemove]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 space-y-3 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full ${getBackgroundColor(notification.type)} border rounded-xl shadow-2xl p-4 transition-all duration-500 transform animate-slideInFromTop hover-lift backdrop-blur-sm`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 animate-pulse-glow">
              {getIcon(notification.type)}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 animate-fadeInUp">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1 animate-fadeInUp stagger-1">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => onRemove(notification.id)}
                className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;