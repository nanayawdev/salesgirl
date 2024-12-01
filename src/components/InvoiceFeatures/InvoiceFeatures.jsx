import React from 'react';
import { DocumentTextIcon, ClockIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const InvoiceFeatures = () => {
  return (
    <div className="px-4 py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-black">
            Why Use Our Invoice Generator?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Everything you need to create professional invoices, without the complexity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-4 p-3 rounded-lg bg-green-50 w-fit group-hover:bg-green-100 transition-colors">
              <DocumentTextIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black group-hover:text-green-600 transition-colors">
              Professional Templates
            </h3>
            <p className="text-gray-700">
              Create polished, professional invoices that get you paid faster
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-4 p-3 rounded-lg bg-green-50 w-fit group-hover:bg-green-100 transition-colors">
              <ClockIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black group-hover:text-green-600 transition-colors">
              Quick & Easy
            </h3>
            <p className="text-gray-700">
              Generate detailed invoices in under 2 minutes
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-4 p-3 rounded-lg bg-green-50 w-fit group-hover:bg-green-100 transition-colors">
              <CalculatorIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black group-hover:text-green-600 transition-colors">
              Automatic Calculations
            </h3>
            <p className="text-gray-700">
              Let our system handle all the math for accurate billing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFeatures; 