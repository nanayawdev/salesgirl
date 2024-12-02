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
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
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
          <Route path="/create-invoice" element={
            <ProtectedRoute>
              <InvoiceGenerator />
            </ProtectedRoute>
          } />
          <Route path="/edit-invoice/:id" element={
            <ProtectedRoute>
              <InvoiceGenerator />
            </ProtectedRoute>
          } />
          <Route path="/view-invoice/:id" element={
            <ProtectedRoute>
              <InvoiceGenerator view />
            </ProtectedRoute>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
