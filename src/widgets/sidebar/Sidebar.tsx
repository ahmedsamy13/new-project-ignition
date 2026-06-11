import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
      <nav className="flex flex-col space-y-2">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Navigation</h2>
        {/* Future: Map through route definitions to build navigation links */}
      </nav>
    </aside>
  );
};
