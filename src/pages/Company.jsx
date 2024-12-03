import React from 'react';
import { Link } from 'react-router-dom';

const Company = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
            About Us
          </span>
          <h1 className="main-heading">
            Building The <span className="span-text">Future</span> Of Business
          </h1>
          <p className="description-text">
            Building the future of business automation, one invoice at a time
          </p>
          <Link 
            to="/contact" 
            className="btn-primary mt-8 inline-flex items-center"
          >
            Contact Us
            <svg 
              className="w-2.5 h-2.5 lg:w-3 lg:h-3 ml-1.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { title: 'Innovation', desc: 'Pushing boundaries with cutting-edge solutions' },
              { title: 'Integrity', desc: 'Building trust through transparent practices' },
              { title: 'Customer Focus', desc: 'Your success is our primary mission' }
            ].map((value) => (
              <div key={value.title} 
                className="group p-4 sm:p-6 rounded-2xl bg-codGray-50 dark:bg-codGray-950 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1"
              >
                <h3 className="text-xl phone:text-base tablet:text-lg laptop:text-xl desktop:text-xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 dark:group-hover:text-algaeGreen-400 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="description-text-sm mt-2">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
            Our Team
          </span>
          <h2 className="main-heading text-3xl sm:text-4xl">
            Meet The <span className="span-text">Experts</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'John Doe', position: 'CEO & Founder' },
            { name: 'Jane Smith', position: 'Head of Design' },
            { name: 'Mike Johnson', position: 'Lead Developer' }
          ].map((member) => (
            <div key={member.name} 
              className="group p-4 sm:p-6 rounded-2xl bg-codGray-50 dark:bg-codGray-950 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1"
            >
              <div className="mb-4 h-48 rounded-xl bg-algaeGreen-50 dark:bg-codGray-800 overflow-hidden">
                {/* Image placeholder */}
              </div>
              <h3 className="text-xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 transition-colors duration-300">
                {member.name}
              </h3>
              <p className="description-text-sm mt-1">
                {member.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company; 