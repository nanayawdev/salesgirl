import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Menu, X, Sun, Moon, SunMoon } from 'lucide-react';
import NoticeBar from '../ui/noticebar';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setIsThemeOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Company', href: '/company' },
    { label: 'Competitions', href: '/competitions' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Events', href: '/events' },
  ];

  const themeIcon = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    system: <SunMoon className="h-5 w-5" />
  };

  return (
    <nav className="w-full bg-white dark:bg-background-dark relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4">
          <div className="flex items-center justify-between h-16">
            {/* Left section - with flex-1 */}
            <div className="flex-1 flex items-center space-x-2 tablet:space-x-4 laptop:space-x-8">
              {/* Logo */}
              <a href="/" className="flex-shrink-0">
                <span className="text-gray-900 dark:text-white text-xl">
                  PaddyVotes
                </span>
              </a>
              
              <NoticeBar />
            </div>

            {/* Center section - with flex-1 and justify-center */}
            <div className="flex-1 hidden laptop:flex items-center justify-center space-x-4">
              {navItems.map((item) => (
                <React.Fragment key={item.label}>
                  <a
                    href={item.href}
                    className="text-p-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 font-medium"
                  >
                    {item.label}
                  </a>
                  {item.label === 'Events' && (
                    <div className="h-4 w-px bg-gray-200 dark:bg-border-dark" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right section - with flex-1 and justify-end */}
            <div className="flex-1 flex items-center justify-end space-x-2 tablet:space-x-4 laptop:space-x-6">
              <a
                href="/signin"
                className="hidden tablet:block text-p-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
              >
                Sign in
              </a>
              
              <a
                href="/signup"
                className="hidden tablet:block text-p-base bg-gray-900 text-white dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 font-medium rounded-lg transition-colors whitespace-nowrap"
              >
                Create competition →
              </a>

              <div className="hidden tablet:block h-4 w-px bg-gray-200 dark:bg-border-dark" />

              <div className="relative" ref={themeDropdownRef}>
                <button
                  onClick={() => setIsThemeOpen(!isThemeOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg transition-colors"
                  aria-label="Toggle theme"
                >
                  {themeIcon[theme]}
                </button>

                {isThemeOpen && (
                  <div className="absolute right-0 z-50 top-full mt-8 w-36 bg-white dark:bg-background-dark border border-gray-200 dark:border-border-dark rounded-lg shadow-lg py-1">
                    <button
                      onClick={() => {
                        setTheme('light');
                        setIsThemeOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-p-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </button>
                    <button
                      onClick={() => {
                        setTheme('dark');
                        setIsThemeOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-p-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </button>
                    <button
                      onClick={() => {
                        setTheme('system');
                        setIsThemeOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-p-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <SunMoon className="h-4 w-4 mr-2" />
                      System
                    </button>
                  </div>
                )}
              </div>

              <button
                className="laptop:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          <div className="mt-4 border-b border-gray-200 dark:border-border-dark" />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="laptop:hidden py-4 absolute left-0 right-0 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-border-dark shadow-lg">
            <div className="space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item) => (
                <React.Fragment key={item.label}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 font-satoshi text-p-base font-normal text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {item.label}
                  </a>
                  {item.label === 'Events' && (
                    <div className="mx-4 my-2 border-t border-gray-200 dark:border-border-dark" />
                  )}
                </React.Fragment>
              ))}
              <div className="px-4 py-4 space-y-4 tablet:hidden">
                <a
                  href="/signin"
                  className="block font-satoshi text-p-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Sign in
                </a>
                <a
                  href="/signup"
                  className="block w-full font-satoshi text-p-base bg-gray-900 text-white dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 font-medium rounded-lg text-center"
                >
                  Create competition →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;