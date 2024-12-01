import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const scrollToSteps = () => {
    document.querySelector('#invoice-steps').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleStartBuilding = () => {
    if (!user) {
      navigate('/signin');
    } else {
      navigate('/create-invoice');
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center py-12 sm:py-16 lg:py-20">
      <div className="text-center max-w-xs sm:max-w-md lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-3xl lg:text-7xl font-bold text-white mb-2 sm:mb-3">
          Build Beautiful <span className="text-emerald-300">Invoices</span> On The Go
        </h1>
        
        <p className="text-xs sm:text-base text-emerald-100 dark:text-emerald-200 mb-4 sm:mb-6">
          Streamline your billing process with our simple, yet powerful invoice generator. Perfect for freelancers and small businesses.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <button 
            onClick={handleStartBuilding}
            className="w-32 sm:w-36 lg:w-44 bg-emerald-100 text-emerald-900 px-2 py-1.5 lg:px-4 lg:py-2.5 rounded-md text-sm lg:text-base font-medium hover:bg-emerald-200 transition-colors flex items-center justify-center"
          >
            Start Building
            <svg 
              className="w-2.5 h-2.5 lg:w-3 lg:h-3 ml-1.5" 
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
          
          <button 
            onClick={scrollToSteps}
            className="w-32 sm:w-36 lg:w-44 border border-emerald-300 text-emerald-100 px-2 py-1.5 lg:px-4 lg:py-2.5 rounded-md text-sm lg:text-base font-medium hover:bg-emerald-800/30 transition-colors"
          >
            See How It Works
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 