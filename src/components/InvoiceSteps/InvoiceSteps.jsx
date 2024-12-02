import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardDocumentIcon, ListBulletIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const InvoiceSteps = () => {

  const steps = [
    {
      number: '01',
      title: 'Add your details',
      description: 'Enter your business information and branding',
      icon: <ClipboardDocumentIcon className="w-8 h-8" />,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      number: '02',
      title: 'Input line items',
      description: 'Add your products or services with quantities and rates',
      icon: <ListBulletIcon className="w-8 h-8" />,
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      number: '03',
      title: 'Send & get paid',
      description: 'Download your professional invoice and send it to your client',
      icon: <BanknotesIcon className="w-8 h-8" />,
      color: 'from-emerald-600 to-emerald-800'
    },
  ];

  return (
    <div id="invoice-steps" className="py-12 sm:py-16 lg:py-24 bg-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 text-sm font-medium tracking-wider uppercase mb-3 block">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            How to Create Your Invoice
          </h2>
          <p className="text-emerald-200 text-base sm:text-lg max-w-2xl mx-auto">
            Three simple steps to get your professional invoice
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`relative p-6 sm:p-8 rounded-2xl transition-all duration-300 group
                bg-emerald-800/30
                hover:bg-gradient-to-br hover:from-emerald-800/40 hover:to-emerald-900/40
                border border-emerald-700/30 hover:border-emerald-600/50`}
            >
              <div className="absolute -top-3 sm:-top-4 left-6 sm:left-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full px-3 py-1">
                <span className="text-sm font-semibold text-white">
                  Step {step.number}
                </span>
              </div>

              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-4 sm:mb-6 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                <div className="w-full h-full bg-emerald-900 rounded-xl flex items-center justify-center">
                  <div className="text-emerald-100">
                    {React.cloneElement(step.icon, {
                      className: 'w-6 h-6 sm:w-8 sm:h-8'
                    })}
                  </div>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-emerald-500">
                {step.title}
              </h3>
              <p className="text-emerald-200/90 text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <Link 
            to="/create-invoice"
            className="inline-flex items-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-md font-medium bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-colors"
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
        </div>
      </div>
    </div>
  );
};

export default InvoiceSteps; 