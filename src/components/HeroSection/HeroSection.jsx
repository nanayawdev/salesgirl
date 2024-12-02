import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToSteps = () => {
    document.querySelector('#invoice-steps').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 min-h-[600px] flex items-center justify-center dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-900">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white mb-4">
          Create Professional <span className="text-emerald-300 dark:text-emerald-300">Invoices</span>
          <br />
          in Minutes
        </h1>
        
        <p className="text-emerald-100 text-lg mb-8">
          Generate polished, professional invoices that help you get paid faster. No accounting expertise required.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            to="/create-invoice"
            className="bg-emerald-100 dark:bg-gray-700 text-emerald-900 dark:text-gray-100 px-6 py-3 rounded-md font-medium hover:bg-emerald-200 dark:hover:bg-gray-600/30 transition-colors flex items-center"
          >
            Create Your Invoice
            <svg 
              className="w-4 h-4 ml-2" 
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
          </Link>
          
          <button 
            onClick={scrollToSteps}
            className="border border-emerald-300 dark:border-gray-600 text-emerald-100 dark:text-gray-100 px-6 py-3 rounded-md font-medium hover:bg-emerald-800/30 dark:hover:bg-gray-800/30 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 