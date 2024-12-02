import React from 'react';
import { DocumentTextIcon, ClockIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const InvoiceFeatures = () => {
  return (
    <div className="px-4 py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 tracking-tight">
            Why Use Our Invoice Generator?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to create professional invoices, without the complexity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
          <div className="group p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-100 dark:hover:border-emerald-600 hover:-translate-y-1">
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-gray-700 w-fit group-hover:bg-emerald-100 dark:group-hover:bg-gray-600/30 transition-colors duration-300">
              <DocumentTextIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-600 transition-colors duration-300">
              Professional Templates
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Create polished, professional invoices that get you paid faster
            </p>
          </div>

          <div className="group p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-100 dark:hover:border-emerald-600 hover:-translate-y-1">
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-gray-700 w-fit group-hover:bg-emerald-100 dark:group-hover:bg-gray-600/30 transition-colors duration-300">
              <ClockIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-600 transition-colors duration-300">
              Quick & Easy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Generate detailed invoices in under 2 minutes
            </p>
          </div>

          <div className="group p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-100 dark:hover:border-emerald-600 hover:-translate-y-1">
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-gray-700 w-fit group-hover:bg-emerald-100 dark:group-hover:bg-gray-600/30 transition-colors duration-300">
              <CalculatorIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-600 transition-colors duration-300">
              Automatic Calculations
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Let our system handle all the math for accurate billing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFeatures; 