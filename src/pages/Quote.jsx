import React from 'react';

const Quote = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
            Quote Generator
          </span>
          <h1 className="main-heading">
            Generate <span className="span-text">Quotes</span>
          </h1>
          <p className="description-text">
            Create professional quotes quickly and easily
          </p>
        </div>
        
        {/* Content will go here */}
      </div>
    </div>
  );
};

export default Quote; 