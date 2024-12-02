import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download } from 'lucide-react'; // Import the Download icon
import jsPDF from 'jspdf';

const ViewInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    // Fetch the invoice data based on the ID
    const fetchInvoice = async () => {
      // Replace with your actual data fetching logic
      const fetchedInvoice = {
        invoiceNumber: '12345',
        date: new Date(),
        clientName: 'John Doe',
        clientEmail: 'john.doe@example.com',
        items: [
          { description: 'Item 1', quantity: 2, price: 50 },
          { description: 'Item 2', quantity: 1, price: 100 },
        ],
        total: 200,
      };
      setInvoice(fetchedInvoice);
    };

    fetchInvoice();
  }, [id]);

  const generatePDF = () => {
    if (!invoice) return;

    const doc = new jsPDF();
    
    // Add company logo/name
    doc.setFontSize(20);
    doc.text('Invoice', 20, 20);
    
    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 20, 40);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 20, 50);
    
    // Add client details
    doc.text('Bill To:', 20, 70);
    doc.text(invoice.clientName, 20, 80);
    doc.text(invoice.clientEmail, 20, 90);
    
    // Add items table
    let yPos = 110;
    doc.text('Description', 20, yPos);
    doc.text('Quantity', 90, yPos);
    doc.text('Price', 130, yPos);
    doc.text('Total', 170, yPos);
    
    yPos += 10;
    doc.line(20, yPos, 190, yPos); // Add line under headers
    
    // Add items
    invoice.items.forEach((item) => {
      yPos += 10;
      doc.text(item.description, 20, yPos);
      doc.text(item.quantity.toString(), 90, yPos);
      doc.text(`$${item.price.toFixed(2)}`, 130, yPos);
      doc.text(`$${(item.quantity * item.price).toFixed(2)}`, 170, yPos);
    });
    
    // Add total
    yPos += 20;
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    doc.text(`Total: $${invoice.total.toFixed(2)}`, 150, yPos);
    
    // Save the PDF
    doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Check if invoice data is loaded */}
      {invoice ? (
        <>
          {/* Display invoice details here */}
          <h1>Invoice #{invoice.invoiceNumber}</h1>
          <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
          <p>Client: {invoice.clientName}</p>
          <p>Email: {invoice.clientEmail}</p>
          {/* Add more invoice details as needed */}

          {/* Add Download PDF button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={generatePDF}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </>
      ) : (
        <p>Loading invoice...</p>
      )}
    </div>
  );
};

export default ViewInvoice; 