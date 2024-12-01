import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import InvoiceFeatures from './components/InvoiceFeatures/InvoiceFeatures';
import InvoiceSteps from './components/InvoiceSteps/InvoiceSteps';
import InvoiceGenerator from './components/InvoiceGenerator/InvoiceGenerator';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InvoiceFeatures />
      <InvoiceSteps />
      <InvoiceGenerator />
    </>
  );
}

export default App;
