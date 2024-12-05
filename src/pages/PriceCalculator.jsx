import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const PriceCalculator = () => {
  const [quantity, setQuantity] = useState(1);
  const [rate, setRate] = useState(0);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    setTotal(quantity * rate);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="main-heading">Price Calculator</h1>
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="mb-4">
          <label className="block mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Rate</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={calculateTotal}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Calculate
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Total: ${total.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator; 