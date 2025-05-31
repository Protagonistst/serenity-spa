import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';

// Import critical pages directly (no lazy loading)
import HomePage from './pages/home/HomePage';
import ServicesPage from './pages/services/ServicesPage';
import BookingPage from './pages/booking/BookingPage';

// Lazy load secondary pages
const About = lazy(() => import('./pages/about/AboutPage')) as unknown as React.ComponentType;
const Gallery = lazy(() => import('./pages/gallery/GalleryPage')) as unknown as React.ComponentType;
const Blog = lazy(() => import('./pages/blog/BlogPage')) as unknown as React.ComponentType;
const BlogDetail = lazy(() => import('./pages/blog/BlogDetailPage')) as unknown as React.ComponentType;
const Contact = lazy(() => import('./pages/contact/ContactPage')) as unknown as React.ComponentType;

// Lazy load policy pages
const PrivacyPolicy = lazy(() => import('./pages/policies/PrivacyPolicyPage')) as unknown as React.ComponentType;
const Terms = lazy(() => import('./pages/policies/TermsPage')) as unknown as React.ComponentType;
const CancellationPolicy = lazy(() => import('./pages/policies/CancellationPolicyPage')) as unknown as React.ComponentType;
const FAQ = lazy(() => import('./pages/policies/FAQPage')) as unknown as React.ComponentType;

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-white dark:bg-charcoal-900">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Critical routes without lazy loading */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking" element={<BookingPage />} />
            
            {/* Secondary routes with lazy loading */}
            <Route path="/about" element={
              <Suspense fallback={<LoadingFallback />}>
                <About />
              </Suspense>
            } />
            <Route path="/gallery" element={
              <Suspense fallback={<LoadingFallback />}>
                <Gallery />
              </Suspense>
            } />
            <Route path="/blog" element={
              <Suspense fallback={<LoadingFallback />}>
                <Blog />
              </Suspense>
            } />
            <Route path="/blog/:id" element={
              <Suspense fallback={<LoadingFallback />}>
                <BlogDetail />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<LoadingFallback />}>
                <Contact />
              </Suspense>
            } />
            
            {/* Policy pages */}
            <Route path="/privacy" element={
              <Suspense fallback={<LoadingFallback />}>
                <PrivacyPolicy />
              </Suspense>
            } />
            <Route path="/terms" element={
              <Suspense fallback={<LoadingFallback />}>
                <Terms />
              </Suspense>
            } />
            <Route path="/cancellation" element={
              <Suspense fallback={<LoadingFallback />}>
                <CancellationPolicy />
              </Suspense>
            } />
            <Route path="/faq" element={
              <Suspense fallback={<LoadingFallback />}>
                <FAQ />
              </Suspense>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
