/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        // Sophisticated sage green palette
        primary: {
          50: '#f6f9f6',
          100: '#e8f0e8',
          200: '#d1e0d1',
          300: '#a8c5a8',
          400: '#7fa57f',
          500: '#5a8a5a',
          600: '#476f47',
          700: '#3a5a3a',
          800: '#304830',
          900: '#283a28',
          950: '#1a251a',
        },
        // Dusty rose palette
        secondary: {
          50: '#fdf8f8',
          100: '#faeeed',
          200: '#f5dbd9',
          300: '#edbdb8',
          400: '#e29890',
          500: '#d57873',
          600: '#c15a5a',
          700: '#a14949',
          800: '#853f3f',
          900: '#703838',
          950: '#4a2424',
        },
        // Warm neutral accent
        accent: {
          50: '#faf8f6',
          100: '#f3ede7',
          200: '#e6dace',
          300: '#d4bfaa',
          400: '#c0a080',
          500: '#b08968',
          600: '#9a6f50',
          700: '#815943',
          800: '#6b4a3a',
          900: '#5a3f33',
          950: '#3d2a22',
        },
        // Rich charcoal for text
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#2b2b2b',
          950: '#1a1a1a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-down': 'fadeDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 