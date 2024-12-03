import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  BarChart2, 
  Calculator, 
  FileSpreadsheet,
  CreditCard,
  Receipt,
  PieChart,
  FileCheck,
  Building2
} from 'lucide-react';

const Tools = () => {
  const tools = [
    {
      title: 'Invoice Generator',
      description: 'Create and manage professional invoices with customizable templates',
      link: '/invoice/new',
      icon: FileText,
      badge: 'Popular'
    },
    {
      title: 'Status Dashboard',
      description: 'Monitor system performance and service availability in real-time',
      link: '/status',
      icon: BarChart2
    },
    {
      title: 'Price Calculator',
      description: 'Calculate project costs and generate accurate quotes',
      link: '/quote',
      icon: Calculator
    },
    {
      title: 'Expense Tracker',
      description: 'Track and categorize business expenses effortlessly',
      link: '/expenses',
      icon: FileSpreadsheet,
      badge: 'New'
    },
    {
      title: 'Payment Processing',
      description: 'Accept payments and manage transactions securely',
      link: '/payments',
      icon: CreditCard
    },
    {
      title: 'Receipt Scanner',
      description: 'Digitize receipts and automate expense reporting',
      link: '/receipts',
      icon: Receipt,
      badge: 'Beta'
    },
    {
      title: 'Financial Reports',
      description: 'Generate comprehensive financial reports and analytics',
      link: '/reports',
      icon: PieChart
    },
    {
      title: 'Tax Calculator',
      description: 'Estimate taxes and prepare financial documentation',
      link: '/tax',
      icon: FileCheck
    },
    {
      title: 'Business Registry',
      description: 'Manage company information and legal documentation',
      link: '/registry',
      icon: Building2
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-codGray-900 dark:text-codGray-50 sm:text-5xl md:text-6xl">
            Business Tools
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-codGray-600 dark:text-codGray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline your business operations with our comprehensive suite of professional tools
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link
                key={tool.title}
                to={tool.link}
                className="group relative bg-white dark:bg-codGray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium text-codGray-900 dark:text-codGray-50 group-hover:text-primary">
                        {tool.title}
                      </h3>
                      {tool.badge && (
                        <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-codGray-600 dark:text-codGray-400">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-6 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-primary">Try now →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tools; 