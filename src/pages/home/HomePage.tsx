import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useParallax } from '../../hooks/useParallax';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const HomePage = () => {
  const heroParallax = useParallax({ speed: 0.5 });
  const featuresAnimation = useScrollAnimation({ threshold: 0.1 });
  const statsAnimation = useScrollAnimation({ threshold: 0.1 });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${heroParallax}px)` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&q=80&w=2070" 
            alt="Luxury Spa Retreat" 
            className="w-full h-[120%] object-cover"
          />
          {/* Enhanced gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </motion.div>
        
        {/* Hero Content */}
        <div className="container-custom relative z-10 text-white text-center mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.span 
              {...fadeInUp}
              className="text-accent-300 font-medium tracking-widest uppercase text-sm md:text-base mb-4 block drop-shadow-lg"
            >
              Welcome to Serenity
            </motion.span>
            <motion.h1 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="font-serif font-bold mb-6 drop-shadow-2xl"
            >
              <span className="text-white">Experience True</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-secondary-300 drop-shadow-2xl">
                Luxury & Wellness
              </span>
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-lg"
            >
              Immerse yourself in tranquility at our exclusive spa retreat, where ancient healing traditions meet modern luxury.
            </motion.p>
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/services" className="btn-primary bg-primary-600 hover:bg-primary-700 px-8 py-4 text-lg group shadow-2xl">
                <span>Explore Services</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/booking" className="btn-outline text-white border-white hover:bg-white hover:text-charcoal-900 px-8 py-4 text-lg shadow-xl backdrop-blur-sm">
                Book Your Escape
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/80 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-xs block mt-2 uppercase tracking-widest">Scroll</span>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Welcome Section with Animated Features */}
      <section className="py-24 bg-section-light">
        <div className="container-custom">
          <motion.div 
            ref={featuresAnimation.ref as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0, y: 20 }}
            animate={featuresAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-serif font-bold mb-6 text-charcoal-900 dark:text-white">
              Welcome to <span className="text-gradient">Serenity Retreat</span>
            </h2>
            <p className="text-lg text-charcoal-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover a sanctuary where luxury meets wellness, and every experience is meticulously crafted to rejuvenate your body, mind, and spirit.
            </p>
          </motion.div>
          
          {/* Animated Feature Cards */}
          <motion.div 
            ref={featuresAnimation.ref as React.RefObject<HTMLDivElement>}
            variants={staggerContainer}
            initial="initial"
            animate={featuresAnimation.isInView ? "animate" : "initial"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ),
                title: "Personalized Care",
                description: "Every treatment is meticulously customized to your unique needs and preferences, ensuring a truly bespoke experience."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                title: "Premium Quality",
                description: "We use only the finest organic products and cutting-edge techniques to deliver unparalleled results."
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                ),
                title: "Serene Environment",
                description: "Our thoughtfully designed spaces create a peaceful sanctuary where stress melts away and tranquility reigns."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="card-luxury p-8 text-center group"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {feature.icon}
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif font-bold mb-3 text-charcoal-900 dark:text-white">{feature.title}</h3>
                <p className="text-charcoal-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="divider-luxury"></div>
          
          {/* Stats Section */}
          <motion.div 
            ref={statsAnimation.ref as React.RefObject<HTMLDivElement>}
            initial="initial"
            animate={statsAnimation.isInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "10k+", label: "Happy Clients" },
              { number: "50+", label: "Expert Therapists" },
              { number: "95%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </h3>
                <p className="text-charcoal-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={statsAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link to="/about" className="btn-primary inline-flex items-center group">
              <span>Discover Our Story</span>
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container-custom text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-serif font-bold mb-6 text-white drop-shadow-lg">Ready to Begin Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Book your escape today and discover the perfect balance of luxury and wellness.
            </p>
            <Link to="/booking" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Reserve Your Experience
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 