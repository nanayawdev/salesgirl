import React from 'react';
import { Link } from 'react-router-dom';

const InvoiceSteps = () => {

  const steps = [
    {
      number: '01',
      title: 'Business Details',
      description: 'Fill in your company information and customize the look',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      number: '02',
      title: 'Add Items',
      description: 'List your services or products with pricing details',
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      number: '03',
      title: 'Finalize & Share',
      description: 'Generate a polished invoice ready to share with your client',
      color: 'from-emerald-600 to-emerald-800'
    },
  ];

  return (
    <div id="invoice-steps" className="py-8 sm:py-12 lg:py-16 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
              Easy Steps
          </span>
          <h2 className="main-heading">
            Create Your Invoice in Minutes
          </h2>
          <p className="description-text-sm">
            Follow these quick steps to generate a professional invoice
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="group p-4 sm:p-6 rounded-2xl bg-codGray-50 dark:bg-codGray-950 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <div className="p-2 rounded-lg bg-algaeGreen-50 dark:bg-codGray-600/30 w-fit transition-colors duration-300">
                  <span className="text-xs sm:text-sm font-semibold text-codGray-900 dark:text-codGray-100">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="text-xl phone:text-base tablet:text-lg laptop:text-xl desktop:text-xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 dark:group-hover:text-algaeGreen-400 transition-colors duration-300">
                  {step.title}
                </h3>
              </div>
              <p className="description-text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link 
            to="/create-invoice"
            className="btn-primary"
          >
            Create Now
            <svg 
              className="w-3 h-3 sm:w-4 sm:h-4 ml-2" 
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
        </div>
      </div>
    </div>
  );
};

export default InvoiceSteps; 