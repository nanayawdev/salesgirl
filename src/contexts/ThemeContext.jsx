import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check if theme exists in localStorage
    const savedTheme = localStorage.getItem('theme');
    // If theme exists in localStorage, return it
    // If not, return 'system' as default
    return savedTheme || 'system';
  });

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('theme', theme);

    // Handle system theme changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      };
      
      handleChange(); // Initial check
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Handle manual theme changes
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 