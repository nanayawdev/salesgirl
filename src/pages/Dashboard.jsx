import React, { useState } from 'react';
import InvoiceList from '@/components/InvoiceList/InvoiceList';
import QuoteList from '@/components/QuoteList/QuoteList';
import { Tab } from '@headlessui/react';
import { DocumentTextIcon, DocumentIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Dashboard = () => {
  const tabs = [
    { name: 'Invoices', icon: DocumentTextIcon, component: <InvoiceList /> },
    { name: 'Quotes', icon: DocumentIcon, component: <QuoteList /> },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your invoices and quotes in one place
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'flex items-center justify-center',
                  selected
                    ? 'bg-white text-emerald-600 shadow'
                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                )
              }
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white',
                'focus:outline-none'
              )}
            >
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Dashboard; 