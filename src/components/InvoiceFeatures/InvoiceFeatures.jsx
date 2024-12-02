import React from 'react';
import { DocumentTextIcon, ClockIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const InvoiceFeatures = () => {
  return (
    <div className="px-4 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-7xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100 tracking-tight">
            Create <span className="text-emerald-600">Invoices</span> with Confidence
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Simple, powerful tools to help you create and manage your invoices effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="group p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-100 dark:hover:border-emerald-600 hover:-translate-y-1">
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-gray-700 w-fit group-hover:bg-emerald-100 dark:group-hover:bg-gray-600/30 transition-colors duration-300">
              <DocumentTextIcon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-600 transition-colors duration-300">
              Beautiful Designs
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Stand out with elegant, customizable invoice templates that reflect your brand
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-100 dark:hover:border-emerald-600 hover:-translate-y-1">
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-gray-700 w-fit group-hover:bg-emerald-100 dark:group-hover:bg-gray-600/30 transition-colors duration-300">
              <ClockIcon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-600 transition-colors duration-300">
              Time-Saving
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Create and send professional invoices in just a few clicks
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-100 dark:hover:border-emerald-600 hover:-translate-y-1">
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-gray-700 w-fit group-hover:bg-emerald-100 dark:group-hover:bg-gray-600/30 transition-colors duration-300">
              <CalculatorIcon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-600 transition-colors duration-300">
              Smart Calculations
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Focus on your work while we handle all the numbers and tax calculations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFeatures; 