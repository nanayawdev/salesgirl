import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import InvoiceFeatures from './components/InvoiceFeatures/InvoiceFeatures';
import InvoiceSteps from './components/InvoiceSteps/InvoiceSteps';
function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InvoiceFeatures />
      <InvoiceSteps />
    </>
  );
}

export default App;
