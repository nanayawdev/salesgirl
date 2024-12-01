import React from 'react';

const NoticeBar = () => {
  return (
    <a
      href="/ussd"
      className="hidden tablet:flex items-center rounded-full bg-gray-50 px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <span className="font-satoshi font-medium text-p-sm text-gray-900 whitespace-nowrap">
        Introducing USSD
      </span>
      <span className="mx-2 text-gray-400">·</span>
      <span className="font-satoshi text-p-sm text-gray-600 whitespace-nowrap">
        Our offline voting experience
      </span>
      <span className="ml-2 text-gray-400">→</span>
    </a>
  );
};

export default NoticeBar; 