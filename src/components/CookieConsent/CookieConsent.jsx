import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 4000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleOptOut = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20
            }
          }}
          exit={{ 
            y: 100, 
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm 
            bg-codGray-800 dark:bg-codGray-800 rounded-lg shadow-lg p-4 text-codGray-50"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm mb-4"
          >
            We use first-party cookies to improve our services.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            <button
              onClick={handleAccept}
              className="btn-primary"
            >
              Accept
            </button>
            <button
              onClick={handleOptOut}
              className="btn-secondary"
            >
              Opt out
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 