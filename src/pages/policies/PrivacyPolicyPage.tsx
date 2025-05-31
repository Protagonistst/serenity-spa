import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen py-20 bg-section-light">
      <div className="container-custom max-w-4xl">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h1 className="font-serif font-bold mb-4 text-charcoal-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-gray-300">
            Your privacy and personal information protection
          </p>
          <p className="text-sm text-charcoal-500 dark:text-gray-400 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-luxury p-8 lg:p-12 space-y-8"
        >
          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Information We Collect
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                At Serenity Spa, we respect your privacy and are committed to protecting your personal information. 
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create an account or book an appointment</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for inquiries or support</li>
                <li>Participate in surveys or feedback forms</li>
                <li>Visit our spa and use our services</li>
              </ul>
              <p>
                This information may include your name, email address, phone number, address, 
                payment information, health preferences, and communication preferences.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our spa services</li>
                <li>Process transactions and send booking confirmations</li>
                <li>Send you newsletters, promotional materials, and wellness tips</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Personalize your spa experience and treatment recommendations</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Information Sharing
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties, 
                except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist us in operating our website and spa</li>
                <li>To comply with legal requirements or protect our rights</li>
                <li>In connection with a business transfer or sale</li>
              </ul>
              <p>
                All third-party service providers are contractually obligated to keep your information 
                confidential and use it only for the purposes we specify.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Data Security
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information by authorized personnel only</li>
                <li>Staff training on privacy and security protocols</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Your Rights
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability (receive your data in a structured format)</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Cookies and Tracking
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                These technologies help us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve our website performance and functionality</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences. However, disabling 
                certain cookies may limit website functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Contact Us
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, 
                please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-charcoal-800 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@serenityspa.com</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Serenity Lane, Beverly Hills, CA 90210</p>
              </div>
              <p>
                We will respond to your inquiry within 30 days of receipt.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 dark:border-charcoal-700 pt-6">
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Changes to This Policy
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or for legal, operational, or regulatory reasons. We will notify you of any significant 
                changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
              <p>
                Your continued use of our services after any modifications indicates your acceptance 
                of the updated Privacy Policy.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 