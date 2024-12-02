import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateInvoiceNumber = () => {
    return `INV-${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`;
  };

  // Fetch all invoices for the logged-in user
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          invoice_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvoices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to upload logos
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

  // Create new invoice
  const createInvoice = async (invoiceData, items) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');

      // Handle logo uploads
      let businessLogoUrl = null;
      let clientLogoUrl = null;

      if (invoiceData.businessLogo instanceof File) {
        businessLogoUrl = await uploadLogo(invoiceData.businessLogo, 'business');
      }

      if (invoiceData.clientLogo instanceof File) {
        clientLogoUrl = await uploadLogo(invoiceData.clientLogo, 'client');
      }

      // First, create the invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([
          {
            user_id: user.id,
            invoice_number: invoiceData.invoiceNumber || generateInvoiceNumber(),
            business_name: invoiceData.businessName,
            business_email: invoiceData.businessEmail,
            business_address: invoiceData.businessAddress,
            business_logo_url: businessLogoUrl,
            client_name: invoiceData.clientName,
            client_email: invoiceData.clientEmail,
            client_address: invoiceData.clientAddress,
            client_logo_url: clientLogoUrl,
            currency: invoiceData.currency,
            date_issued: invoiceData.dateIssued,
            due_date: invoiceData.dueDate,
            enable_tax: invoiceData.enableTax,
            tax_rate: invoiceData.taxRate,
            enable_discount: invoiceData.enableDiscount,
            discount_rate: invoiceData.discountRate,
            notes: invoiceData.notes,
            terms: invoiceData.terms
          }
        ])
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Then, create the invoice items
      if (items && items.length > 0) {
        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(
            items.map(item => ({
              invoice_id: invoice.id,
              description: item.description,
              quantity: item.quantity,
              rate: item.rate
            }))
          );

        if (itemsError) throw itemsError;
      }

      toast.success('Invoice created successfully!');
      return invoice;

    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error(error.message);
      throw error;
    }
  };

  // Update existing invoice
  const updateInvoice = async (id, invoiceData, items) => {
    try {
      // Handle logo uploads if they are new files
      let businessLogoUrl = invoiceData.businessLogo;
      let clientLogoUrl = invoiceData.clientLogo;

      if (invoiceData.businessLogo instanceof File) {
        businessLogoUrl = await uploadLogo(invoiceData.businessLogo, 'business');
      }

      if (invoiceData.clientLogo instanceof File) {
        clientLogoUrl = await uploadLogo(invoiceData.clientLogo, 'client');
      }

      // Update the invoice
      const { error: invoiceError } = await supabase
        .from('invoices')
        .update({
          business_name: invoiceData.businessName,
          business_email: invoiceData.businessEmail,
          business_address: invoiceData.businessAddress,
          business_logo_url: businessLogoUrl,
          client_name: invoiceData.clientName,
          client_email: invoiceData.clientEmail,
          client_address: invoiceData.clientAddress,
          client_logo_url: clientLogoUrl,
          currency: invoiceData.currency,
          date_issued: invoiceData.dateIssued,
          due_date: invoiceData.dueDate,
          enable_tax: invoiceData.enableTax,
          tax_rate: invoiceData.taxRate,
          enable_discount: invoiceData.enableDiscount,
          discount_rate: invoiceData.discountRate,
          notes: invoiceData.notes,
          terms: invoiceData.terms
        })
        .eq('id', id);

      if (invoiceError) throw invoiceError;

      // Update the invoice items
      const { error: itemsError } = await supabase
        .from('invoice_items')
        .delete()
        .eq('invoice_id', id);

      if (itemsError) throw itemsError;

      const { error: insertItemsError } = await supabase
        .from('invoice_items')
        .insert(
          items.map(item => ({
            invoice_id: id,
            description: item.description,
            quantity: item.quantity,
            rate: item.rate
          }))
        );

      if (insertItemsError) throw insertItemsError;

      toast.success('Invoice updated successfully!');
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast.error('Failed to update invoice');
      throw error;
    }
  };

  // Delete invoice and associated files
  const deleteInvoice = async (id) => {
    try {
      // Get the invoice details first to get logo URLs
      const { data: invoice } = await supabase
        .from('invoices')
        .select('business_logo_url, client_logo_url')
        .eq('id', id)
        .single();

      // Delete logos from storage if they exist
      if (invoice.business_logo_url) {
        await supabase.storage
          .from('logos')
          .remove([invoice.business_logo_url.split('/').pop()]);
      }
      if (invoice.client_logo_url) {
        await supabase.storage
          .from('logos')
          .remove([invoice.client_logo_url.split('/').pop()]);
      }

      // Delete the invoice (cascade will handle items)
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Invoice deleted successfully');
    } catch (error) {
      toast.error('Error deleting invoice');
      throw error;
    }
  };

  const fetchUserInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          invoice_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;

    } catch (error) {
      toast.error('Error fetching invoices');
      throw error;
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoices,
    loading,
    error,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    fetchUserInvoices,
    uploadLogo
  };
}; 