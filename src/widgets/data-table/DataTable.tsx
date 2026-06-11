import React from 'react';

export const DataTable: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400">Column 1</th>
            <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400">Column 2</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td className="p-4 text-gray-900 dark:text-gray-100">Row 1 Data</td>
            <td className="p-4 text-gray-900 dark:text-gray-100">Row 1 Data</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
