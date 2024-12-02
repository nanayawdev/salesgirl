import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardDocumentIcon, ListBulletIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const InvoiceSteps = () => {

  const steps = [
    {
      number: '01',
      title: 'Business Details',
      description: 'Fill in your company information and customize the look',
      icon: <ClipboardDocumentIcon className="w-8 h-8" />,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      number: '02',
      title: 'Add Items',
      description: 'List your services or products with pricing details',
      icon: <ListBulletIcon className="w-8 h-8" />,
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      number: '03',
      title: 'Finalize & Share',
      description: 'Generate a polished invoice ready to share with your client',
      icon: <BanknotesIcon className="w-8 h-8" />,
      color: 'from-emerald-600 to-emerald-800'
    },
  ];

  return (
    <div id="invoice-steps" className="py-8 sm:py-12 lg:py-16 bg-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
            Easy Steps
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-7xl font-bold text-white mb-3 sm:mb-4">
            Create Your Invoice in Minutes
          </h2>
          <p className="text-emerald-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Follow these quick steps to generate a professional invoice
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 group
                bg-emerald-800/30
                hover:bg-gradient-to-br hover:from-emerald-800/40 hover:to-emerald-900/40
                border border-emerald-700/30 hover:border-emerald-600/50`}
            >
              <div className="absolute -top-2 sm:-top-3 left-4 sm:left-6 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Step {step.number}
                </span>
              </div>

              <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-3 sm:mb-4 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                <div className="w-full h-full bg-emerald-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <div className="text-emerald-100">
                    {React.cloneElement(step.icon, {
                      className: 'w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7'
                    })}
                  </div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1.5 sm:mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-emerald-500">
                {step.title}
              </h3>
              <p className="text-emerald-200/90 text-xs sm:text-sm lg:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link 
            to="/create-invoice"
            className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 rounded-md font-medium text-sm sm:text-base bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-colors"
          >
            Create Your Invoice
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