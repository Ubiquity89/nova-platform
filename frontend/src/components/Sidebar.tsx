import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
    { path: '/team', label: 'Team', icon: '👥' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">NOVA</h1>
        <p className="text-sm text-gray-500">Team Productivity</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
