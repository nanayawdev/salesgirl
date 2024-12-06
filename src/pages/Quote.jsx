import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import QuoteForm from '@/components/QuoteForm/QuoteForm';
import { toast } from 'sonner';

const Quote = () => {
  const { id } = useParams();
  const { fetchQuoteById } = useQuotes();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const mode = id ? (window.location.pathname.includes('/view/') ? 'view' : 'edit') : 'create';

  useEffect(() => {
    const loadQuote = async () => {
      if (id) {
        try {
          const data = await fetchQuoteById(id);
          if (!data) {
            toast.error('Quote not found');
            navigate('/quotes');
            return;
          }
          setQuote(data);
        } catch (error) {
          console.error('Error loading quote:', error);
          toast.error('Error loading quote');
          navigate('/quotes');
        } finally {
          setLoading(false);
        }
      }
    };

    loadQuote();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto p-6">
        <QuoteForm 
          mode={mode} 
          initialData={quote}
        />
      </div>
    </div>
  );
};

export default Quote; 