/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cinema: {
          bg: '#0f0e0e',
          surface: '#1a1818',
          card: '#201e1e',
          border: '#2e2b2b',
          amber: '#f5a623',
          'amber-dim': '#c4831a',
          muted: '#6b6565',
          text: '#f0ece8',
          'text-soft': '#b8b0aa',
        },
        light: {
          bg: '#f7f4f0',
          surface: '#eeeae4',
          card: '#ffffff',
          border: '#ddd8d0',
          text: '#1a1818',
          'text-soft': '#5a5450',
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease forwards',
        'slide-in': 'slideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-out': 'slideOut 0.3s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'card': '0 2px 20px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
        'amber': '0 0 20px rgba(245,166,35,0.25)',
      },
    },
  },
  plugins: [],
};