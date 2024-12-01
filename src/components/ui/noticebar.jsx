import React from 'react';

const NoticeBar = () => {
  return (
    <a
      href="/status"
      className="hidden tablet:flex items-center rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
    >
      <span className="font-medium text-[12px] text-gray-900 dark:text-white whitespace-nowrap">
        Introducing Status
      </span>
      <span className="mx-2 text-gray-400">·</span>
      <span className="text-[12px] text-gray-600 dark:text-gray-400 whitespace-nowrap">
        Our new status reporting
      </span>
      <span className="ml-2 text-gray-400">→</span>
    </a>
  );
};

export default NoticeBar; 