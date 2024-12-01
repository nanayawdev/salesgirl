import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-emerald-800 min-h-[600px] flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white mb-4">
          Create Professional <span className="text-emerald-300">Invoices</span>
          <br />
          in Minutes
        </h1>
        
        <p className="text-gray-200 text-lg mb-8">
          Generate polished, professional invoices that help you get paid faster. No accounting expertise required.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-emerald-800 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center">
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
          </button>
          
          <button className="text-white px-6 py-3 rounded-md font-medium hover:text-emerald-300 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 