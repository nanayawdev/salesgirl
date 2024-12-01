import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import { Menu as MenuIcon, X, Sun, Moon, SunMoon, ChevronRight, ChevronDown, FileText, LogOut } from 'lucide-react';
import NoticeBar from '../ui/noticebar';

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Company', href: '/company' },
    { label: 'Tools', href: '/tools' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="w-full bg-white dark:bg-background-dark relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-2">
          <div className="flex items-center justify-between h-12">
            {/* Left section */}
            <div className="flex-1 flex items-center space-x-2 tablet:space-x-4 laptop:space-x-8">
              <Link to="/" className="flex-shrink-0">
                <span className="text-gray-900 dark:text-white text-xl text-[12px]">
                  Salesgirl
                </span>
              </Link>
              <NoticeBar />
            </div>

            {/* Center section */}
            <div className="flex-1 hidden laptop:flex items-center justify-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-[12px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right section */}
            <div className="flex-1 flex items-center justify-end space-x-2 tablet:space-x-4 laptop:space-x-6">
              {user ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center text-[12px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium">
                    {user.user_metadata?.full_name || user.email}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Menu.Button>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-background-dark rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/invoices"
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-800' : ''
                            } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-t-lg flex items-center`}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            My Invoices
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-800' : ''
                            } w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 rounded-b-lg hover:text-red-700 dark:hover:text-red-300 flex items-center`}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="hidden tablet:block text-[12px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden tablet:block text-[12px] bg-gray-900 text-white dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    Get started
                    <ChevronRight className="inline-block h-4 w-4 ml-1" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;