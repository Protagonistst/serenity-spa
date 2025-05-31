import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Swedish Massage: A Journey to Deep Relaxation",
    excerpt: "Discover the therapeutic benefits and ancient techniques behind our signature Swedish massage treatments that have been perfected over decades.",
    category: "Massage Therapy",
    author: "Sarah Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&q=80&w=2070",
    featured: true
  },
  {
    id: 2,
    title: "Essential Aromatherapy: Healing Through Natural Scents",
    excerpt: "Explore how our carefully selected essential oils enhance your spa experience and promote natural healing through the power of scent.",
    category: "Aromatherapy",
    author: "Dr. Michael Torres",
    date: "March 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&q=80&w=2073"
  },
  {
    id: 3,
    title: "Mindful Meditation: Finding Inner Peace in Our Sanctuary",
    excerpt: "Learn about our meditation programs and how mindfulness practices can transform your daily life and reduce stress.",
    category: "Mindfulness",
    author: "Emma Rodriguez",
    date: "March 5, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&q=80&w=2124"
  },
  {
    id: 4,
    title: "Skincare Secrets: Natural Beauty from Within",
    excerpt: "Discover our holistic approach to skincare that combines premium products with ancient wellness wisdom.",
    category: "Skincare",
    author: "Dr. Jennifer Park",
    date: "February 28, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&q=80&w=2070"
  },
  {
    id: 5,
    title: "Hot Stone Therapy: Ancient Healing for Modern Stress",
    excerpt: "Experience the therapeutic benefits of volcanic stones and how this ancient practice promotes deep muscle relaxation.",
    category: "Massage Therapy",
    author: "Marcus Thompson",
    date: "February 20, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&q=80&w=2070"
  },
  {
    id: 6,
    title: "Nutrition and Wellness: Fueling Your Spa Journey",
    excerpt: "Learn how proper nutrition enhances your spa treatments and supports your overall wellness goals.",
    category: "Nutrition",
    author: "Chef Isabella Martinez",
    date: "February 15, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&q=80&w=2053"
  }
];

const categories = ['All', 'Massage Therapy', 'Aromatherapy', 'Mindfulness', 'Skincare', 'Nutrition'];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const blogAnimation = useScrollAnimation({ threshold: 0.1 });

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

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
          <h1 className="font-serif font-bold mb-4 text-charcoal-900 dark:text-white">Wellness Journal</h1>
          <p className="text-lg text-charcoal-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights, tips, and inspiration for your wellness journey
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="card-luxury overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-sm text-charcoal-500 dark:text-gray-400">{featuredPost.category}</span>
                  </div>
                  <h2 className="font-serif text-3xl font-bold mb-4 text-charcoal-900 dark:text-white">
                    {featuredPost.title}
                  </h2>
                  <p className="text-charcoal-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-charcoal-500 dark:text-gray-400">
                      <span>{featuredPost.author}</span> • <span>{featuredPost.date}</span> • <span>{featuredPost.readTime}</span>
                    </div>
                    <Link
                      to={`/blog/${featuredPost.id}`}
                      className="btn-primary"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white dark:bg-primary-500'
                      : 'bg-white text-charcoal-700 hover:bg-gray-100 dark:bg-charcoal-800 dark:text-gray-200 dark:hover:bg-charcoal-700'
                  } shadow-sm`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          ref={blogAnimation.ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post, index) => (
            <Link 
              key={post.id}
              to={`/blog/${post.id}`}
              className="block"
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={blogAnimation.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-luxury overflow-hidden group cursor-pointer h-full"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {post.category}
                    </span>
                    <span className="text-sm text-charcoal-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3 text-charcoal-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-charcoal-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm mt-auto">
                    <div className="text-charcoal-500 dark:text-gray-400">
                      <span>{post.author}</span> • <span>{post.date}</span>
                    </div>
                    <motion.span
                      className="text-primary-600 dark:text-primary-400 font-medium flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      Read →
                    </motion.span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-3xl p-8 lg:p-12 text-center"
        >
          <h2 className="font-serif text-3xl font-bold mb-4 text-charcoal-900 dark:text-white">
            Stay Inspired
          </h2>
          <p className="text-lg text-charcoal-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly wellness tips, exclusive offers, and the latest spa trends.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white dark:bg-charcoal-800 border border-gray-200 dark:border-charcoal-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-3"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage; 