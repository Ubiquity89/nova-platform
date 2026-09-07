import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/api';
import Layout from '../components/Layout';

const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
  });
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.put('/users/profile', data),
    onSuccess: (response) => {
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          {message && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {message}
            </div>
          )}

          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-3xl text-blue-600 font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <span
                className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${
                  user?.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {user?.role}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
