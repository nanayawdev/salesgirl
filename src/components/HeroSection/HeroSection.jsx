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
    <div className="bg-gradient-to-b from-algaeGreen-400/10 to-transparent dark:from-algaeGreen-600/10 dark:to-transparent min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center py-12 sm:py-16 lg:py-20">
      <div className="text-center phone:max-w-xs tablet:max-w-md laptop:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="main-heading">
          Build Sleek <span className="span-text">Invoices</span> On The Go
        </h1>
        
        <p className="description-text">
          Streamline your billing process with our simple, yet powerful invoice generator. Perfect for freelancers and small businesses.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <button 
            onClick={handleStartBuilding}
            className="btn-primary"
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
            className="btn-secondary"
          >
            Explore Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 