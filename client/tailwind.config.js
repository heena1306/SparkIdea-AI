/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",    // Azure Blue 
        secondary: "#A855F7",  // Vibrant Purple
        charcoal: "#0F172A",   // Core Heading color
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'glow-pulse': 'glowPulse 8s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'blur(100px) scale(1)' },
          '100%': { opacity: '0.7', filter: 'blur(140px) scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
