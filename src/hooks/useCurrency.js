import { useState, useEffect } from 'react';

const API_KEY = 'e7df35945455a0b4d1f778d8'; // Get from https://app.exchangerate-api.com/
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export const useCurrency = (baseCurrency = 'USD') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
        const data = await response.json();
        
        if (data.result === 'success') {
          setRates(data.conversion_rates);
        } else {
          throw new Error('Failed to fetch currency rates');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  const convertAmount = (amount, fromCurrency, toCurrency) => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return amount;
    
    // Convert to base currency first, then to target currency
    const amountInBaseCurrency = amount / rates[fromCurrency];
    return amountInBaseCurrency * rates[toCurrency];
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return {
    rates,
    loading,
    error,
    convertAmount,
    formatAmount,
  };
};

export const CURRENCY_OPTIONS = [
  { value: 'GHS', label: 'GHS - Ghanaian Cedi' },
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'AUD', label: 'AUD - Australian Dollar' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
  { value: 'CNY', label: 'CNY - Chinese Yuan' },
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'NZD', label: 'NZD - New Zealand Dollar' },
]; 