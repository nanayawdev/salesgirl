import { ArrowRight, CheckCircle2, Users2, Rocket, HeartHandshake, Mail, Globe2 } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-algaeGreen-400" />,
      title: "Smart Invoicing",
      description: "Create professional invoices in seconds with our intelligent templates and automated calculations."
    },
    {
      icon: <Users2 className="w-6 h-6 text-algaeGreen-400" />,
      title: "Client Management",
      description: "Efficiently manage your client database with detailed profiles and transaction history."
    },
    {
      icon: <Globe2 className="w-6 h-6 text-algaeGreen-400" />,
      title: "Global Reach",
      description: "Support for multiple currencies and languages, making international business seamless."
    },
    {
      icon: <Rocket className="w-6 h-6 text-algaeGreen-400" />,
      title: "Real-time Analytics",
      description: "Track your business performance with detailed insights and customizable reports."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50+", label: "Countries" },
    { number: "1M+", label: "Invoices Generated" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-codGray-50 dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-algaeGreen-400/10 to-transparent py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-codGray-900 dark:text-white mb-6">
              Revolutionizing Business Finance
            </h1>
            <p className="text-lg text-codGray-600 dark:text-codGray-300 mb-8">
              Salesgirl is more than just an invoicing platform. We're on a mission to empower businesses 
              with smart, efficient, and professional financial tools.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white dark:bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-algaeGreen-400 mb-2">{stat.number}</div>
                <div className="text-sm text-codGray-600 dark:text-codGray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg bg-white dark:bg-secondary/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-codGray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-codGray-600 dark:text-codGray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white dark:bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 bg-algaeGreen-400/10 rounded-full mb-6">
              <HeartHandshake className="w-8 h-8 text-algaeGreen-400" />
            </div>
            <h2 className="text-3xl font-bold text-codGray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-codGray-600 dark:text-codGray-300 mb-8">
              We believe in making professional financial tools accessible to businesses of all sizes. 
              Our platform is built with the latest technology to ensure security, efficiency, and ease of use, 
              helping you focus on what matters most - growing your business.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 bg-algaeGreen-400/10 rounded-full mb-6">
              <Mail className="w-8 h-8 text-algaeGreen-400" />
            </div>
            <h2 className="text-3xl font-bold text-codGray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-codGray-600 dark:text-codGray-300 mb-8">
              Have questions or feedback? Our team is here to help you succeed.
            </p>
            <a 
              href="mailto:contact@salesgirl.com"
              className="inline-flex items-center px-6 py-3 bg-algaeGreen-400 hover:bg-algaeGreen-500 text-white dark:text-black rounded-lg transition-colors duration-300"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 