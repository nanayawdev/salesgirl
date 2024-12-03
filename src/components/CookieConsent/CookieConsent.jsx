import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      // Delay the appearance by 4 seconds
      setTimeout(() => {
        setShouldRender(true);
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

  if (!shouldRender) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm 
      bg-codGray-800 dark:bg-codGray-800 rounded-lg shadow-lg p-4 text-codGray-50
      transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <p className="text-sm mb-4">
        We use first-party cookies to improve our services.
      </p>
      <div className="flex gap-3">
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
      </div>
    </div>
  );
};

export default CookieConsent; 