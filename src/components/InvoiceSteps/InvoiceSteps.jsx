import React from 'react';
import { ClipboardDocumentIcon, ListBulletIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const InvoiceSteps = () => {
  const steps = [
    {
      number: '1',
      title: 'Add your details',
      description: 'Enter your business information and branding',
      icon: <ClipboardDocumentIcon className="w-7 h-7" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '2',
      title: 'Input line items',
      description: 'Add your products or services with quantities and rates',
      icon: <ListBulletIcon className="w-7 h-7" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '3',
      title: 'Send & get paid',
      description: 'Download your professional invoice and send it to your client',
      icon: <BanknotesIcon className="w-7 h-7" />,
      color: 'from-emerald-500 to-emerald-600'
    },
  ];

  return (
    <div className="py-32 bg-gray-900 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How to Create Your Invoice
          </h2>
          <p className="text-gray-400 text-lg">
            Three simple steps to get your professional invoice
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-[2px] bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              )}
              
              {/* Step Content */}
              <div className="relative flex flex-col items-center">
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.number}
                </div>
                
                {/* Text Content */}
                <h3 className="text-2xl font-semibold mb-4 text-center text-white group-hover:text-gray-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceSteps; 