import React from 'react';

const NoticeBar = () => {
  return (
    <a
      href="/status"
      className="hidden tablet:flex items-center rounded-full bg-algaeGreen-400 dark:bg-algaeGreen-300 px-3 py-1 hover:bg-algaeGreen-600 dark:hover:bg-algaeGreen-700 transition-colors cursor-pointer"
    >
      <span className="font-medium text-xs text-codGray-900 dark:text-white whitespace-nowrap">
        Introducing Status
      </span>
      <span className="mx-2 text-codGray-900">·</span>
      <span className="text-xs text-codGray-600 dark:text-codGray-400 whitespace-nowrap">
        Our new status reporting
      </span>
      <svg 
        className="w-2.5 h-2.5 lg:w-3 lg:h-3 ml-1.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7"
      />
    </svg>
    </a>
  );
};

export default NoticeBar; 