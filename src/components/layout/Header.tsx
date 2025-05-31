import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Booking', path: '/booking' },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Check if we're on the home page and not scrolled
  const isTransparent = location.pathname === '/' && !scrolled;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent backdrop-blur-sm py-5' 
          : 'bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md shadow-lg py-3'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <span className={`font-serif text-2xl md:text-3xl font-bold transition-colors ${
                isTransparent
                  ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                  : 'text-primary-700 dark:text-primary-400'
              }`}>
                Serenity
                <span className={`${
                  isTransparent
                    ? 'text-accent-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                    : 'text-secondary-600 dark:text-secondary-400'
                }`}>Spa</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span className={`font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? isTransparent
                      ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                      : 'text-primary-600 dark:text-primary-400'
                    : isTransparent
                      ? 'text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                      : 'text-charcoal-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}>
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/booking" 
                className={`btn-primary shadow-lg ${
                  isTransparent
                    ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20' 
                    : ''
                }`}
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              className={`p-2 rounded-lg transition-colors ${
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {!isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-charcoal-900 border-t dark:border-charcoal-800 mt-3 shadow-lg"
          >
            <div className="container-custom py-6">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center font-medium px-4 py-3 rounded-lg transition-all ${
                        location.pathname === link.path
                          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'text-charcoal-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-charcoal-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-4 border-t dark:border-charcoal-700"
                >
                  <Link to="/booking" className="btn-primary w-full text-center">
                    Book Your Experience
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 