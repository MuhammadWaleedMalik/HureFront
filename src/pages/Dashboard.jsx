import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Briefcase, Clock } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAIUsers: 0,
    totalUsers: 0,
    totalClients: 0,
    latestUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseUrl = import.meta.env.VITE_API_URL || '';

        // Fetch all data in parallel
        const [totalUsers, latestUsersRes, usersRes, clinicsRes] = await Promise.all([
          fetch(`${baseUrl}/api/dashboard/total-users`),
          fetch(`${baseUrl}/api/dashboard/latest-users`),
          fetch(`${baseUrl}/api/dashboard/users`),
          fetch(`${baseUrl}/api/dashboard/clinics`)
        ]);

        if (!totalUsers.ok || !latestUsersRes.ok || !usersRes.ok || !clinicsRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [totalUsersData, latestUsersData, usersData, clinicsData] = await Promise.all([
          totalUsers.json(),
          latestUsersRes.json(),
          usersRes.json(),
          clinicsRes.json()
        ]);

        setStats({
          totalAIUsers: totalUsersData.totalUsers, // Update this if you have AI users endpoint
          totalUsers: totalUsersData.totalUsers || 0,
          totalClients: clinicsData.clinics?.length || 0,
          latestUsers: latestUsersData.latestUsers || []
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatsCard = ({ title, value, icon: Icon }) => {
    return (
      <div className="glass-effect p-6 rounded-xl shadow-lg border border-white/20 hover-lift transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    );
  };

  const RecentUsersTable = ({ users }) => {
    if (!users || users.length === 0) {
      return <p className="text-gray-500">No recent users found</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.role?.toLowerCase() || 'user'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.phone || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.date ? new Date(user.date).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const dashboardStats = [
    { title: 'Total Users', value: stats.totalAIUsers, icon: Users },
    { title: 'Total Rrgular Users', value: stats.totalUsers, icon: UserPlus },
    { title: 'Total Clinics', value: stats.totalClients, icon: Briefcase },
    { title: 'Recent Users', value: stats.latestUsers.length, icon: Clock }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">Key metrics and recent activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatsCard 
            key={index} 
            title={stat.title} 
            value={stat.value.toString()} 
            icon={stat.icon} 
          />
        ))}
      </div>

      <div className="glass-effect p-6 rounded-xl shadow-xl border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
        <RecentUsersTable users={stats.latestUsers} />
      </div>
    </div>
  );
};

export default Dashboard;