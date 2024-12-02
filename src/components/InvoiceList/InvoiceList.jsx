import React, { useEffect, useState } from 'react';
import { useInvoices } from '../../hooks/useInvoices';
import { format } from 'date-fns';
import {
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const { fetchUserInvoices } = useInvoices();

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchUserInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Error loading invoices:', error);
      }
    };

    loadInvoices();
  }, []);

  if (invoices.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      await deleteInvoice(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Invoices</h1>
        <Link
          to="/invoice/new"
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Invoice
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Issued
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.invoice_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.client_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.currency} 
                  {invoice.invoice_items.reduce(
                    (sum, item) => sum + item.quantity * item.rate,
                    0
                  ).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(invoice.date_issued), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${new Date(invoice.due_date) < new Date() 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'}`}
                  >
                    {new Date(invoice.due_date) < new Date() ? 'Overdue' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/invoice/view/${invoice.id}`}
                      className="text-gray-400 hover:text-gray-500"
                      title="View"
                    >
                      <DocumentTextIcon className="w-5 h-5" />
                    </Link>
                    <Link
                      to={`/invoice/edit/${invoice.id}`}
                      className="text-blue-400 hover:text-blue-500"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(invoice.id)}
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
    </div>
  );
};

export default InvoiceList; 