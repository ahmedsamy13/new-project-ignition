import React from 'react';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="border rounded shadow-sm p-4">{children}</div>;
};
