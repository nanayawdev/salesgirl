import React from 'react';

const NoticeBar = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-sm text-gray-600 dark:text-gray-400">
        New feature available
      </span>
    </div>
  );
};

export default NoticeBar; 