import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import logo from '@/assets/logo/salesgirl-logo.svg';
const Footer = () => {
    return (
        <section className="py-8 md:py-12 bg-background-dark">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col items-center space-y-8 lg:space-y-0 lg:flex-row lg:justify-between">
                    {/* Logo and Copyright */}
                    <div className="flex flex-col items-center lg:flex-row lg:items-center space-y-4 lg:space-y-0">
                        <img 
                            className="h-6 w-auto md:h-7" 
                            src={logo} 
                            alt="Sales Girl Logo" 
                        />
                        <p className="text-sm text-white lg:ml-6">
                            © Copyright {new Date().getFullYear()}
                        </p>
                    </div>

                    {/* Navigation and Social */}
                    <div className="flex flex-col items-center space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                        {/* Navigation Links */}
                        <nav>
                            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-x-8">
                                {['About', 'Privacy Policy', 'Terms & Conditions', 'Support'].map((item) => (
                                    <li key={item}>
                                        <a 
                                            href="#" 
                                            className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Divider */}
                        <div className="w-full h-px lg:w-px lg:h-6 bg-gray-50/20 max-w-[200px] lg:max-w-none"></div>

                        {/* Social Icons */}
                        <ul className="flex items-center space-x-6 md:space-x-8">
                            {[
                                { Icon: Twitter, href: '#' },
                                { Icon: Facebook, href: '#' },
                                { Icon: Instagram, href: '#' }
                            ].map(({ Icon, href }, index) => (
                                <li key={index}>
                                    <a 
                                        href={href} 
                                        className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                                    >
                                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
