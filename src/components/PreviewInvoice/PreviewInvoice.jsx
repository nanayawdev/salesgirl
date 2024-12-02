import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PreviewInvoice = ({ invoice, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative flex flex-col max-h-[90vh]">
        {/* Close Button - Keep it fixed */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-8">
          {/* Invoice Content */}
          <div className="min-h-min">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
              <p className="text-gray-600">#{invoice.invoiceNumber}</p>
            </div>

            {/* Business and Client Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-gray-600 mb-2">From</h2>
                {invoice.businessLogo && (
                  <img 
                    src={invoice.businessLogo} 
                    alt="Business Logo" 
                    className="max-h-12 mb-2"
                  />
                )}
                <p className="font-medium">{invoice.businessName}</p>
                <p className="text-gray-600 whitespace-pre-line">{invoice.businessAddress}</p>
                <p className="text-gray-600">{invoice.businessEmail}</p>
              </div>
              <div>
                <h2 className="text-gray-600 mb-2">Bill To</h2>
                <p className="font-medium">{invoice.clientName}</p>
                <p className="text-gray-600 whitespace-pre-line">{invoice.clientAddress}</p>
                <p className="text-gray-600">{invoice.clientEmail}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-gray-600 mb-2">Issue Date</h2>
                <p>{invoice.dateIssued}</p>
              </div>
              <div>
                <h2 className="text-gray-600 mb-2">Due Date</h2>
                <p>{invoice.dueDate}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-600">Description</th>
                    <th className="text-right py-3 text-gray-600">Quantity</th>
                    <th className="text-right py-3 text-gray-600">Rate</th>
                    <th className="text-right py-3 text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4">{item.description}</td>
                      <td className="text-right py-4">{item.quantity}</td>
                      <td className="text-right py-4">
                        {invoice.currency}{item.rate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="text-right py-4">
                        {invoice.currency}{(item.quantity * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>
                    {invoice.currency}
                    {invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
                      .toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {invoice.enableTax && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tax ({invoice.taxRate}%)</span>
                    <span>
                      {invoice.currency}
                      {(invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0) * (invoice.taxRate / 100))
                        .toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold">
                  <span>Total</span>
                  <span>
                    {invoice.currency}
                    {(invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0) * 
                      (1 + (invoice.enableTax ? invoice.taxRate / 100 : 0)))
                      .toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div>
              <h2 className="text-gray-600 mb-2">Terms & Conditions</h2>
              <p className="text-gray-600 whitespace-pre-line">{invoice.terms}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewInvoice; 