import React from 'react';

const InvoiceFeatures = () => {
  return (
    <div className="px-4 py-12">
      <h2 className="text-4xl font-bold mb-4">
        Why Use Our Invoice Generator?
      </h2>
      <p className="text-lg mb-8">
        Everything you need to create professional invoices, without the complexity
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">1. Professional Templates</h3>
          <p className="text-gray-600">Create polished, professional invoices that get you paid faster</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">2. Quick & Easy</h3>
          <p className="text-gray-600">Generate detailed invoices in under 2 minutes</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">3. Automatic Calculations</h3>
          <p className="text-gray-600">Let our system handle all the math for accurate billing</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFeatures; 