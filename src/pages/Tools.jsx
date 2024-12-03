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
    <div className="bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
            Professional Suite
          </span>
          <h1 className="main-heading">
            Business <span className="span-text">Tools</span>
          </h1>
          <p className="description-text">
            Streamline your business operations with our comprehensive suite of professional tools
          </p>
          <Link 
            to="/create-invoice" 
            className="btn-primary mt-8 inline-flex items-center"
          >
            Try Now
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link
                key={tool.title}
                to={tool.link}
                className="group p-4 sm:p-6 rounded-2xl bg-codGray-50 dark:bg-codGray-950 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-algaeGreen-50 dark:bg-codGray-600/30 w-fit transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-algaeGreen-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl phone:text-base tablet:text-lg laptop:text-xl desktop:text-xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 dark:group-hover:text-algaeGreen-400 transition-colors duration-300">
                        {tool.title}
                      </h3>
                      {tool.badge && (
                        <span className="px-2 py-1 text-xs font-medium bg-algaeGreen-50 dark:bg-algaeGreen-900/20 text-algaeGreen-600 dark:text-algaeGreen-400 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="description-text-sm mt-2">
                      {tool.description}
                    </p>
                  </div>
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