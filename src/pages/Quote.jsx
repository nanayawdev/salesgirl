import React, { useState } from 'react';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  PlusCircleIcon,
  TrashIcon,
  EyeIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";

const Quote = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [quoteData, setQuoteData] = useState({
    // Your Details
    businessLogo: null,
    businessName: '',
    businessEmail: '',
    businessAddress: '',
    
    // Client Details
    clientLogo: null,
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    
    // Project Details
    projectTitle: '',
    projectDescription: '',
    quoteNumber: `QT-${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`,
    currency: 'GHS',
    
    // Items
    items: [],
    
    // Additional Details
    notes: '',
    terms: 'This quote is valid for 30 days from the date of issue.'
  });

  const [items, setItems] = useState([
    { description: '', quantity: 1, rate: 0 }
  ]);

  // Logo upload handlers
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 500000) {
      setQuoteData({ ...quoteData, businessLogo: file });
    } else {
      alert('File size must be less than 500KB');
    }
  };

  const handleClientLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 500000) {
      setQuoteData({ ...quoteData, clientLogo: file });
    } else {
      alert('File size must be less than 500KB');
    }
  };

  // Items handlers
  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Calculation helpers
  const calculateItemAmount = (item) => {
    return (item.quantity * item.rate).toFixed(2);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0).toFixed(2);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex items-center mb-8">
          <a href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Home
          </a>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
            <DocumentTextIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold">Quote Generator</h1>
          <p className="text-gray-500">Generate professional quotes in seconds</p>
        </div>

        {/* Logos Section */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-2 gap-8">
            {/* Business Logo */}
            <div>
              <label className="block mb-2">Business Logo (optional)</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="business-logo-upload"
                />
                <label htmlFor="business-logo-upload" className="cursor-pointer">
                  {quoteData.businessLogo ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={URL.createObjectURL(quoteData.businessLogo)} 
                        alt="Business Logo" 
                        className="max-h-20 mb-2"
                      />
                      <span className="text-sm text-gray-500">Click to change logo</span>
                    </div>
                  ) : (
                    <>
                      <CloudArrowUpIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <span className="text-sm text-gray-500">Upload logo (max 500KB)</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Client Logo */}
            <div>
              <label className="block mb-2">Client Logo (optional)</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleClientLogoUpload}
                  className="hidden"
                  id="client-logo-upload"
                />
                <label htmlFor="client-logo-upload" className="cursor-pointer">
                  {quoteData.clientLogo ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={URL.createObjectURL(quoteData.clientLogo)} 
                        alt="Client Logo" 
                        className="max-h-20 mb-2"
                      />
                      <span className="text-sm text-gray-500">Click to change logo</span>
                    </div>
                  ) : (
                    <>
                      <CloudArrowUpIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <span className="text-sm text-gray-500">Upload logo (max 500KB)</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Business and Client Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Your Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Details</h2>
            <div>
              <label className="block mb-1">Business Name</label>
              <Input
                type="text"
                value={quoteData.businessName}
                onChange={(e) => setQuoteData({ ...quoteData, businessName: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Business Email</label>
              <Input
                type="email"
                value={quoteData.businessEmail}
                onChange={(e) => setQuoteData({ ...quoteData, businessEmail: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Business Address</label>
              <textarea
                value={quoteData.businessAddress}
                onChange={(e) => setQuoteData({ ...quoteData, businessAddress: e.target.value })}
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
              <Input
                type="text"
                value={quoteData.clientName}
                onChange={(e) => setQuoteData({ ...quoteData, clientName: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Client Email</label>
              <Input
                type="email"
                value={quoteData.clientEmail}
                onChange={(e) => setQuoteData({ ...quoteData, clientEmail: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Client Address</label>
              <textarea
                value={quoteData.clientAddress}
                onChange={(e) => setQuoteData({ ...quoteData, clientAddress: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
                rows="3"
              />
            </div>
          </section>
        </div>

        {/* Quote Details */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quote Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Quote Number</label>
              <Input
                type="text"
                value={quoteData.quoteNumber}
                onChange={(e) => setQuoteData({ ...quoteData, quoteNumber: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1">Date Created</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`w-full p-2 border rounded bg-white/5 text-left flex items-center justify-between`}
                  >
                    {quoteData.dateCreated ? (
                      format(new Date(quoteData.dateCreated), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(quoteData.dateCreated)}
                    onSelect={(date) => 
                      setQuoteData({
                        ...quoteData, 
                        dateCreated: date ? format(date, 'yyyy-MM-dd') : ''
                      })
                    }
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block mb-1">Valid Until</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`w-full p-2 border rounded bg-white/5 text-left flex items-center justify-between`}
                  >
                    {quoteData.validUntil ? (
                      format(new Date(quoteData.validUntil), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
                  <Calendar
                    mode="single"
                    selected={quoteData.validUntil ? new Date(quoteData.validUntil) : undefined}
                    onSelect={(date) => 
                      setQuoteData({
                        ...quoteData, 
                        validUntil: date ? format(date, 'yyyy-MM-dd') : ''
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

        {/* Project Details */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Project Title</label>
              <Input
                type="text"
                value={quoteData.projectTitle}
                onChange={(e) => setQuoteData({ ...quoteData, projectTitle: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
                placeholder="Enter project title"
              />
            </div>
            <div>
              <label className="block mb-1">Project Description</label>
              <textarea
                value={quoteData.projectDescription}
                onChange={(e) => setQuoteData({ ...quoteData, projectDescription: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
                rows="3"
                placeholder="Enter project description"
              />
            </div>
          </div>
        </section>

        {/* Items Section */}
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
            <div className="col-span-4">Description</div>
            <div className="col-span-2 text-right">Quantity</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-3 text-right">Amount</div>
            <div className="col-span-1"></div> {/* Space for delete button */}
          </div>

          {/* Items List */}
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 mb-4 items-center">
              <div className="col-span-4">
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
                  className="bg-white/5 text-right"
                  min="0"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                  className="bg-white/5 text-right"
                  min="0"
                />
              </div>
              <div className="col-span-3 text-right">
                <p className="p-2 overflow-x-auto whitespace-nowrap" 
                   title={`${quoteData.currency}${calculateItemAmount(item)}`}>
                  {quoteData.currency}{calculateItemAmount(item)}
                </p>
              </div>
              <div className="col-span-1 flex justify-center">
                <button 
                  onClick={() => {
                    const newItems = items.filter((_, i) => i !== index);
                    setItems(newItems);
                  }}
                  className="p-1 text-red-500 hover:text-rose-300"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Additional Details */}
        <section className="mt-8 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1">Notes</label>
              <textarea
                value={quoteData.notes}
                onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
                rows="4"
                placeholder="Any additional notes for the client..."
              />
            </div>
            <div>
              <label className="block mb-1">Terms & Conditions</label>
              <textarea
                value={quoteData.terms}
                onChange={(e) => setQuoteData({ ...quoteData, terms: e.target.value })}
                className="w-full p-2 border rounded bg-white/5"
                rows="4"
                placeholder="Terms and conditions..."
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => alert('Preview functionality not implemented yet')}
            className="inline-flex items-center px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview Quote
          </button>
          <button
            onClick={() => alert('Download functionality not implemented yet')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote; 