import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export const useQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateQuoteNumber = () => {
    return `QT-${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`;
  };

  // Fetch all quotes for the logged-in user
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('quotes')
        .select(`
          *,
          quote_items (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new quote
  const createQuote = async (quoteData, items) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');

      // Handle logo uploads
      let businessLogoUrl = null;
      let clientLogoUrl = null;

      if (quoteData.businessLogo instanceof File) {
        businessLogoUrl = await uploadLogo(quoteData.businessLogo, 'business');
      }

      if (quoteData.clientLogo instanceof File) {
        clientLogoUrl = await uploadLogo(quoteData.clientLogo, 'client');
      }

      // Create the quote
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert([
          {
            user_id: user.id,
            quote_number: quoteData.quoteNumber || generateQuoteNumber(),
            business_name: quoteData.businessName,
            business_email: quoteData.businessEmail,
            business_address: quoteData.businessAddress,
            business_logo_url: businessLogoUrl,
            client_name: quoteData.clientName,
            client_email: quoteData.clientEmail,
            client_address: quoteData.clientAddress,
            client_logo_url: clientLogoUrl,
            project_title: quoteData.projectTitle,
            project_description: quoteData.projectDescription,
            currency: quoteData.currency,
            date_created: quoteData.dateCreated,
            valid_until: quoteData.validUntil,
            notes: quoteData.notes,
            terms: quoteData.terms
          }
        ])
        .select()
        .single();

      if (quoteError) throw quoteError;

      // Create the quote items
      if (items && items.length > 0) {
        const { error: itemsError } = await supabase
          .from('quote_items')
          .insert(
            items.map(item => ({
              quote_id: quote.id,
              description: item.description,
              quantity: item.quantity,
              rate: item.rate
            }))
          );

        if (itemsError) throw itemsError;
      }

      toast.success('Quote created successfully!');
      return quote;

    } catch (error) {
      console.error('Error creating quote:', error);
      toast.error(error.message);
      throw error;
    }
  };

  // Reuse the uploadLogo function from useInvoices
  const uploadLogo = async (file, prefix) => {
    if (!file) return null;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${prefix}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  };

  // Add other necessary functions similar to useInvoices
  // (updateQuote, deleteQuote, etc.)

  const deleteQuote = async (id) => {
    try {
      // Delete the quote (cascade will handle items)
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Quote deleted successfully');
      
      // Refresh quotes list
      fetchQuotes();
    } catch (error) {
      toast.error('Error deleting quote');
      throw error;
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return {
    quotes,
    loading,
    error,
    createQuote,
    deleteQuote,
    uploadLogo,
    fetchQuotes
  };
}; 