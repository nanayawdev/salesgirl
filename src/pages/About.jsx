const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Salesgirl
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Empowering businesses with smart invoicing solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-gray-600 dark:text-gray-400">
          {/* Mission Section */}
          <section className="bg-white dark:bg-background-dark p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="mb-4">
              At Salesgirl, we're committed to simplifying the way businesses handle their invoicing 
              and financial operations. Our platform is designed to make professional invoicing 
              accessible to everyone, from freelancers to large enterprises.
            </p>
          </section>

          {/* Features Section */}
          <section className="bg-white dark:bg-background-dark p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Simple and intuitive invoice creation</li>
              <li>Secure payment processing</li>
              <li>Real-time tracking and analytics</li>
              <li>Professional templates and customization</li>
              <li>Multi-currency support</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="bg-white dark:bg-background-dark p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="mb-4">
              Have questions or feedback? We'd love to hear from you. Reach out to our team at{' '}
              <a 
                href="mailto:contact@salesgirl.com" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                contact@salesgirl.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 