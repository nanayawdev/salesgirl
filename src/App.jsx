import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import InvoiceFeatures from './components/InvoiceFeatures/InvoiceFeatures';
import InvoiceSteps from './components/InvoiceSteps/InvoiceSteps';
import InvoiceGenerator from './components/InvoiceGenerator/InvoiceGenerator';
import InvoiceList from './components/InvoiceList/InvoiceList';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <InvoiceFeatures />
            <InvoiceSteps />
            <Footer />
          </>
        } />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/create-invoice" element={<InvoiceGenerator />} />
        <Route path="/edit-invoice/:id" element={<InvoiceGenerator />} />
        <Route path="/view-invoice/:id" element={<InvoiceGenerator view />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
