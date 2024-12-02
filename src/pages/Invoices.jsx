import { useState } from 'react';
import DeleteInvoiceModal from '@/components/DeleteInvoiceModal/DeleteInvoiceModal';

const Invoices = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleDeleteClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      // Your delete logic here
      console.log('Deleting invoice:', selectedInvoice);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="w-full overflow-x-auto border rounded-lg shadow">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Header 1
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Header 2
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Header 3
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Header 4
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Header 5
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Data 1</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 2</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 3</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 4</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 5</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DeleteInvoiceModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onDelete={handleDelete}
        invoiceNumber={selectedInvoice?.invoiceNumber}
      />
    </div>
  );
};

export default Invoices; 