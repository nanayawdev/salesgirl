import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Define navigation items in one place
    const navigationItems = [
        { title: 'Features', href: '#' },
        { title: 'Solutions', href: '#' },
        { title: 'Resources', href: '#' },
        { title: 'About', href: '#' }
    ];

    // Reusable navigation link component
    const NavLink = ({ href, title, className }) => (
        <a
            href={href}
            title={title}
            className={`text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 ${className}`}
        >
            {title}
        </a>
    );

    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" title="" className="flex">
                            <img className="w-auto h-8 lg:h-10" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button 
                        type="button" 
                        className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        </svg>
                        <svg className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                        {navigationItems.map((item) => (
                            <NavLink 
                                key={item.title}
                                href={item.href}
                                title={item.title}
                            />
                        ))}
                    </div>

                    {/* CTA Button - Desktop */}
                    <a
                        href="#"
                        className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700"
                        role="button"
                    >
                        Get started now
                    </a>
                </nav>

                {/* Mobile navigation */}
                <nav className={`pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="flow-root">
                        <div className="flex flex-col px-6 -my-2 space-y-1">
                            {navigationItems.map((item) => (
                                <NavLink 
                                    key={item.title}
                                    href={item.href}
                                    title={item.title}
                                    className="inline-flex py-2"
                                />
                            ))}
                        </div>
                    </div>

                    {/* CTA Button - Mobile */}
                    <div className="px-6 mt-6">
                        <a
                            href="#"
                            className="inline-flex justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md items-center hover:bg-blue-700 focus:bg-blue-700"
                            role="button"
                        >
                            Get started now
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
