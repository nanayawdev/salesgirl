import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF autotable plugin

const InvoiceGenerator = ({ view = false }) => {
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
    { description: '', quantity: 1, rate: 0 }
  ]);

  const [showPreview, setShowPreview] = useState(false);

  const loadInvoice = async (invoiceId) => {
    try {
      const { data: invoice, error } = await supabase
        .from('invoices')
        .select(`
          *,
          invoice_items (*)
        `)
        .eq('id', invoiceId)
        .single();

      if (error) throw error;
      
      if (invoice) {
        setInvoiceData({
          businessLogo: invoice.business_logo_url || null,
          businessName: invoice.business_name || '',
          businessEmail: invoice.business_email || '',
          businessAddress: invoice.business_address || '',
          clientLogo: invoice.client_logo_url || null,
          clientName: invoice.client_name || '',
          clientEmail: invoice.client_email || '',
          clientAddress: invoice.client_address || '',
          invoiceNumber: invoice.invoice_number || '',
          currency: invoice.currency || 'GHS',
          dateIssued: invoice.date_issued || new Date().toISOString().split('T')[0],
          dueDate: invoice.due_date || '',
          enableTax: invoice.enable_tax || false,
          taxRate: invoice.tax_rate || 0,
          enableDiscount: invoice.enable_discount || false,
          discountRate: invoice.discount_rate || 0,
          notes: invoice.notes || '',
          terms: invoice.terms || ''
        });
        setItems(invoice.invoice_items?.map(item => ({
          description: item.description || '',
          quantity: item.quantity || 0,
          rate: item.rate || 0
        })) || [{ description: '', quantity: 1, rate: 0 }]);
      }
    } catch (error) {
      console.error('Error loading invoice:', error);
      toast.error('Error loading invoice');
    }
  };

  useEffect(() => {
    if (id) {
      loadInvoice(id);
    }
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
        console.log('Invoice Data:', invoiceData);
        console.log('Items:', items);
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

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const generatePDF = () => {
    console.log('Generating PDF...');
    if (!invoiceData) {
      console.error('No invoice data available');
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;

      // Helper function for text alignment
      const centerText = (text, y) => {
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        return (pageWidth - textWidth) / 2;
      };

      // Set initial styles
      doc.setFont('helvetica');
      
      // Header Section
      doc.setFontSize(24);
      doc.setTextColor(31, 41, 55); // text-gray-900
      doc.text('INVOICE', centerText('INVOICE'), 40);
      
      doc.setFontSize(14);
      doc.setTextColor(107, 114, 128); // text-gray-600
      doc.text(`#${invoiceData.invoiceNumber}`, centerText(`#${invoiceData.invoiceNumber}`), 50);

      // Business & Client Details Section (Grid Layout)
      const startY = 70;
      
      // From Section
      doc.setFontSize(12);
      doc.setTextColor(107, 114, 128);
      doc.text('From', margin, startY);
      
      if (invoiceData.businessLogo) {
        const logoSrc = invoiceData.businessLogo instanceof File
          ? URL.createObjectURL(invoiceData.businessLogo)
          : invoiceData.businessLogo;
        doc.addImage(logoSrc, 'JPEG', margin, startY + 5, 40, 20);
      }

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text(invoiceData.businessName, margin, startY + 35);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      const businessAddressLines = doc.splitTextToSize(invoiceData.businessAddress, 80);
      businessAddressLines.forEach((line, i) => {
        doc.text(line, margin, startY + 45 + (i * 6));
      });
      doc.text(invoiceData.businessEmail, margin, startY + 45 + (businessAddressLines.length * 6) + 6);

      // Bill To Section
      const rightColumnX = pageWidth / 2 + 10;
      doc.setTextColor(107, 114, 128);
      doc.text('Bill To', rightColumnX, startY);

      if (invoiceData.clientLogo) {
        const clientLogoSrc = invoiceData.clientLogo instanceof File
          ? URL.createObjectURL(invoiceData.clientLogo)
          : invoiceData.clientLogo;
        doc.addImage(clientLogoSrc, 'JPEG', rightColumnX, startY + 5, 40, 20);
      }

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text(invoiceData.clientName, rightColumnX, startY + 35);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      const clientAddressLines = doc.splitTextToSize(invoiceData.clientAddress, 80);
      clientAddressLines.forEach((line, i) => {
        doc.text(line, rightColumnX, startY + 45 + (i * 6));
      });
      doc.text(invoiceData.clientEmail, rightColumnX, startY + 45 + (clientAddressLines.length * 6) + 6);

      // Dates Section
      const datesY = startY + 90;
      doc.setTextColor(107, 114, 128);
      doc.text('Issue Date', margin, datesY);
      doc.text('Due Date', rightColumnX, datesY);
      
      doc.setTextColor(31, 41, 55);
      doc.text(invoiceData.dateIssued, margin, datesY + 10);
      doc.text(invoiceData.dueDate, rightColumnX, datesY + 10);

      // Items Table
      doc.autoTable({
        startY: datesY + 30,
        head: [['Description', 'Quantity', 'Rate', 'Amount']],
        body: items.map(item => [
          item.description,
          item.quantity,
          `${invoiceData.currency}${item.rate.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          `${invoiceData.currency}${(item.quantity * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
        ]),
        styles: {
          fontSize: 10,
          cellPadding: 6,
        },
        headStyles: {
          fillColor: [249, 250, 251], // bg-gray-50
          textColor: [107, 114, 128], // text-gray-600
          fontStyle: 'bold',
          halign: 'right'
        },
        columnStyles: {
          0: { halign: 'left' },
          1: { halign: 'right' },
          2: { halign: 'right' },
          3: { halign: 'right' }
        },
        alternateRowStyles: {
          fillColor: [249, 250, 251] // bg-gray-50
        },
        margin: { left: margin, right: margin }
      });

      // Totals Section
      const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
      const discount = invoiceData.enableDiscount ? subtotal * (invoiceData.discountRate / 100) : 0;
      const tax = invoiceData.enableTax ? (subtotal - discount) * (invoiceData.taxRate / 100) : 0;
      const total = subtotal - discount + tax;

      const totalsX = pageWidth - margin - 60;
      let totalsY = doc.lastAutoTable.finalY + 20;

      // Subtotal
      doc.setTextColor(107, 114, 128);
      doc.text('Subtotal', totalsX - 50, totalsY);
      doc.setTextColor(31, 41, 55);
      doc.text(
        `${invoiceData.currency}${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        totalsX + 50,
        totalsY,
        { align: 'right' }
      );

      // Discount if enabled
      if (invoiceData.enableDiscount) {
        totalsY += 10;
        doc.setTextColor(220, 38, 38); // text-red-600
        doc.text(`Discount (${invoiceData.discountRate}%)`, totalsX - 50, totalsY);
        doc.text(
          `-${invoiceData.currency}${discount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          totalsX + 50,
          totalsY,
          { align: 'right' }
        );
      }

      // Tax if enabled
      if (invoiceData.enableTax) {
        totalsY += 10;
        doc.setTextColor(107, 114, 128);
        doc.text(`Tax (${invoiceData.taxRate}%)`, totalsX - 50, totalsY);
        doc.setTextColor(31, 41, 55);
        doc.text(
          `${invoiceData.currency}${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          totalsX + 50,
          totalsY,
          { align: 'right' }
        );
      }

      // Total
      totalsY += 15;
      doc.setDrawColor(229, 231, 235); // border-gray-200
      doc.line(totalsX - 60, totalsY - 5, totalsX + 50, totalsY - 5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text('Total', totalsX - 50, totalsY);
      doc.text(
        `${invoiceData.currency}${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        totalsX + 50,
        totalsY,
        { align: 'right' }
      );

      // Terms and Notes Section
      const termsY = totalsY + 30;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      
      // Terms
      doc.text('Terms & Conditions', margin, termsY);
      const termsLines = doc.splitTextToSize(invoiceData.terms, (pageWidth - (margin * 2)) / 2);
      doc.setTextColor(31, 41, 55);
      termsLines.forEach((line, i) => {
        doc.text(line, margin, termsY + 10 + (i * 6));
      });

      // Notes if available
      if (invoiceData.notes) {
        doc.setTextColor(107, 114, 128);
        doc.text('Notes', rightColumnX, termsY);
        const notesLines = doc.splitTextToSize(invoiceData.notes, (pageWidth - (margin * 2)) / 2);
        doc.setTextColor(31, 41, 55);
        notesLines.forEach((line, i) => {
          doc.text(line, rightColumnX, termsY + 10 + (i * 6));
        });
      }

      console.log('PDF generated successfully');
      doc.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error generating PDF');
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center mb-8">
          <a href="/" className="flex items-center text-sm text-codGray-500 dark:text-codGray-400 hover:text-codGray-100 dark:hover:text-codGray-300">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Home
          </a>
        </div>

        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-algaeGreen-100 rounded-full mb-4">
            <DocumentTextIcon className="w-8 h-8 text-algaeGreen-500" />
          </div>
          <h1 className="text-3xl text-codGray-900 dark:text-codGray-100 font-bold">Invoice Generator</h1>
          <p className="text-codGray-500 dark:text-codGray-400">Generate professional invoices in seconds</p>
        </div>

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
                  {invoiceData.businessLogo instanceof File ? (
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
                  {invoiceData.clientLogo instanceof File ? (
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

        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 mb-8">
          {/* Your Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Details</h2>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Business Name</label>
              <input
                type="text"
                value={invoiceData.businessName || ''}
                onChange={(e) => setInvoiceData({...invoiceData, businessName: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Business Email</label>
              <input
                type="email"
                value={invoiceData.businessEmail}
                onChange={(e) => setInvoiceData({...invoiceData, businessEmail: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Business Address</label>
              <textarea
                value={invoiceData.businessAddress}
                onChange={(e) => setInvoiceData({...invoiceData, businessAddress: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="3"
              />
            </div>
          </section>

          {/* Client Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Client Details</h2>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Client Name</label>
              <input
                type="text"
                value={invoiceData.clientName}
                onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Client Email</label>
              <input
                type="email"
                value={invoiceData.clientEmail}
                onChange={(e) => setInvoiceData({...invoiceData, clientEmail: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Client Address</label>
              <textarea
                value={invoiceData.clientAddress}
                onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="3"
              />
            </div>
          </section>
        </div>

        {/* Invoice Details */}
        <section className="mb-8 bg-white/10 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
          <div className="grid grid-cols-1 tablet:grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Invoice Number</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                placeholder="INV-001"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Currency</label>
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
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Date Issued</label>
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
              <label className="block mb-1 text-sm text-codGray-500 dark:text-codGray-400">Due Date</label>
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

        <section className="mt-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          
          <button
            onClick={addItem}
            className="mb-4 inline-flex items-center bg-algaeGreen-600 text-white px-4 py-2 rounded hover:bg-algaeGreen-700"
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
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
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
                        className="w-24 text-right bg-white/5 text-codGray-900 dark:text-codGray-100"
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
                        className="w-24 text-right bg-white/5 text-codGray-900 dark:text-codGray-100"
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
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1">Notes</label>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="4"
                placeholder="Any additional notes for the client..."
              />
            </div>
            <div>
              <label className="block mb-1">Terms & Conditions</label>
              <textarea
                value={invoiceData.terms}
                onChange={(e) => setInvoiceData({...invoiceData, terms: e.target.value})}
                className="w-full p-2 border text-codGray-900 dark:text-codGray-100 rounded bg-white/5"
                rows="4"
                placeholder="Payment terms and conditions..."
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button 
            onClick={handlePreview}
            className="inline-flex items-center px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            <EyeIcon className="w-5 h-5 mr-2" />
            Preview Invoice
          </button>
          <button
            onClick={generatePDF}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
            Download PDF
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
            onClose={handleClosePreview}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceGenerator; 