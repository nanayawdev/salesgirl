import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const GuestGuard = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/invoices');
    }
  }, [user, navigate]);

  return !user ? children : null;
};

export default GuestGuard; 