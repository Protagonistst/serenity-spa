import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Dr. Elena Rodriguez',
    role: 'Founder & Wellness Director',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&q=80&w=2070',
    bio: 'With over 20 years of experience in holistic wellness, Dr. Rodriguez brings a unique blend of Eastern and Western healing practices.'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Spa Operations',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&q=80&w=2070',
    bio: 'A certified massage therapist and aromatherapy expert, Michael ensures every guest receives exceptional care.'
  },
  {
    name: 'Sarah Thompson',
    role: 'Senior Wellness Consultant',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&q=80&w=2070',
    bio: 'Specializing in customized wellness programs, Sarah helps guests achieve their personal health and relaxation goals.'
  },
  {
    name: 'James Park',
    role: 'Lead Therapist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&q=80&w=2070',
    bio: 'An expert in deep tissue and therapeutic massage, James brings healing touch to every treatment.'
  }
];

const values = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    ),
    title: 'Holistic Approach',
    description: 'We believe in treating the whole person - mind, body, and spirit - for complete wellness.'
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    ),
    title: 'Excellence',
    description: 'We maintain the highest standards in every aspect of our service and facilities.'
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    ),
    title: 'Compassion',
    description: 'Every guest is treated with genuine care, respect, and personalized attention.'
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    ),
    title: 'Sustainability',
    description: 'We are committed to eco-friendly practices and supporting our local community.'
  }
];

const AboutPage = () => {
  const storyAnimation = useScrollAnimation({ threshold: 0.2 });
  const valuesAnimation = useScrollAnimation({ threshold: 0.1 });
  const teamAnimation = useScrollAnimation({ threshold: 0.1 });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&q=80&w=2070" 
            alt="Serenity Spa Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h1 
            {...fadeInUp}
            className="font-serif font-bold mb-4 text-shadow-luxury"
          >
            Our Story
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
          >
            A journey of wellness, luxury, and transformation since 2008
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white dark:bg-charcoal-900">
        <div className="container-custom">
          <motion.div 
            ref={storyAnimation.ref as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyAnimation.isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif font-bold mb-6 text-charcoal-900 dark:text-white">
                A Legacy of <span className="text-gradient">Wellness</span>
              </h2>
              <div className="space-y-4 text-charcoal-600 dark:text-gray-300">
                <p className="leading-relaxed">
                  Founded in 2008 by Dr. Elena Rodriguez, Serenity Spa began as a small wellness center with a grand vision: 
                  to create a sanctuary where luxury meets healing, and where every guest discovers their path to complete wellness.
                </p>
                <p className="leading-relaxed">
                  What started as a boutique spa with just four treatment rooms has blossomed into one of the most prestigious 
                  wellness destinations in the country. Our growth has been guided by an unwavering commitment to excellence 
                  and a deep understanding that true luxury lies in personalized care.
                </p>
                <p className="leading-relaxed">
                  Today, we continue to innovate while honoring the timeless traditions of healing. Our team of world-class 
                  therapists combines ancient wisdom with cutting-edge techniques to deliver transformative experiences that 
                  nurture body, mind, and spirit.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyAnimation.isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&q=80&w=2070" 
                alt="Spa treatment room" 
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-primary-600 text-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-3xl font-bold mb-1">15+</h3>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-section-light">
        <div className="container-custom">
          <motion.div 
            ref={valuesAnimation.ref as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0 }}
            animate={valuesAnimation.isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif font-bold mb-4 text-charcoal-900 dark:text-white">Our Core Values</h2>
            <p className="text-lg text-charcoal-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide every aspect of our service and define who we are
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {value.icon}
                    </svg>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 text-charcoal-900 dark:text-white">{value.title}</h3>
                <p className="text-charcoal-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white dark:bg-charcoal-900">
        <div className="container-custom">
          <motion.div 
            ref={teamAnimation.ref as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0 }}
            animate={teamAnimation.isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif font-bold mb-4 text-charcoal-900 dark:text-white">Meet Our Expert Team</h2>
            <p className="text-lg text-charcoal-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dedicated professionals committed to your wellness journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={teamAnimation.isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-luxury overflow-hidden group"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-1 text-charcoal-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 text-sm mb-3">{member.role}</p>
                  <p className="text-charcoal-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif font-bold mb-12">Awards & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-2">Best Luxury Spa 2023</h3>
                <p className="opacity-90">World Spa Awards</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Excellence in Wellness</h3>
                <p className="opacity-90">International Spa Association</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">5-Star Rating</h3>
                <p className="opacity-90">Forbes Travel Guide</p>
              </div>
            </div>
            <Link to="/booking" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg">
              Experience Award-Winning Service
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 