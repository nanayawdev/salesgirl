import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50+", label: "Countries" },
    { number: "1M+", label: "Invoices Generated" },
    { number: "99.9%", label: "Uptime" }
  ];

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
    <div className="bg-background-light dark:bg-background-dark h-screen sm:h-screen lg:h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 relative">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="main-heading">
          Build Sleek <span className="span-text">Invoices</span> Instantly
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

        <div className="mt-12 grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 phone:gap-6 tablet:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group p-4 phone:p-5 tablet:p-6 rounded-2xl bg-white dark:bg-codGray-900 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100">
              <div className="text-2xl phone:text-2xl tablet:text-3xl laptop:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 mb-2">{stat.number}</div>
              <div className="text-sm phone:text-xs tablet:text-sm laptop:text-base text-codGray-600 dark:text-codGray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8">
      </div>
    </div>
  );
};

export default HeroSection; 