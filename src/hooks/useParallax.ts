import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  offset?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0 } = options;
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const yPos = -(scrolled * speed) + offset;
      setTranslateY(yPos);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, offset]);

  return translateY;
}; 