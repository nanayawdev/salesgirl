import React, { useEffect, useState } from 'react';
import { useQuotes } from '@/hooks/useQuotes';
import { format } from 'date-fns';
import {
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import NoData from '@/components/ui/NoData';
import { toast } from 'sonner';

const QuoteList = () => {
  const { quotes, loading, fetchQuotes, deleteQuote } = useQuotes();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      try {
        await deleteQuote(id);
        toast.success('Quote deleted successfully');
        fetchQuotes(); // Refresh the list
      } catch (error) {
        console.error('Error deleting quote:', error);
        toast.error('Failed to delete quote');
      }
    }
  };

  const handleView = (id) => {
    navigate(`/quote/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/quote/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return <NoData message="No Quotes Created" createLink="/quote/new" createText="Create Quote" />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Quotes</h1>
        <Link
          to="/quote/new"
          className="btn-primary"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Quote
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quote Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valid Until
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {quote.quote_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {quote.client_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {quote.project_title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(quote.date_created), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${new Date(quote.valid_until) < new Date() 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'}`}
                  >
                    {new Date(quote.valid_until) < new Date() ? 'Expired' : 'Valid'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleView(quote.id)}
                      className="text-gray-400 hover:text-gray-500"
                      title="View"
                    >
                      <DocumentTextIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(quote.id)}
                      className="text-blue-400 hover:text-blue-500"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(quote.id)}
                      className="text-red-400 hover:text-red-500"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuoteList; 