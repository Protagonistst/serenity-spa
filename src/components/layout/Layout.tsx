import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import ScrollToTopOnRouteChange from '../ui/ScrollToTopOnRouteChange';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTopOnRouteChange />
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout; 