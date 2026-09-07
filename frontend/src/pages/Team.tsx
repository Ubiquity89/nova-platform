import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import Layout from '../components/Layout';

const Team: React.FC = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then((res) => res.data),
  });

  const { data: usersWithStats } = useQuery({
    queryKey: ['usersWithStats'],
    queryFn: async () => {
      const usersData = await api.get('/users').then((res) => res.data);
      const usersWithStatsData = await Promise.all(
        usersData.map(async (user: any) => {
          const userData = await api.get(`/users/${user._id}`).then((res) => res.data);
          return { ...user, stats: userData.stats };
        })
      );
      return usersWithStatsData;
    },
    enabled: !!users,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="bg-white rounded-lg shadow p-6 h-96" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {usersWithStats?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No team members found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Tasks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed Tasks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usersWithStats?.map((user: any) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.stats?.totalTasks || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.stats?.completedTasks || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Team;
