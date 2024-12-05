import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const NoData = ({ message, createLink, createText }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <PlusCircleIcon className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-gray-500 mb-4">{message}</p>
      <Link
        to={createLink}
        className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
      >
        {createText}
      </Link>
    </div>
  );
};

export default NoData;