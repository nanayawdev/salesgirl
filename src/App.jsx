import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import GuestGuard from '@/components/GuestGuard/GuestGuard';
import About from './pages/About';
import CookieConsent from './components/CookieConsent/CookieConsent';
import Company from './pages/Company';
import Tools from './pages/Tools';
import Quote from './pages/Quote';
import PriceCalculator from './pages/PriceCalculator';

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
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={
            <GuestGuard>
              <SignIn />
            </GuestGuard>
          } />
          <Route path="/signup" element={
            <GuestGuard>
              <SignUp />
            </GuestGuard>
          } />
          <Route path="/forgot-password" element={
            <GuestGuard>
              <ForgotPassword />
            </GuestGuard>
          } />
          <Route path="/invoices" element={
            <ProtectedRoute>
              <InvoiceList />
            </ProtectedRoute>
          } />
          <Route path="/invoice/new" element={
            <ProtectedRoute>
              <InvoiceGenerator />
            </ProtectedRoute>
          } />
          <Route path="/create-invoice" element={
            <Navigate to="/invoice/new" replace />
          } />
          <Route path="/invoice/edit/:id" element={
            <ProtectedRoute>
              <InvoiceGenerator />
            </ProtectedRoute>
          } />
          <Route path="/invoice/view/:id" element={
            <ProtectedRoute>
              <InvoiceGenerator view />
            </ProtectedRoute>
          } />
          <Route path="/company" element={<Company />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/price" element={<PriceCalculator />} />
          <Route path="/expenses" element={<div>Expense Tracker - Coming Soon</div>} />
          <Route path="/payments" element={<div>Payment Processing - Coming Soon</div>} />
          <Route path="/receipts" element={<div>Receipt Scanner - Coming Soon</div>} />
          <Route path="/reports" element={<div>Financial Reports - Coming Soon</div>} />
          <Route path="/tax" element={<div>Tax Calculator - Coming Soon</div>} />
          <Route path="/registry" element={<div>Business Registry - Coming Soon</div>} />
        </Routes>
        <CookieConsent />
      </Router>
    </AuthProvider>
  );
}

export default App;
