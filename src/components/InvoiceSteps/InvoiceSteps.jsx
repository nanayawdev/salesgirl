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
    <div id="invoice-steps" className="py-24 bg-emerald-900 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 dark:from-gray-300 dark:to-gray-400 text-sm font-medium tracking-wider uppercase mb-3 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How to Create Your Invoice
          </h2>
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Three simple steps to get your professional invoice
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`relative p-8 rounded-2xl transition-all duration-300 group
                bg-emerald-800/30
                hover:bg-gradient-to-br hover:from-emerald-800/40 hover:to-emerald-900/40
                border border-emerald-700/30 hover:border-emerald-600/50`}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full px-3 py-1">
                <span className="text-sm font-semibold text-white">
                  Step {step.number}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                <div className="w-full h-full bg-emerald-900 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <div className="text-emerald-100 dark:text-gray-100">
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-300 dark:group-hover:from-gray-300 group-hover:to-emerald-500 dark:group-hover:to-gray-400">
                {step.title}
              </h3>
              <p className="text-emerald-200/90 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-700/30 dark:bg-gray-700/30">
                  <div className="w-full h-full bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-gray-400 dark:to-gray-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center flex gap-4 justify-center">
          <Link 
            to="/create-invoice"
            className="bg-emerald-100 dark:bg-gray-700 text-emerald-900 dark:text-gray-100 px-6 py-3 rounded-md font-medium hover:bg-emerald-200 dark:hover:bg-gray-600 transition-colors flex items-center"
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