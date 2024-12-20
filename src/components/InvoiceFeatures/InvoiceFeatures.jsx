import React from 'react';
import { DocumentTextIcon, ClockIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const InvoiceFeatures = () => {
  return (
    <div className="px-4 py-12 sm:py-16 lg:py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="main-heading">
            Create <span className="span-text">Invoices</span> with Confidence
          </h2>
          <p className="description-text">
            Simple, powerful tools to help you create and manage your invoices effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="group p-4 sm:p-6 rounded-2xl bg-codGray-50 dark:bg-codGray-950 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="p-2 rounded-lg bg-algaeGreen-50 dark:bg-codGray-600/30 w-fit transition-colors duration-300">
                <DocumentTextIcon className="icon-base" />
              </div>
              <h3 className="text-xl phone:text-base tablet:text-lg laptop:text-xl desktop:text-xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 dark:group-hover:text-algaeGreen-400 transition-colors duration-300">
                Beautiful Designs
              </h3>
            </div>
            <p className="description-text-sm">
              Stand out with elegant, customizable invoice templates that reflect your brand
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-2xl bg-codGray-50 dark:bg-background-dark transition-all duration-300 border border-codGray-100 dark:border-codGray-400 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="p-3 rounded-xl bg-algaeGreen-50 dark:bg-codGray-600/30 w-fit transition-colors duration-300">
                <ClockIcon className="icon-base" />
              </div>
              <h3 className="text-xl phone:text-base tablet:text-lg laptop:text-xl desktop:text-xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 dark:group-hover:text-algaeGreen-400 transition-colors duration-300">
                Time-Saving
              </h3>
            </div>
            <p className="description-text-sm">
              Create and send professional invoices in just a few clicks
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-2xl bg-codGray-50 dark:bg-background-dark transition-all duration-300 border border-codGray-100 dark:border-codGray-400 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="p-3 rounded-xl bg-algaeGreen-50 dark:bg-codGray-600/30 w-fit transition-colors duration-300">
                <CalculatorIcon className="icon-base" />
              </div>
              <h3 className="text-xl phone:text-base tablet:text-lg laptop:text-xl desktop:text-xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 dark:group-hover:text-algaeGreen-400 transition-colors duration-300">
                Smart Calculations
              </h3>
            </div>
            <p className="description-text-sm">
              Focus on your work while we handle all the numbers and tax calculations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFeatures; 