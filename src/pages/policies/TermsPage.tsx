import { motion } from 'framer-motion';

const TermsPage = () => {
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
            Terms & Conditions
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-gray-300">
            Terms of service for Serenity Spa
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
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                By accessing and using Serenity Spa's services, website, or facilities, you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to abide by 
                the above, please do not use this service.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              2. Services Description
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                Serenity Spa provides luxury wellness and beauty services including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Massage therapy and bodywork</li>
                <li>Facial treatments and skincare services</li>
                <li>Body treatments and wraps</li>
                <li>Wellness consultations</li>
                <li>Relaxation and meditation facilities</li>
                <li>Retail products and gift certificates</li>
              </ul>
              <p>
                Service availability may vary by location and season. We reserve the right to modify 
                or discontinue services at any time without notice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              3. Booking and Appointments
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p><strong>Reservations:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All appointments must be booked in advance</li>
                <li>Booking confirmation will be sent via email or SMS</li>
                <li>We recommend booking 48-72 hours in advance for availability</li>
                <li>Special requests should be communicated at time of booking</li>
              </ul>
              
              <p><strong>Arrival Time:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Please arrive 15 minutes before your appointment</li>
                <li>Late arrivals may result in shortened treatment time</li>
                <li>Arrivals more than 15 minutes late may result in cancellation</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              4. Health and Safety
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                Your health and safety are our top priorities. By using our services, you acknowledge:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are in good health and have no medical conditions that would prevent safe treatment</li>
                <li>You will disclose any allergies, medical conditions, or medications</li>
                <li>You understand that spa treatments are not substitutes for medical care</li>
                <li>You will follow all safety guidelines and staff instructions</li>
                <li>You assume responsibility for any undisclosed health conditions</li>
              </ul>
              <p>
                Pregnant guests should consult with their healthcare provider before booking treatments.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              5. Payment Terms
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p><strong>Accepted Payment Methods:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit cards (Visa, MasterCard, American Express)</li>
                <li>Debit cards</li>
                <li>Gift certificates</li>
                <li>Cash (for services under $500)</li>
              </ul>
              
              <p><strong>Payment Policies:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment is due at time of service unless pre-authorized</li>
                <li>Prices are subject to change without notice</li>
                <li>All prices include applicable taxes</li>
                <li>Gratuities are welcomed but not required</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              6. Facility Rules
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>To ensure a peaceful environment for all guests:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mobile devices must be silenced or turned off</li>
                <li>Photography is not permitted in treatment areas</li>
                <li>Children under 16 require adult supervision</li>
                <li>Appropriate spa attire is required</li>
                <li>Smoking and alcohol are prohibited</li>
                <li>Loud conversations should be avoided</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              7. Liability and Insurance
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                Serenity Spa maintains comprehensive insurance coverage. However, guests acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>They participate in treatments at their own risk</li>
                <li>We are not liable for lost or stolen personal items</li>
                <li>We are not responsible for adverse reactions to undisclosed allergies</li>
                <li>Liability is limited to the cost of services provided</li>
              </ul>
              <p>
                We recommend securing personal valuables in provided lockers or leaving them at home.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              8. Intellectual Property
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                The Serenity Spa website, logo, content, and materials are protected by copyright, 
                trademark, and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Copy, reproduce, or distribute our content without permission</li>
                <li>Use our trademarks or logos without written consent</li>
                <li>Reverse engineer or attempt to extract our proprietary information</li>
                <li>Create derivative works based on our content</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              9. Privacy and Confidentiality
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                We respect your privacy and maintain strict confidentiality regarding:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal and health information</li>
                <li>Treatment preferences and history</li>
                <li>Payment and contact details</li>
                <li>Any personal matters discussed during treatments</li>
              </ul>
              <p>
                Please refer to our Privacy Policy for detailed information about data handling.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              10. Modifications and Updates
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting on our website. Your continued use of our services after 
                changes are posted constitutes acceptance of the new terms.
              </p>
              <p>
                We encourage you to review these terms periodically to stay informed of any updates.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-200 dark:border-charcoal-700 pt-6">
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Contact Information
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-charcoal-800 p-4 rounded-lg">
                <p><strong>Email:</strong> info@serenityspa.com</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Serenity Lane, Beverly Hills, CA 90210</p>
                <p><strong>Hours:</strong> Monday-Friday 9AM-9PM, Saturday-Sunday 8AM-10PM</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage; 