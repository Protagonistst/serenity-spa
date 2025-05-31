import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Swedish Massage: A Journey to Deep Relaxation",
    excerpt: "Discover the therapeutic benefits and ancient techniques behind our signature Swedish massage treatments.",
    content: `
      <p>Swedish massage is one of the most popular and widely recognized massage techniques in the world, and for good reason. At Serenity Spa, we've perfected this time-honored practice to deliver an experience that goes beyond simple relaxation—it's a complete rejuvenation of body, mind, and spirit.</p>

      <h3>The Origins and Philosophy</h3>
      <p>Developed in the 1820s by Swedish doctor Per Henrik Ling, Swedish massage combines various techniques to improve circulation, relieve muscle tension, and promote overall wellness. The philosophy behind this massage style is rooted in the understanding that gentle, flowing movements can have profound healing effects on the entire body.</p>

      <h3>The Five Core Techniques</h3>
      <p>Our certified therapists employ five fundamental techniques during every Swedish massage:</p>
      <ul>
        <li><strong>Effleurage:</strong> Long, gliding strokes that warm up the muscles and promote circulation</li>
        <li><strong>Petrissage:</strong> Kneading and lifting motions that help release deep-seated tension</li>
        <li><strong>Tapotement:</strong> Rhythmic tapping that stimulates nerve endings and energizes the body</li>
        <li><strong>Friction:</strong> Deep circular movements that target specific problem areas</li>
        <li><strong>Vibration:</strong> Gentle shaking motions that help relax the entire body</li>
      </ul>

      <h3>Health Benefits</h3>
      <p>Regular Swedish massage treatments offer numerous health benefits including improved circulation, reduced stress hormones, enhanced flexibility, and better sleep quality. Many of our clients report feeling more balanced and energized after their sessions.</p>

      <h3>What to Expect at Serenity Spa</h3>
      <p>Your Swedish massage experience begins the moment you enter our tranquil environment. Our therapists take time to understand your specific needs and customize the pressure and techniques accordingly. We use only premium organic oils and maintain the perfect ambiance with soft lighting and calming music.</p>

      <p>Whether you're seeking relief from everyday stress or addressing specific muscle tension, our Swedish massage treatments provide the perfect foundation for your wellness journey.</p>
    `,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&q=80&w=2070",
    author: "Sarah Chen",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "Massage Therapy",
    tags: ["Swedish Massage", "Relaxation", "Wellness", "Stress Relief"]
  },
  {
    id: 2,
    title: "Essential Aromatherapy: Healing Through Natural Scents",
    excerpt: "Explore how our carefully selected essential oils enhance your spa experience and promote natural healing.",
    content: `
      <p>Aromatherapy has been used for thousands of years to promote physical and emotional well-being. At Serenity Spa, we've curated a collection of the finest essential oils to enhance every treatment and create an atmosphere of pure tranquility.</p>

      <h3>The Science Behind Aromatherapy</h3>
      <p>When you inhale essential oils, aromatic molecules travel directly to the limbic system in your brain—the area responsible for emotions, memory, and behavior. This direct pathway allows aromatherapy to have immediate and profound effects on your mood and overall sense of well-being.</p>

      <h3>Our Signature Essential Oil Blends</h3>
      <p>We've developed exclusive blends for different wellness goals:</p>
      <ul>
        <li><strong>Serenity Calm:</strong> Lavender, chamomile, and bergamot for deep relaxation</li>
        <li><strong>Energy Boost:</strong> Peppermint, eucalyptus, and rosemary for invigoration</li>
        <li><strong>Balance Harmony:</strong> Ylang-ylang, geranium, and sandalwood for emotional balance</li>
        <li><strong>Focus Clarity:</strong> Lemon, basil, and frankincense for mental clarity</li>
      </ul>

      <h3>Integration with Spa Treatments</h3>
      <p>Every treatment at our spa incorporates aromatherapy elements. From the diffused oils in our treatment rooms to the custom blends used in our massages and facials, we ensure that your olfactory senses are engaged throughout your journey.</p>

      <h3>Take the Experience Home</h3>
      <p>We offer our signature essential oil blends in our retail boutique, allowing you to continue your aromatherapy journey at home. Our specialists can guide you in creating your own wellness rituals using these powerful natural remedies.</p>
    `,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&q=80&w=2073",
    author: "Dr. Michael Torres",
    date: "2024-03-10",
    readTime: "6 min read",
    category: "Aromatherapy",
    tags: ["Essential Oils", "Aromatherapy", "Natural Healing", "Wellness"]
  },
  {
    id: 3,
    title: "Mindful Meditation: Finding Inner Peace in Our Sanctuary",
    excerpt: "Learn about our meditation programs and how mindfulness practices can transform your daily life.",
    content: `
      <p>In our fast-paced world, finding moments of true peace and clarity has become more important than ever. Our meditation sanctuary at Serenity Spa offers a refuge where you can disconnect from external distractions and reconnect with your inner wisdom.</p>

      <h3>The Power of Mindfulness</h3>
      <p>Mindfulness meditation is more than just relaxation—it's a powerful practice that can reshape your relationship with stress, anxiety, and everyday challenges. Scientific research has shown that regular meditation can reduce cortisol levels, improve focus, and enhance overall emotional well-being.</p>

      <h3>Our Meditation Programs</h3>
      <p>We offer various meditation experiences to suit different preferences and experience levels:</p>
      <ul>
        <li><strong>Guided Meditation Sessions:</strong> Perfect for beginners, led by certified instructors</li>
        <li><strong>Silent Meditation:</strong> Self-directed practice in our peaceful sanctuary</li>
        <li><strong>Walking Meditation:</strong> Mindful movement through our zen garden</li>
        <li><strong>Sound Bath Meditation:</strong> Healing vibrations from crystal bowls and gongs</li>
      </ul>

      <h3>The Meditation Sanctuary</h3>
      <p>Our meditation space has been carefully designed to promote inner peace. Natural lighting, comfortable cushions, and the gentle sound of flowing water create an environment where stress naturally melts away. The space is infused with calming essential oils and maintains a consistent temperature for optimal comfort.</p>

      <h3>Building Your Practice</h3>
      <p>Whether you're new to meditation or looking to deepen your existing practice, our instructors provide personalized guidance. We teach various techniques including breath awareness, body scanning, and loving-kindness meditation, helping you find the approach that resonates most with your personal journey.</p>

      <p>Regular meditation practice can become a cornerstone of your wellness routine, providing tools you can use anywhere to find calm and clarity in daily life.</p>
    `,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&q=80&w=2124",
    author: "Emma Rodriguez",
    date: "2024-03-05",
    readTime: "7 min read",
    category: "Mindfulness",
    tags: ["Meditation", "Mindfulness", "Stress Relief", "Inner Peace"]
  }
];

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen py-20 bg-section-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4 text-charcoal-900 dark:text-white">
            Post Not Found
          </h1>
          <p className="text-charcoal-600 dark:text-gray-300 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen py-20 bg-section-light">
      <div className="container-custom max-w-4xl">
        {/* Back to Blog */}
        <motion.div {...fadeInUp} className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-8"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
          </div>
        </motion.div>

        {/* Article Meta */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 mb-8 text-charcoal-600 dark:text-gray-300"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span>By {post.author}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{post.readTime}</span>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-luxury p-8 lg:p-12 mb-8"
        >
          <div 
            className="prose prose-lg max-w-none prose-charcoal dark:prose-invert prose-headings:font-serif prose-headings:text-charcoal-900 dark:prose-headings:text-white prose-p:text-charcoal-700 dark:prose-p:text-gray-300 prose-strong:text-charcoal-800 dark:prose-strong:text-gray-200 prose-ul:text-charcoal-700 dark:prose-ul:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>

        {/* Tags */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="font-semibold mb-4 text-charcoal-900 dark:text-white">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="card-luxury p-8"
        >
          <h3 className="font-serif text-2xl font-bold mb-6 text-charcoal-900 dark:text-white">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="h-48 overflow-hidden rounded-lg mb-4">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="font-serif text-lg font-semibold mb-2 text-charcoal-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-charcoal-600 dark:text-gray-300 text-sm">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetailPage; 