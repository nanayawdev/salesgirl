import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, BarChart2, Calculator } from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const tools = [
    {
      title: 'Invoice Generator',
      description: 'Create and manage professional invoices with customizable templates',
      link: '/invoice/new',
      icon: FileText,
      badge: 'Popular'
    },
    {
      title: 'Status Dashboard',
      description: 'Monitor system performance and service availability in real-time',
      link: '/status',
      icon: BarChart2
    },
    {
      title: 'Price Calculator',
      description: 'Calculate project costs and generate accurate quotes',
      link: '/quote',
      icon: Calculator
    }
  ];

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
    <div className="bg-background-light dark:bg-background-dark min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center py-12 sm:py-16 lg:py-20 relative">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link
                key={tool.title}
                to={tool.link}
                className="group p-4 sm:p-6 rounded-2xl bg-codGray-50 dark:bg-codGray-950 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-algaeGreen-50 dark:bg-codGray-600/30 w-fit transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-algaeGreen-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl phone:text-base tablet:text-lg laptop:text-xl desktop:text-xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 dark:group-hover:text-algaeGreen-400 transition-colors duration-300">
                        {tool.title}
                      </h3>
                      {tool.badge && (
                        <span className="px-2 py-1 text-xs font-medium bg-algaeGreen-50 dark:bg-algaeGreen-900/20 text-algaeGreen-600 dark:text-algaeGreen-400 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="description-text-sm mt-2 text-left">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Existing Hero Content */}
        <h1 className="main-heading">
          Build Sleek <span className="span-text">Invoices</span> Instantly
        </h1>
        
        <p className="description-text">
          Streamline your billing process with our simple, yet powerful invoice generator.
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