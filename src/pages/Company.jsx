import React from 'react';

const Company = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-codGray-900 dark:text-codGray-50 sm:text-5xl md:text-6xl">
            Our Company
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-codGray-600 dark:text-codGray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Building the future of business automation, one invoice at a time.
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-codGray-900 dark:text-codGray-50 text-center">
            Meet Our Team
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Team Member Cards */}
            {[1, 2, 3].map((member) => (
              <div key={member} className="bg-white dark:bg-codGray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-codGray-200 dark:bg-codGray-700"></div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-codGray-900 dark:text-codGray-50">Team Member {member}</h3>
                  <p className="mt-2 text-codGray-600 dark:text-codGray-400">Position</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-codGray-900 dark:text-codGray-50 text-center">
            Our Values
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {['Innovation', 'Integrity', 'Customer Focus'].map((value) => (
              <div key={value} className="bg-white dark:bg-codGray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-medium text-codGray-900 dark:text-codGray-50">{value}</h3>
                <p className="mt-4 text-codGray-600 dark:text-codGray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company; 