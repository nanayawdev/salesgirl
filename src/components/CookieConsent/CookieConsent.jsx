import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-codGray-800 dark:bg-codGray-800 rounded-lg shadow-lg p-4 text-white">
      <p className="text-xs mb-4">
        We use first-party cookies to improve our services.
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleAccept}
          className="btn-secondary"
        >
          Accept
        </button>
        <button
          onClick={handleOptOut}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm"
        >
          Opt out
        </button>
      </div>
    </div>
  );
};

export default CookieConsent; 