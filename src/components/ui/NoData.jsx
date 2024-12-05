import React from 'react';

const NoData = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <svg
        className="w-12 h-12 text-gray-400 mb-4"
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
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default NoData; 