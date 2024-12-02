import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToSteps = () => {
    document.querySelector('#invoice-steps').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 min-h-[500px] sm:min-h-[600px] flex items-center justify-center py-16 sm:py-20 lg:py-24">
      <div className="text-center max-w-xs sm:max-w-lg lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
          Create Professional <span className="text-emerald-300">Invoices</span>
          <br className="hidden sm:block" />
          in Minutes
        </h1>
        
        <p className="text-emerald-100 text-base sm:text-lg mb-6 sm:mb-8">
          Generate polished, professional invoices that help you get paid faster. No accounting expertise required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/create-invoice"
            className="w-full sm:w-auto bg-emerald-100 text-emerald-900 px-6 py-3 rounded-md font-medium hover:bg-emerald-200 transition-colors flex items-center justify-center"
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
            className="w-full sm:w-auto border border-emerald-300 text-emerald-100 px-6 py-3 rounded-md font-medium hover:bg-emerald-800/30 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 