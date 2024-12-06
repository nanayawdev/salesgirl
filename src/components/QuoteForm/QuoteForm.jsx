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
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { useQuotes } from '@/hooks/useQuotes';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const QuoteForm = ({ mode = 'create', initialData = null }) => {
  const { user } = useAuth();
  const { createQuote, updateQuote } = useQuotes();
  const navigate = useNavigate();

  const [quoteData, setQuoteData] = useState(initialData || {
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

  const [items, setItems] = useState(
    initialData?.items || [{ description: '', quantity: 1, rate: 0 }]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

  // Add submit handler
  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please login to create a quote');
      return;
    }

    // First log the ID
    console.log('Quote ID:', initialData?.id);

    // Then create the complete data object
    const completeQuoteData = {
      ...quoteData,
      items: items // Include items in the quote data
    };

    // Now log the complete data
    console.log('Complete Quote Data:', completeQuoteData);

    try {
      setIsSubmitting(true);
      if (mode === 'edit') {
        await updateQuote(initialData.id, completeQuoteData);
        toast.success('Quote updated successfully!');
      } else {
        await createQuote(completeQuoteData);
        toast.success('Quote created successfully!');
      }
      navigate('/quotes');
    } catch (error) {
      toast.error(`Failed to ${mode} quote`);
      console.error(`Error ${mode}ing quote:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex items-center mb-8">
          <a href="/" className="flex items-center text-sm text-codGray-500 dark:text-codGray-400 hover:text-codGray-100 dark:hover:text-codGray-300">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Home
          </a>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-algaeGreen-100 rounded-full mb-4">
            <DocumentTextIcon className="w-8 h-8 text-algaeGreen-500" />
          </div>
          <h1 className="text-3xl text-codGray-900 dark:text-codGray-100 font-bold">Quote Generator</h1>
          <p className="text-codGray-500 dark:text-codGray-400">Generate professional quotes in seconds</p>
        </div>

        {/* Logos Section */}
        <section className="mb-8 bg-white/10 dark:bg-white/5 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
            {/* Business Logo */}
            <div>
              <label className="block mb-2 text-sm text-codGray-500 dark:text-codGray-400">Business Logo (optional)</label>
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
                      <span className="text-sm text-codGray-500 dark:text-codGray-400">Click to change logo</span>
                    </div>
                  ) : (
                    <>
                      <CloudArrowUpIcon className="w-8 h-8 mx-auto mb-2 text-codGray-400 dark:text-codGray-300" />
                      <span className="text-sm text-codGray-500 dark:text-codGray-400">Upload logo (max 500KB)</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Client Logo */}
            <div>
              <label className="block mb-2 text-sm text-codGray-500 dark:text-codGray-400">Client Logo (optional)</label>
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
                      <span className="text-sm text-codGray-500 dark:text-codGray-400">Click to change logo</span>
                    </div>
                  ) : (
                    <>
                      <CloudArrowUpIcon className="w-8 h-8 mx-auto mb-2 text-codGray-400 dark:text-codGray-300" />
                      <span className="text-sm text-codGray-500 dark:text-codGray-400">Upload logo (max 500KB)</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Business and Client Details */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 mb-8">
          {/* Your Details */}
          <section className="space-y-4">
            <h2 className="text-xl text-codGray-900 dark:text-codGray-100 font-semibold mb-4">Your Details</h2>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Business Name</label>
              <Input
                type="text"
                value={quoteData.businessName}
                onChange={(e) => setQuoteData({ ...quoteData, businessName: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Business Email</label>
              <Input
                type="email"
                value={quoteData.businessEmail}
                onChange={(e) => setQuoteData({ ...quoteData, businessEmail: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Business Address</label>
              <textarea
                value={quoteData.businessAddress}
                onChange={(e) => setQuoteData({ ...quoteData, businessAddress: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="3"
              />
            </div>
          </section>

          {/* Client Details */}
          <section className="space-y-4">
            <h2 className="text-xl text-codGray-900 dark:text-codGray-100 font-semibold mb-4">Client Details</h2>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Client Name</label>
              <Input
                type="text"
                value={quoteData.clientName}
                onChange={(e) => setQuoteData({ ...quoteData, clientName: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Client Email</label>
              <Input
                type="email"
                value={quoteData.clientEmail}
                onChange={(e) => setQuoteData({ ...quoteData, clientEmail: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Client Address</label>
              <textarea
                value={quoteData.clientAddress}
                onChange={(e) => setQuoteData({ ...quoteData, clientAddress: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="3"
              />
            </div>
          </section>
        </div>

        {/* Quote Details */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl text-codGray-900 dark:text-codGray-100 font-semibold mb-4">Quote Details</h2>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Quote Number</label>
              <Input
                type="text"
                value={quoteData.quoteNumber}
                onChange={(e) => setQuoteData({ ...quoteData, quoteNumber: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Date Created</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5 text-left flex items-center justify-between`}
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
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Valid Until</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5 text-left flex items-center justify-between`}
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
          <h2 className="text-xl text-codGray-900 dark:text-codGray-100 font-semibold mb-4">Project Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Project Title</label>
              <Input
                type="text"
                value={quoteData.projectTitle}
                onChange={(e) => setQuoteData({ ...quoteData, projectTitle: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                placeholder="Enter project title"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Project Description</label>
              <textarea
                value={quoteData.projectDescription}
                onChange={(e) => setQuoteData({ ...quoteData, projectDescription: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="3"
                placeholder="Enter project description"
              />
            </div>
          </div>
        </section>

        {/* Items Section */}
        <section className="mb-8">
          <h2 className="text-xl text-codGray-900 dark:text-codGray-100 font-semibold mb-4">Items</h2>
          
          <button
            onClick={addItem}
            className="mb-4 inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add Item
          </button>

          {/* Items Header */}
          <div className="grid grid-cols-12 gap-4 mb-2 font-semibold">
            <div className="col-span-4 text-codGray-500 dark:text-codGray-400">Description</div>
            <div className="col-span-2 text-right text-codGray-500 dark:text-codGray-400">Quantity</div>
            <div className="col-span-2 text-right text-codGray-500 dark:text-codGray-400">Rate</div>
            <div className="col-span-3 text-right text-codGray-500 dark:text-codGray-400">Amount</div>
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
                  className="bg-white/5 text-codGray-900 dark:text-codGray-100"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className="bg-white/5 text-right text-codGray-900 dark:text-codGray-100"
                  min="0"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                  className="bg-white/5 text-right text-codGray-900 dark:text-codGray-100"
                  min="0"
                />
              </div>
              <div className="col-span-3 text-codGray-900 dark:text-codGray-100 text-right">
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
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1">Notes</label>
              <textarea
                value={quoteData.notes}
                onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="4"
                placeholder="Any additional notes for the client..."
              />
            </div>
            <div>
              <label className="block mb-1">Terms & Conditions</label>
              <textarea
                value={quoteData.terms}
                onChange={(e) => setQuoteData({ ...quoteData, terms: e.target.value })}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="4"
                placeholder="Terms and conditions..."
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview Quote
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || mode === 'view'}
            className="inline-flex items-center px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
          >
            {isSubmitting 
              ? `${mode === 'edit' ? 'Updating' : 'Creating'}...` 
              : mode === 'edit' 
                ? 'Update Quote' 
                : 'Create Quote'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm; 