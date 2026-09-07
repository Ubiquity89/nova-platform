import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="ml-64 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Welcome back, {user?.name}!</h2>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
