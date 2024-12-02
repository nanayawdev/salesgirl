import React, { useState, useEffect } from 'react';
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
import { CURRENCY_OPTIONS } from '../../hooks/useCurrency';
import PreviewInvoice from '../PreviewInvoice/PreviewInvoice';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvoices } from '@/hooks/useInvoices';
import { toast } from 'sonner';

const InvoiceGenerator = ({ view = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const { id } = useParams();
  const navigate = useNavigate();
  const { createInvoice, updateInvoice } = useInvoices();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
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
    
    // Invoice Details
    invoiceNumber: `INV-${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`,
    currency: 'GHS',
    dateIssued: new Date().toISOString().split('T')[0],
    dueDate: '',
    
    // Items
    items: [],
    
    // Additional Details
    enableTax: false,
    taxRate: 0,
    enableDiscount: false,
    discountRate: 0,
    notes: '',
    terms: 'Payment is due within 30 days of invoice date.\nLate payments will incur a 5% monthly fee.'
  });

  const [items, setItems] = useState([
    { description: 'Consulting Services', quantity: 1, rate: 100 }
  ]);

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const loadInvoice = async () => {
      if (id) {
        const { data: invoice } = await supabase
          .from('invoices')
          .select(`
            *,
            invoice_items (*)
          `)
          .eq('id', id)
          .single();

        if (invoice) {
          setInvoiceData({
            ...invoice,
            businessLogo: invoice.business_logo_url,
            clientLogo: invoice.client_logo_url,
          });
          setItems(invoice.invoice_items);
        }
      }
    };

    loadInvoice();
  }, [id]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 500000) { // 500KB limit
      setInvoiceData({ ...invoiceData, businessLogo: file });
    } else {
      alert('File size must be less than 500KB');
    }
  };

  const handleClientLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 500000) { // 500KB limit
      setInvoiceData({ ...invoiceData, clientLogo: file });
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

  const getCurrencySymbol = (currencyCode) => {
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CAD: 'C$',
      AUD: 'A$',
      CHF: 'CHF',
      CNY: '¥',
      INR: '₹',
      NZD: 'NZ$',
    };
    return currencySymbols[currencyCode] || currencyCode;
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const calculateItemAmount = (item) => {
    return formatNumber(item.quantity * item.rate);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateDiscount = (subtotal) => {
    if (!invoiceData.enableDiscount) return 0;
    return subtotal * (invoiceData.discountRate / 100);
  };

  const calculateTax = (subtotal, discount) => {
    if (!invoiceData.enableTax) return 0;
    return (subtotal - discount) * (invoiceData.taxRate / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const tax = calculateTax(subtotal, discount);
    return subtotal - discount + tax;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (id) {
        await updateInvoice(id, invoiceData, items);
      } else {
        await createInvoice(invoiceData, items);
      }
      toast.success(id ? 'Invoice updated!' : 'Invoice created!');
      navigate('/invoices');
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error('Failed to save invoice');
    } finally {
      setIsSubmitting(false);
    }
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
                  {invoiceData.businessLogo ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={URL.createObjectURL(invoiceData.businessLogo)} 
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
                  {invoiceData.clientLogo ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={URL.createObjectURL(invoiceData.clientLogo)} 
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
            <div className="mb-4">
              <label className="block mb-1">Currency</label>
              <Select
                value={invoiceData.currency}
                onValueChange={(value) => setInvoiceData({...invoiceData, currency: value})}
              >
                <SelectTrigger className="w-full bg-white/5">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800">
                  {CURRENCY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
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
                   title={`${getCurrencySymbol(invoiceData.currency)}${calculateItemAmount(item)}`}>
                  {getCurrencySymbol(invoiceData.currency)}{calculateItemAmount(item)}
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

          {/* Discount and Tax Section */}
          <section className="mb-8 bg-white/10 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Additional Charges</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Discount Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={invoiceData.enableDiscount}
                      onChange={(e) => setInvoiceData({...invoiceData, enableDiscount: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <span>Enable Discount</span>
                  </label>
                  {invoiceData.enableDiscount && (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={invoiceData.discountRate}
                        onChange={(e) => setInvoiceData({...invoiceData, discountRate: parseFloat(e.target.value) || 0})}
                        className="w-24 text-right bg-white/5"
                        min="0"
                        max="100"
                        placeholder="0"
                      />
                      <span>%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tax Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={invoiceData.enableTax}
                      onChange={(e) => setInvoiceData({...invoiceData, enableTax: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <span>Enable Tax</span>
                  </label>
                  {invoiceData.enableTax && (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={invoiceData.taxRate}
                        onChange={(e) => setInvoiceData({...invoiceData, taxRate: parseFloat(e.target.value) || 0})}
                        className="w-24 text-right bg-white/5"
                        min="0"
                        max="100"
                        placeholder="0"
                      />
                      <span>%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Totals Section */}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{getCurrencySymbol(invoiceData.currency)}{formatNumber(calculateSubtotal())}</span>
                </div>
                
                {invoiceData.enableDiscount && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount ({invoiceData.discountRate}%):</span>
                    <span>-{getCurrencySymbol(invoiceData.currency)}{formatNumber(calculateDiscount(calculateSubtotal()))}</span>
                  </div>
                )}
                
                {invoiceData.enableTax && (
                  <div className="flex justify-between">
                    <span>Tax ({invoiceData.taxRate}%):</span>
                    <span>
                      {getCurrencySymbol(invoiceData.currency)}
                      {formatNumber(calculateTax(calculateSubtotal(), calculateDiscount(calculateSubtotal())))}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{getCurrencySymbol(invoiceData.currency)}{formatNumber(calculateTotal())}</span>
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
          <button 
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview Invoice
          </button>
          {!view && (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : id ? 'Update Invoice' : 'Create Invoice'}
            </button>
          )}
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <PreviewInvoice 
            invoice={{
              ...invoiceData,
              items
            }}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceGenerator; 