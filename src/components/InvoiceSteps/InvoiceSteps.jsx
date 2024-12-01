import React from 'react';
import { ClipboardDocumentIcon, ListBulletIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const InvoiceSteps = () => {
  const steps = [
    {
      number: '1',
      title: 'Add your details',
      description: 'Enter your business information and branding',
      icon: <ClipboardDocumentIcon className="w-6 h-6" />,
    },
    {
      number: '2',
      title: 'Input line items',
      description: 'Add your products or services with quantities and rates',
      icon: <ListBulletIcon className="w-6 h-6" />,
    },
    {
      number: '3',
      title: 'Send & get paid',
      description: 'Download your professional invoice and send it to your client',
      icon: <BanknotesIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            How to Create Your Invoice
          </h2>
          <p className="text-gray-600 text-lg">
            Three simple steps to get your professional invoice
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200">
                  <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              )}
              
              {/* Step Content */}
              <div className="relative flex flex-col items-center">
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                  <div className="text-gray-600 group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                  {step.number}
                </div>
                
                {/* Text Content */}
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">
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