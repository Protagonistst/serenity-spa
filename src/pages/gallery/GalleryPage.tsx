import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&q=80&w=2070', alt: 'Spa treatment room', category: 'treatment' },
  { id: 2, src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&q=80&w=2070', alt: 'Massage therapy', category: 'treatment' },
  { id: 3, src: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&q=80&w=2070', alt: 'Spa pool', category: 'facilities' },
  { id: 4, src: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&q=80&w=2071', alt: 'Relaxation area', category: 'facilities' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&q=80&w=2070', alt: 'Hot stone therapy', category: 'treatment' },
  { id: 6, src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&q=80&w=2073', alt: 'Spa essential oils', category: 'products' },
  { id: 7, src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&q=80&w=2070', alt: 'Facial treatment', category: 'treatment' },
  { id: 8, src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&q=80&w=2124', alt: 'Meditation space', category: 'facilities' },
  { id: 9, src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&q=80&w=2070', alt: 'Spa reception', category: 'facilities' },
  { id: 10, src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&q=80&w=2073', alt: 'Natural spa products', category: 'products' },
  { id: 11, src: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&q=80&w=2070', alt: 'Spa bath', category: 'treatment' },
  { id: 12, src: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&q=80&w=2127', alt: 'Luxury spa suite', category: 'facilities' },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'treatment', name: 'Treatments' },
  { id: 'facilities', name: 'Facilities' },
  { id: 'products', name: 'Products' },
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const galleryAnimation = useScrollAnimation({ threshold: 0.1 });

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen py-20 bg-section-light">
      <div className="container-custom">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif font-bold mb-4 text-charcoal-900 dark:text-white">Our Gallery</h1>
          <p className="text-lg text-charcoal-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore the serene beauty of our spa retreat through our carefully curated gallery.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-white text-charcoal-700 hover:bg-gray-100 dark:bg-charcoal-800 dark:text-gray-200 dark:hover:bg-charcoal-700'
              } shadow-sm`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Gallery Grid */}
        <motion.div 
          ref={galleryAnimation.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={galleryAnimation.isInView ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group ${
                  index % 5 === 0 ? 'md:col-span-2 lg:row-span-2' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-lg font-medium">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ maxWidth: '90vw', maxHeight: '85vh' }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                <div className="absolute bottom-4 left-4 right-4 text-center z-10">
                  <p className="text-white text-lg bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                    {selectedImage.alt}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 card-luxury p-8"
        >
          <h3 className="font-serif font-bold mb-4 text-charcoal-900 dark:text-white">Follow Our Journey</h3>
          <p className="text-charcoal-600 dark:text-gray-300 mb-6">
            Stay connected with us on Instagram for daily wellness inspiration and exclusive behind-the-scenes content.
          </p>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
            <span>@serenityspa</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryPage; 