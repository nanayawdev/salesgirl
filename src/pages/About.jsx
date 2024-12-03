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
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-algaeGreen-400/10 to-transparent min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center py-12 sm:py-16 lg:py-20">
        <div className="text-center phone:max-w-xs tablet:max-w-md laptop:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 block">
            About Salesgirl
          </span>
          <h1 className="main-heading">
            Revolutionizing <span className="span-text">Business</span> Finance
          </h1>
          <p className="description-text">
            Salesgirl is more than just an invoicing platform. We're on a mission to empower businesses 
            with smart, efficient, and professional financial tools.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 phone:py-10 tablet:py-12 laptop:py-16 desktop:py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-4 gap-4 phone:gap-6 tablet:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group p-4 phone:p-5 tablet:p-6 rounded-2xl bg-white dark:bg-codGray-900 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100">
                <div className="text-2xl phone:text-2xl tablet:text-3xl laptop:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 mb-2">{stat.number}</div>
                <div className="text-sm phone:text-xs tablet:text-sm laptop:text-base text-codGray-600 dark:text-codGray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-12 phone:py-14 tablet:py-16 laptop:py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 phone:mb-10 tablet:mb-12 laptop:mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs phone:text-xs tablet:text-sm font-medium tracking-wider uppercase mb-2 block">
              Our Features
            </span>
            <h2 className="main-heading">
              Built for <span className="span-text">Modern</span> Business
            </h2>
          </div>
          <div className="grid grid-cols-1 phone:grid-cols-1 tablet:grid-cols-2 gap-4 phone:gap-5 tablet:gap-6 laptop:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-4 phone:p-5 tablet:p-6 rounded-2xl bg-codGray-50 dark:bg-codGray-950 transition-all duration-300 border border-codGray-100 dark:border-codGray-800 hover:border-algaeGreen-100 dark:hover:border-algaeGreen-100 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 phone:gap-3 tablet:gap-4 mb-2 phone:mb-3 tablet:mb-4">
                  <div className="p-2 phone:p-2.5 tablet:p-3 rounded-lg bg-algaeGreen-50 dark:bg-codGray-600/30 w-fit transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg phone:text-base tablet:text-lg laptop:text-xl desktop:text-2xl font-semibold text-codGray-900 dark:text-codGray-100 group-hover:text-algaeGreen-400 dark:group-hover:text-algaeGreen-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm phone:text-xs tablet:text-sm laptop:text-base text-codGray-600 dark:text-codGray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 phone:py-14 tablet:py-16 laptop:py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-2 phone:p-2.5 tablet:p-3 bg-algaeGreen-50 dark:bg-codGray-600/30 rounded-full w-fit mx-auto mb-4 phone:mb-5 tablet:mb-6">
            <HeartHandshake className="w-6 h-6 phone:w-7 phone:h-7 tablet:w-8 tablet:h-8 text-algaeGreen-400" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs phone:text-xs tablet:text-sm font-medium tracking-wider uppercase mb-2 block">
            Our Mission
          </span>
          <h2 className="main-heading">
            Empowering Your <span className="span-text">Success</span>
          </h2>
          <p className="description-text">
            We believe in making professional financial tools accessible to businesses of all sizes. 
            Our platform is built with the latest technology to ensure security, efficiency, and ease of use, 
            helping you focus on what matters most - growing your business.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 phone:py-14 tablet:py-16 laptop:py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-2 phone:p-2.5 tablet:p-3 bg-algaeGreen-50 dark:bg-codGray-600/30 rounded-full w-fit mx-auto mb-4 phone:mb-5 tablet:mb-6">
            <Mail className="w-6 h-6 phone:w-7 phone:h-7 tablet:w-8 tablet:h-8 text-algaeGreen-400" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algaeGreen-400 to-algaeGreen-600 text-xs phone:text-xs tablet:text-sm font-medium tracking-wider uppercase mb-2 block">
            Contact Us
          </span>
          <h2 className="main-heading">
            Let's <span className="span-text">Connect</span>
          </h2>
          <p className="description-text">
            Have questions or feedback? Our team is here to help you succeed.
          </p>
          <a 
            href="mailto:contact@salesgirl.com"
            className="btn-primary"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About; 