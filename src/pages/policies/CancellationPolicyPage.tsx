import { motion } from 'framer-motion';

const CancellationPolicyPage = () => {
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
            Cancellation Policy
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-gray-300">
            Booking, cancellation, and rescheduling policies
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
              24-Hour Cancellation Policy
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                We require <strong>24 hours advance notice</strong> for all cancellations and reschedules. 
                This policy allows us to offer your appointment time to other guests and ensures our 
                therapists maintain their schedules.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  ✅ No Charge Cancellations
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Cancellations made 24+ hours before your appointment time will receive a full refund 
                  or credit for future use.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  ⚠️ Late Cancellation Fee
                </h3>
                <p className="text-amber-700 dark:text-amber-300">
                  Cancellations made less than 24 hours before your appointment will be charged 
                  50% of the service cost.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  ❌ No-Show Policy
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  No-shows or same-day cancellations will be charged the full treatment cost.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              How to Cancel or Reschedule
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>You can cancel or reschedule your appointment using any of these methods:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-charcoal-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary-600 dark:text-primary-400">
                    📞 Phone
                  </h3>
                  <p>(555) 123-4567</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Available 7 days a week, 8:00 AM - 8:00 PM
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-charcoal-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary-600 dark:text-primary-400">
                    📧 Email
                  </h3>
                  <p>bookings@serenityspa.com</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Include your full name and appointment date/time
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-charcoal-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary-600 dark:text-primary-400">
                    🌐 Online
                  </h3>
                  <p>Through your booking confirmation link</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use the link in your confirmation email
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-charcoal-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-primary-600 dark:text-primary-400">
                    🏢 In Person
                  </h3>
                  <p>At our front desk</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    During our business hours
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Special Circumstances
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                We understand that unexpected situations arise. The following circumstances may qualify 
                for exemption from our cancellation policy:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Medical emergencies</strong> (documentation may be required)</li>
                <li><strong>Severe weather conditions</strong> that make travel unsafe</li>
                <li><strong>Family emergencies</strong> (death, serious illness, etc.)</li>
                <li><strong>Unexpected work obligations</strong> (with employer verification)</li>
                <li><strong>Travel delays</strong> due to cancelled flights or transportation issues</li>
              </ul>
              
              <p>
                Please contact us as soon as possible to discuss your situation. We review each case 
                individually and may waive fees at our discretion.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Package and Membership Policies
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-primary-600 dark:text-primary-400">
                    Spa Packages
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Individual treatments within packages follow standard cancellation policy</li>
                    <li>Entire package cancellations require 48-hour notice</li>
                    <li>Partial package completions are non-refundable</li>
                    <li>Package expiration dates cannot be extended for cancellations</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-primary-600 dark:text-primary-400">
                    Memberships
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Monthly memberships can be cancelled with 30-day notice</li>
                    <li>Annual memberships are non-refundable after 14 days</li>
                    <li>Unused credits expire at membership termination</li>
                    <li>Freeze options available for extended absences</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Group Bookings & Events
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                Special policies apply to group bookings (3+ people) and private events:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>7-day cancellation policy</strong> for groups of 3-6 people</li>
                <li><strong>14-day cancellation policy</strong> for groups of 7+ people</li>
                <li><strong>30-day cancellation policy</strong> for private events and parties</li>
                <li><strong>Deposits are non-refundable</strong> but may be applied to future bookings</li>
                <li><strong>Partial group cancellations</strong> are subject to individual policies</li>
              </ul>
              
              <p>
                Group size reductions that fall below minimum requirements may result in 
                additional charges or rescheduling to standard appointment times.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Gift Certificates
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <ul className="list-disc pl-6 space-y-2">
                <li>Gift certificates are valid for 12 months from purchase date</li>
                <li>Appointments booked with gift certificates follow standard cancellation policy</li>
                <li>Unused portions of gift certificates are non-refundable</li>
                <li>Gift certificates cannot be redeemed for cash</li>
                <li>Lost gift certificates can be reissued with proof of purchase</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Refund Process
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                When eligible for refunds:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit card refunds are processed within 3-5 business days</li>
                <li>Cash payments are refunded via check within 7-10 business days</li>
                <li>Spa credits never expire and can be used for any service</li>
                <li>Refunds are issued to the original payment method</li>
                <li>Processing fees may apply for credit card refunds</li>
              </ul>
            </div>
          </section>

          <section className="border-t border-gray-200 dark:border-charcoal-700 pt-6">
            <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
              Contact Us
            </h2>
            <div className="space-y-4 text-charcoal-700 dark:text-gray-300">
              <p>
                Questions about our cancellation policy? We're here to help:
              </p>
              <div className="bg-gray-50 dark:bg-charcoal-800 p-4 rounded-lg">
                <p><strong>Bookings Department:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> bookings@serenityspa.com</p>
                <p><strong>Manager on Duty:</strong> Available during business hours</p>
                <p><strong>Emergency Contact:</strong> (555) 123-HELP (after hours)</p>
              </div>
              <p className="text-sm">
                <em>
                  We appreciate your understanding and cooperation with our policies, which help us 
                  provide the best possible service to all our guests.
                </em>
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage; 