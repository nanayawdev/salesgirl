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
    <div className="bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
            Price Calculator
          </span>
          <h1 className="main-heading">
            Calculate <span className="span-text">Prices</span>
          </h1>
          <p className="description-text">
            Calculate project costs and generate accurate quotes
          </p>
        </div>

        <div className="p-6 bg-codGray-50 dark:bg-codGray-800 rounded-lg shadow">
          <div className="mb-4">
            <label className="block mb-2 text-codGray-900 dark:text-codGray-100">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="w-full p-2 border rounded bg-white dark:bg-codGray-700 border-codGray-200 dark:border-codGray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-codGray-900 dark:text-codGray-100">Rate</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full p-2 border rounded bg-white dark:bg-codGray-700 border-codGray-200 dark:border-codGray-600"
            />
          </div>
          <button
            onClick={calculateTotal}
            className="btn-primary"
          >
            Calculate
          </button>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-codGray-900 dark:text-codGray-100">
              Total: ${total.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator; 