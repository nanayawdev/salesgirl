import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToSteps = () => {
    document.querySelector('#invoice-steps').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center py-12 sm:py-16 lg:py-20">
      <div className="text-center max-w-xs sm:max-w-md lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
          Create Professional <span className="text-emerald-300">Invoices</span> in Minutes
        </h1>
        
        <p className="text-xs sm:text-base mb-4 sm:mb-6">
          Generate polished, professional invoices that help you get paid faster. No accounting expertise required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <Link 
            to="/create-invoice"
            className="w-32 sm:w-36 bg-emerald-100 text-emerald-900 px-2 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-200 transition-colors flex items-center justify-center"
          >
            Create Invoice
            <svg 
              className="w-2.5 h-2.5 ml-1.5" 
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
            className="w-32 sm:w-36 border border-emerald-300 text-emerald-100 px-2 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-800/30 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 