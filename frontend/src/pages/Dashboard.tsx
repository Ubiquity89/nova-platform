import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/dashboard/stats').then((res) => res.data),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 h-32" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentTasks = dashboardData?.recentTasks || [];
  const upcomingDeadlines = dashboardData?.upcomingDeadlines || [];
  const projectProgress = dashboardData?.projectProgress || [];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProjects || 0}</p>
              </div>
              <div className="text-4xl">📁</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeProjects || 0}</p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTasks || 0}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedTasks || 0}</p>
              </div>
              <div className="text-4xl">🎉</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
            {recentTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent tasks</p>
            ) : (
              <div className="space-y-3">
                {recentTasks.map((task: any) => (
                  <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-500">{task.project?.name}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        task.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No upcoming deadlines</p>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map((task: any) => (
                  <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-500">{task.project?.name}</p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
          {projectProgress.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No projects yet</p>
          ) : (
            <div className="space-y-4">
              {projectProgress.map((project: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{project.name}</span>
                    <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
