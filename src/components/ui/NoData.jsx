import React from 'react';
import { Link } from 'react-router-dom';

const NoData = ({ message, createLink, createText }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <p className="text-gray-500 mb-4">{message}</p>
      <Link
        to={createLink}
        className="btn-primary"
      >
        {createText}
      </Link>
    </div>
  );
};

export default NoData;