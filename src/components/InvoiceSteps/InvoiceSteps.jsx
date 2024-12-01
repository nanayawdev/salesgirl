import React from 'react';
import { ClipboardDocumentIcon, ListBulletIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

const InvoiceSteps = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

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
    <div className={`py-24 ${isDark ? 'bg-emerald-950' : 'bg-emerald-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500 text-sm font-medium tracking-wider uppercase mb-3 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How to Create Your Invoice
          </h2>
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Three simple steps to get your professional invoice
          </p>
        </div>

        <div className="relative">
          {/* Background Line */}
          <div className={`absolute top-24 left-0 w-full h-0.5 ${isDark ? 'bg-emerald-900/50' : 'bg-emerald-800/50'} hidden md:block`} />
          
          <div className="grid md:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative group"
              >
                {/* Step Content */}
                <div className="flex flex-col items-start">
                  {/* Number */}
                  <span className={`text-4xl font-bold mb-8 transition-all duration-300
                    ${isDark ? 'text-emerald-800' : 'text-emerald-700'}
                    group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-emerald-500`}>
                    {step.number}
                  </span>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} p-0.5 mb-8 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                    <div className={`w-full h-full ${isDark ? 'bg-emerald-950' : 'bg-emerald-900'} rounded-[22px] flex items-center justify-center`}>
                      <div className="text-emerald-100">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-emerald-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className={`${isDark ? 'text-emerald-300' : 'text-emerald-200'} leading-relaxed`}>
                    {step.description}
                  </p>
                </div>

                {/* Progress Indicator */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 left-1/2 w-full h-0.5 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSteps; 