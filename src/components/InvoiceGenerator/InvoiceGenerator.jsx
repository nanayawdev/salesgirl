import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  PlusCircleIcon,
  TrashIcon,
  EyeIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";

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

  const [items, setItems] = useState([
    { description: 'Consulting Services', quantity: 1, rate: 100 }
  ]);

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
        <div className="flex items-center mb-8">
          <a href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Home
          </a>
        </div>

        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
            <DocumentTextIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold">Invoice Generator</h1>
          <p className="text-gray-500">Generate professional invoices in seconds</p>
        </div>

        <section className="mb-8 bg-white/10 p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <label className="block mb-2">Brand Logo (optional)</label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <CloudArrowUpIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-500">Upload logo (max 500KB)</span>
              </label>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Your Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Details</h2>
            <div>
              <label className="block mb-1">Business Name</label>
              <input
                type="text"
                value={invoiceData.businessName}
                onChange={(e) => setInvoiceData({...invoiceData, businessName: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Business Email</label>
              <input
                type="email"
                value={invoiceData.businessEmail}
                onChange={(e) => setInvoiceData({...invoiceData, businessEmail: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Business Address</label>
              <textarea
                value={invoiceData.businessAddress}
                onChange={(e) => setInvoiceData({...invoiceData, businessAddress: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
                rows="3"
              />
            </div>
          </section>

          {/* Client Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Client Details</h2>
            <div>
              <label className="block mb-1">Client Name</label>
              <input
                type="text"
                value={invoiceData.clientName}
                onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Client Email</label>
              <input
                type="email"
                value={invoiceData.clientEmail}
                onChange={(e) => setInvoiceData({...invoiceData, clientEmail: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Client Address</label>
              <textarea
                value={invoiceData.clientAddress}
                onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
                rows="3"
              />
            </div>
          </section>
        </div>

        {/* Invoice Details */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-1">Invoice Number</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
                placeholder="INV-001"
              />
            </div>
            <div>
              <label className="block mb-1">Currency</label>
              <Select
                value={invoiceData.currency}
                onValueChange={(value) => setInvoiceData({...invoiceData, currency: value})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1">Date Issued</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`w-full p-2 border rounded bg-white/5 text-left flex items-center justify-between`}
                  >
                    {invoiceData.dateIssued ? (
                      format(new Date(invoiceData.dateIssued), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(invoiceData.dateIssued)}
                    onSelect={(date) => 
                      setInvoiceData({
                        ...invoiceData, 
                        dateIssued: date ? format(date, 'yyyy-MM-dd') : ''
                      })
                    }
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block mb-1">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`w-full p-2 border rounded bg-white/5 text-left flex items-center justify-between`}
                  >
                    {invoiceData.dueDate ? (
                      format(new Date(invoiceData.dueDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
                  <Calendar
                    mode="single"
                    selected={invoiceData.dueDate ? new Date(invoiceData.dueDate) : undefined}
                    onSelect={(date) => 
                      setInvoiceData({
                        ...invoiceData, 
                        dueDate: date ? format(date, 'yyyy-MM-dd') : ''
                      })
                    }
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          
          <button
            onClick={addItem}
            className="mb-4 inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add Item
          </button>

          {/* Items Header */}
          <div className="grid grid-cols-12 gap-4 mb-2 font-semibold">
            <div className="col-span-6">Description</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Rate</div>
            <div className="col-span-2">Amount</div>
          </div>

          {/* Items List */}
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 mb-4 items-center">
              <div className="col-span-6">
                <Input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="bg-white/5"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className="bg-white/5"
                  min="0"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                  className="bg-white/5"
                  min="0"
                />
              </div>
              <div className="col-span-1">
                <p className="p-2">${(item.quantity * item.rate).toFixed(2)}</p>
              </div>
              <div className="col-span-1">
                <button 
                  onClick={() => {
                    const newItems = items.filter((_, i) => i !== index);
                    setItems(newItems);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Totals Section with Tax */}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="py-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={invoiceData.enableTax}
                      onChange={(e) => setInvoiceData({...invoiceData, enableTax: e.target.checked})}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Enable Tax</span>
                  </label>
                  
                  {invoiceData.enableTax && (
                    <div className="mt-2">
                      <label className="block mb-1">Tax Rate (%)</label>
                      <Input
                        type="number"
                        value={invoiceData.taxRate}
                        onChange={(e) => setInvoiceData({...invoiceData, taxRate: parseFloat(e.target.value) || 0})}
                        className="w-32 bg-white/5"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                  )}
                </div>
                
                {invoiceData.enableTax && (
                  <div className="flex justify-between">
                    <span>Tax ({invoiceData.taxRate}%):</span>
                    <span>${(calculateSubtotal() * (invoiceData.taxRate / 100)).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notes and Terms Section - now side by side */}
        <section className="mt-8 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1">Notes</label>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
                rows="4"
                placeholder="Any additional notes for the client..."
              />
            </div>
            <div>
              <label className="block mb-1">Terms & Conditions</label>
              <textarea
                value={invoiceData.terms}
                onChange={(e) => setInvoiceData({...invoiceData, terms: e.target.value})}
                className="w-full p-2 border rounded bg-white/5"
                rows="4"
                placeholder="Payment terms and conditions..."
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="inline-flex items-center px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview Invoice
          </button>
          <button className="inline-flex items-center px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator; 