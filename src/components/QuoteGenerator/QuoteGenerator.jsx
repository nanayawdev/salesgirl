import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const QuoteGenerator = ({ view = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createQuote, updateQuote, fetchQuoteById } = useQuotes();
  
  const [quoteData, setQuoteData] = useState({
    businessName: '',
    businessEmail: '',
    businessAddress: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    projectTitle: '',
    projectDescription: '',
    quoteNumber: `QT-${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`,
    currency: 'GHS',
    items: [],
    notes: '',
    terms: 'This quote is valid for 30 days from the date of issue.'
  });

  const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (id) {
      const loadQuote = async () => {
        const quote = await fetchQuoteById(id);
        if (quote) {
          setQuoteData(quote);
          setItems(quote.items);
        }
      };
      loadQuote();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (id) {
        await updateQuote(id, quoteData, items);
        toast.success('Quote updated successfully!');
      } else {
        await createQuote(quoteData, items);
        toast.success('Quote created successfully!');
      }
      navigate('/quotes');
    } catch (error) {
      toast.error('Failed to save quote');
      console.error('Error saving quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add other handlers and UI components similar to Quote.jsx

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto p-6">
        {/* Add form fields and buttons similar to Quote.jsx */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : id ? 'Update Quote' : 'Create Quote'}
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator; 