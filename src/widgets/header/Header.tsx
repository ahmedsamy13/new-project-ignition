import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">App Header</h1>
        {/* Future: Compose features here like Auth User Profile, Notifications, etc. */}
      </div>
    </header>
  );
};
