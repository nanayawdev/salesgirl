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
    <div>
      {/* Your invoices list */}
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