import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 min-h-[600px] flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white mb-4">
          Create Professional <span className="text-emerald-300">Invoices</span>
          <br />
          in Minutes
        </h1>
        
        <p className="text-emerald-100 text-lg mb-8">
          Generate polished, professional invoices that help you get paid faster. No accounting expertise required.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button className="bg-emerald-100 text-emerald-900 px-6 py-3 rounded-md font-medium hover:bg-emerald-200 transition-colors flex items-center">
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
          
          <button className="border border-emerald-300 text-emerald-100 px-6 py-3 rounded-md font-medium hover:bg-emerald-800/30 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 