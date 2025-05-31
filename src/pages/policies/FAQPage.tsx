import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Booking & Appointments",
      questions: [
        {
          question: "How do I book an appointment?",
          answer: "You can book appointments online through our website, by calling (555) 123-4567, or by visiting our spa in person. We recommend booking 48-72 hours in advance for best availability."
        },
        {
          question: "Can I book multiple services in one appointment?",
          answer: "Yes! We offer customizable spa packages and can combine multiple treatments. Our booking system will automatically calculate timing and schedule consecutive services with the same or different therapists."
        },
        {
          question: "What's your cancellation policy?",
          answer: "We require 24 hours advance notice for cancellations. Late cancellations (less than 24 hours) are charged 50% of the service cost, and no-shows are charged the full amount. Please see our Cancellation Policy page for complete details."
        },
        {
          question: "Do you accept walk-ins?",
          answer: "While we prefer appointments, we do accept walk-ins based on availability. However, booking in advance ensures your preferred time and therapist selection."
        }
      ]
    },
    {
      category: "Services & Treatments",
      questions: [
        {
          question: "What should I expect during my first visit?",
          answer: "Arrive 15 minutes early to complete a health intake form and tour our facilities. You'll receive spa attire and be introduced to your therapist who will discuss your preferences and any health considerations."
        },
        {
          question: "Are your treatments suitable for pregnant women?",
          answer: "We offer prenatal massage and pregnancy-safe treatments after the first trimester. Please inform us of your pregnancy when booking, and consult with your healthcare provider before visiting."
        },
        {
          question: "Do you offer treatments for men?",
          answer: "Absolutely! We welcome all guests and offer treatments specifically designed for men's skin and wellness needs, including deep tissue massage, men's facials, and grooming services."
        },
        {
          question: "What's the difference between Swedish and deep tissue massage?",
          answer: "Swedish massage uses lighter pressure with long, flowing strokes for relaxation. Deep tissue massage uses firmer pressure to target muscle tension and chronic pain areas. Our therapists can adjust pressure during your session."
        }
      ]
    },
    {
      category: "Facilities & Amenities",
      questions: [
        {
          question: "What amenities are included with my treatment?",
          answer: "All treatments include access to our relaxation lounge, steam room, sauna, and quiet meditation garden. We provide spa robes, slippers, towels, and complimentary herbal tea and infused water."
        },
        {
          question: "Do you have private couples' rooms?",
          answer: "Yes! We have beautiful couples' suites for side-by-side treatments. These private rooms include a soaking tub, fireplace, and private relaxation area. Book early as they're very popular."
        },
        {
          question: "Is there parking available?",
          answer: "We offer complimentary valet parking for all spa guests. Self-parking is also available in our adjacent lot. Electric vehicle charging stations are available upon request."
        },
        {
          question: "What should I wear to the spa?",
          answer: "Wear comfortable, loose-fitting clothes. We provide spa robes, slippers, and disposable undergarments for treatments. Most guests undress to their comfort level - your therapist will discuss draping options."
        }
      ]
    },
    {
      category: "Health & Safety",
      questions: [
        {
          question: "Do I need to disclose medical conditions?",
          answer: "Yes, please inform us of any medical conditions, allergies, injuries, or medications during booking and on your intake form. This helps us customize treatments safely and effectively."
        },
        {
          question: "Are your products organic/natural?",
          answer: "We use premium organic and natural products whenever possible. All products are carefully selected for quality and safety. If you have specific allergies or preferences, please let us know."
        },
        {
          question: "What safety measures do you have in place?",
          answer: "We maintain strict hygiene protocols including thorough sanitization between guests, fresh linens for each treatment, air purification systems, and regular health screenings for staff."
        },
        {
          question: "Can I visit if I'm feeling unwell?",
          answer: "For everyone's safety, please reschedule if you're experiencing any illness symptoms. We'll waive cancellation fees for health-related cancellations and help you rebook when you're feeling better."
        }
      ]
    },
    {
      category: "Pricing & Packages",
      questions: [
        {
          question: "Do your prices include gratuity?",
          answer: "Gratuities are not included in our listed prices. While tips are appreciated for exceptional service, they are entirely voluntary. Our staff are well-compensated, and your satisfaction is our primary concern."
        },
        {
          question: "Do you offer package deals or memberships?",
          answer: "Yes! We offer various spa packages that combine treatments at discounted rates, monthly membership programs, and seasonal promotions. Check our website or ask our staff about current offers."
        },
        {
          question: "Are gift certificates available?",
          answer: "Gift certificates are available for any dollar amount or specific treatments. They're valid for 12 months and make perfect gifts for birthdays, holidays, or special occasions. Purchase online or in-person."
        },
        {
          question: "What forms of payment do you accept?",
          answer: "We accept all major credit cards, debit cards, cash, gift certificates, and spa credit from memberships or packages. Payment is due at time of service unless pre-authorized."
        }
      ]
    },
    {
      category: "Special Occasions",
      questions: [
        {
          question: "Do you host bridal parties or group events?",
          answer: "Yes! We specialize in bridal parties, bachelorette celebrations, and group events. We offer customized packages, private areas, champagne service, and can accommodate groups of 4-20 people."
        },
        {
          question: "Can you accommodate special dietary needs for refreshments?",
          answer: "Absolutely! We can provide gluten-free, vegan, or other dietary-specific refreshments with advance notice. Please inform us of any dietary restrictions when booking group events."
        },
        {
          question: "Do you offer corporate wellness programs?",
          answer: "Yes, we partner with businesses to provide on-site chair massage, wellness workshops, and corporate spa days. Contact our corporate sales team to discuss customized wellness solutions."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 1000 + questionIndex;
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-charcoal-600 dark:text-gray-300">
            Everything you need to know about visiting Serenity Spa
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {faqs.map((category, categoryIndex) => (
            <div key={category.category} className="card-luxury p-6 lg:p-8">
              <h2 className="font-serif text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400 border-b border-gray-200 dark:border-charcoal-700 pb-3">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = categoryIndex * 1000 + questionIndex;
                  const isOpen = openIndex === index;
                  
                  return (
                    <div
                      key={questionIndex}
                      className="border border-gray-200 dark:border-charcoal-700 rounded-lg overflow-hidden"
                    >
                      <motion.button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-charcoal-800 transition-colors"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="font-semibold text-charcoal-900 dark:text-white pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <svg 
                            className="w-5 h-5 text-primary-600 dark:text-primary-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 9l-7 7-7-7" 
                            />
                          </svg>
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 dark:border-charcoal-700"
                          >
                            <div className="px-6 py-4 text-charcoal-700 dark:text-gray-300 bg-gray-50 dark:bg-charcoal-800">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 card-luxury p-8 text-center"
        >
          <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal-900 dark:text-white">
            Still Have Questions?
          </h2>
          <p className="text-charcoal-600 dark:text-gray-300 mb-6">
            Our friendly staff is here to help. Contact us for personalized assistance with your spa experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-charcoal-900 dark:text-white">Call Us</h3>
              <p className="text-charcoal-600 dark:text-gray-300">(555) 123-4567</p>
              <p className="text-sm text-charcoal-500 dark:text-gray-400">Daily 8AM - 8PM</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-charcoal-900 dark:text-white">Email Us</h3>
              <p className="text-charcoal-600 dark:text-gray-300">info@serenityspa.com</p>
              <p className="text-sm text-charcoal-500 dark:text-gray-400">Response within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-charcoal-900 dark:text-white">Visit Us</h3>
              <p className="text-charcoal-600 dark:text-gray-300">123 Serenity Lane</p>
              <p className="text-sm text-charcoal-500 dark:text-gray-400">Beverly Hills, CA 90210</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage; 