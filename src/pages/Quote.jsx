import React from 'react';

const Quote = () => {
  const services = [
    { name: 'Invoice Generator', status: 'Operational' },
    { name: 'Authentication', status: 'Operational' },
    { name: 'API', status: 'Operational' },
    { name: 'Database', status: 'Operational' },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-codGray-900 dark:text-codGray-50">
            Quote Generator
          </h1>
          <p className="mt-3 text-codGray-600 dark:text-codGray-400">
            Generate a quote for your project
          </p>
        </div>

        <div className="bg-white dark:bg-codGray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="grid gap-4">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 border-b border-codGray-200 dark:border-codGray-700 last:border-0"
                >
                  <span className="text-codGray-900 dark:text-codGray-50 font-medium">
                    {service.name}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-codGray-900 dark:text-codGray-50 mb-6">
            Incident History
          </h2>
          <div className="bg-white dark:bg-codGray-800 rounded-lg shadow-lg p-6">
            <p className="text-codGray-600 dark:text-codGray-400">
              No incidents reported in the last 90 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote; 