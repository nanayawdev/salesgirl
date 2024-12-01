import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const InvoiceGenerator = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [invoiceData, setInvoiceData] = useState({
    // Your Details
    businessLogo: null,
    businessName: '',
    businessEmail: '',
    businessAddress: '',
    
    // Client Details
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    
    // Invoice Details
    invoiceNumber: `INV-${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`,
    currency: 'USD',
    dateIssued: new Date().toISOString().split('T')[0],
    dueDate: '',
    
    // Items
    items: [],
    
    // Additional Details
    enableTax: false,
    taxRate: 0,
    notes: '',
    terms: 'Payment is due within 30 days of invoice date.\nLate payments will incur a 5% monthly fee.'
  });

  const [items, setItems] = useState([]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 500000) { // 500KB limit
      setInvoiceData({ ...invoiceData, businessLogo: file });
    } else {
      alert('File size must be less than 500KB');
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return invoiceData.enableTax ? 
      subtotal * (1 + (invoiceData.taxRate / 100)) : 
      subtotal;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Create Invoice</h1>

        {/* Your Details Section */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Brand Logo (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full p-2 border rounded"
              />
              <p className="text-sm text-gray-500 mt-1">Max size: 500KB</p>
            </div>

            <div>
              <label className="block mb-2">Business Name</label>
              <input
                type="text"
                value={invoiceData.businessName}
                onChange={(e) => setInvoiceData({ ...invoiceData, businessName: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>

            {/* Add remaining form fields similarly */}
          </div>
        </section>

        {/* Client Details Section */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Client Details</h2>
          {/* Add client detail fields */}
        </section>

        {/* Invoice Details Section */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Invoice Number</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                disabled
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block mb-2">Currency</label>
              <select
                value={invoiceData.currency}
                onChange={(e) => setInvoiceData({ ...invoiceData, currency: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
              >
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Items Section */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          <button
            onClick={addItem}
            className="mb-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Add Item
          </button>

          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="w-full p-2 border rounded bg-white/5"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                  className="w-full p-2 border rounded bg-white/5"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value))}
                  className="w-full p-2 border rounded bg-white/5"
                />
              </div>
              <div className="col-span-2">
                <p className="p-2">${(item.quantity * item.rate).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Totals Section */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={invoiceData.enableTax}
                onChange={(e) => setInvoiceData({ ...invoiceData, enableTax: e.target.checked })}
                className="mr-2"
              />
              <label>Enable Tax</label>
            </div>

            {invoiceData.enableTax && (
              <div>
                <input
                  type="number"
                  value={invoiceData.taxRate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, taxRate: parseFloat(e.target.value) })}
                  className="w-24 p-2 border rounded bg-white/5"
                />
                <span className="ml-2">%</span>
              </div>
            )}

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Notes & Terms Section */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Notes</label>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
                rows="4"
                placeholder="Any additional notes..."
              />
            </div>

            <div>
              <label className="block mb-2">Terms & Conditions</label>
              <textarea
                value={invoiceData.terms}
                onChange={(e) => setInvoiceData({ ...invoiceData, terms: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
                rows="4"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Preview Invoice
          </button>
          <button className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator; 