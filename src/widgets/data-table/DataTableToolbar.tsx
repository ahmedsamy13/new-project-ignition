import React from 'react';

export const DataTableToolbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-lg">
      <div className="flex space-x-2">
        {/* Future: Global search input, filters */}
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Toolbar Tools</span>
      </div>
      <div>
        {/* Future: Actions like Export, Add New, etc. */}
      </div>
    </div>
  );
};
