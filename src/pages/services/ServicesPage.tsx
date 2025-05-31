import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

// Types for services
interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  category: string;
  features: string[];
}

// Enhanced services data with features
const servicesData: Service[] = [
  {
    id: '1',
    title: 'Swedish Massage',
    description: 'A gentle full-body massage that is perfect for people who are new to massage, or who prefer a lighter pressure.',
    duration: '60 min',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&q=80&w=2070',
    category: 'massage',
    features: ['Full body relaxation', 'Stress relief', 'Improved circulation']
  },
  {
    id: '2',
    title: 'Deep Tissue Massage',
    description: 'A therapeutic massage that focuses on realigning deeper layers of muscles and connective tissue.',
    duration: '60 min',
    price: '$140',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&q=80&w=2124',
    category: 'massage',
    features: ['Muscle tension release', 'Pain relief', 'Improved flexibility']
  },
  {
    id: '3',
    title: 'Hot Stone Massage',
    description: 'Smooth, flat, heated stones are placed on specific parts of your body to help relax and ease tense muscles.',
    duration: '90 min',
    price: '$180',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&q=80&w=2070',
    category: 'massage',
    features: ['Deep relaxation', 'Muscle healing', 'Energy balance']
  },
  {
    id: '4',
    title: 'Hydrating Facial',
    description: 'Restore moisture and radiance to dry, dull skin with this intensive hydrating treatment.',
    duration: '60 min',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&q=80&w=2070',
    category: 'facial',
    features: ['Deep moisturization', 'Glow restoration', 'Anti-aging benefits']
  },
  {
    id: '5',
    title: 'Anti-Aging Facial',
    description: 'Combat signs of aging with this specialized treatment designed to reduce fine lines and improve skin elasticity.',
    duration: '75 min',
    price: '$190',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&q=80&w=2070',
    category: 'facial',
    features: ['Collagen boost', 'Fine line reduction', 'Skin firming']
  },
  {
    id: '6',
    title: 'Salt Scrub',
    description: 'Exfoliate and moisturize your skin with this invigorating full-body treatment.',
    duration: '45 min',
    price: '$110',
    image: 'https://images.unsplash.com/photo-1629114112651-a8c8c27fb851?auto=format&q=80&w=2070',
    category: 'body',
    features: ['Exfoliation', 'Skin smoothing', 'Mineral nourishment']
  },
  {
    id: '7',
    title: 'Detox Body Wrap',
    description: 'This purifying treatment helps eliminate toxins and reduce water retention.',
    duration: '60 min',
    price: '$130',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&q=80&w=2070',
    category: 'body',
    features: ['Toxin removal', 'Skin tightening', 'Metabolism boost']
  },
  {
    id: '8',
    title: 'Guided Meditation',
    description: 'A guided session to help you relax, focus, and find inner peace.',
    duration: '45 min',
    price: '$90',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&q=80&w=2122',
    category: 'wellness',
    features: ['Stress reduction', 'Mental clarity', 'Emotional balance']
  },
  {
    id: '9',
    title: 'Private Yoga Session',
    description: 'A private yoga session tailored to your experience level and wellness goals.',
    duration: '60 min',
    price: '$100',
    image: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?auto=format&q=80&w=2070',
    category: 'wellness',
    features: ['Flexibility improvement', 'Core strength', 'Mind-body connection']
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Services', icon: '✨' },
  { id: 'massage', name: 'Massage Therapy', icon: '💆' },
  { id: 'facial', name: 'Facial Treatments', icon: '🌸' },
  { id: 'body', name: 'Body Treatments', icon: '🌿' },
  { id: 'wellness', name: 'Wellness & Mindfulness', icon: '🧘' }
];

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const servicesAnimation = useScrollAnimation({ threshold: 0.1 });

  const filteredServices = selectedCategory === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Static (No Parallax) */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&q=80&w=2070" 
            alt="Spa Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif font-bold mb-4 text-shadow-luxury"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Discover our collection of rejuvenating treatments designed to restore balance and beauty
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-section-light">
        <div className="container-custom">
          {/* Category Filter with Icons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                    : 'bg-white text-charcoal-700 hover:bg-gray-100 dark:bg-charcoal-800 dark:text-gray-200 dark:hover:bg-charcoal-700 shadow-md'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            ref={servicesAnimation.ref as React.RefObject<HTMLDivElement>}
            variants={containerVariants}
            initial="hidden"
            animate={servicesAnimation.isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map(service => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="card-luxury hover:shadow-2xl cursor-pointer overflow-hidden group"
                onClick={() => setSelectedService(service)}
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-primary-700">{service.duration}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold mb-2 text-charcoal-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-charcoal-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold text-gradient">{service.price}</div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn-primary py-2 px-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                      }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Service Detail Modal */}
          <AnimatePresence>
            {selectedService && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedService(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="bg-white dark:bg-charcoal-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedService(null)}
                      className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label="Close"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="font-serif text-4xl font-bold text-white mb-2">{selectedService.title}</h2>
                      <div className="flex items-center space-x-4 text-white/90">
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {selectedService.duration}
                        </span>
                        <span className="text-2xl font-bold">{selectedService.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-lg text-charcoal-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {selectedService.description}
                    </p>
                    <div className="mb-8">
                      <h3 className="font-serif text-xl font-bold mb-4 text-charcoal-900 dark:text-white">
                        Treatment Benefits
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedService.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-2"
                          >
                            <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-charcoal-600 dark:text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/booking" className="btn-primary px-8 py-3 text-center">
                        Book This Treatment
                      </Link>
                      <button 
                        className="btn-outline px-8 py-3"
                        onClick={() => setSelectedService(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Special Packages CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Exclusive Wellness Packages
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Combine multiple treatments for a complete spa experience. Our expert consultants will create 
                a personalized package tailored to your wellness goals.
              </p>
              <Link to="/booking">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg shadow-xl"
                >
                  Explore Packages
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 